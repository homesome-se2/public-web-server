import EEmitter from "../helpers/EEmitter";
import HoSoHelper from "../helpers/HoSoHelper";

class ConnectionService {
  wsConnectionStates = {
    connecting: 0,
    open: 1,
    closing: 2,
    closed: 3,
  };
  wsCustomInterdiaryStates = {
    disconnecting: 4,
    notAuthorized: 5,
    authorized: 6,
  };
  static authTypes = {
    manualLogin: 0,
    autoLogin: 1,
  };

  constructor(wsUrl) {
    this.wsState = this.wsConnectionStates.closed;
    this.wsUrl = wsUrl;
    this.ws = null;
    this.wsReceiverEEmitter = new EEmitter();
  }

  connect = () => {
    if (this.wsState === this.wsConnectionStates.open) {
      this.disconnect();
    } else if (this.wsState !== this.wsConnectionStates.closed) {
      console.log("ws socket already open");
      return -1;
    }

    this.wsState = this.wsConnectionStates.connecting;
    this.ws = new WebSocket(this.wsUrl);
    this.ws.binaryType = "arraybuffer";

    console.log("ConnectionService init (websocket)");
    console.log("WS:ReadyState: " + this.ws.readyState);

    return 1;
    //this.initLiveHooks();
  };
  auth = (authType, username, password, token) => {
    return new Promise((resolve, reject) => {
      if (authType === ConnectionService.authTypes.manualLogin) {
        this.sendSingleWSMessage(
          HoSoHelper.buildLoginString(username, password)
        )
          .then((rData) => {
            if (rData.isAuth) {
             this.gadgetSetupReceiver().then((rGadgets) =>{
                resolve({...rData, ...rGadgets});
             }).catch((rData) => {
                 reject(rData);
             });
            } else {
              reject(rData);
            }
          })
          .catch((rData) => {
            reject(rData);
          });
      } else {
        //TODO: AUTO_LOGIN
      }
    });
  };

  disconnect = () => {
    if (this.ws !== null && this.wsState === this.wsConnectionStates.open) {
      return this.connectionTeardown();
    } else {
      console.log("Connection not open or ws instance null");
      return -1;
    }
  };
  connectionTeardown = () => {
    this.wsState = this.wsCustomInterdiaryStates.disconnecting;
    this.ws.close(1000, "Client request disconnection");
    return 1;
  };
  sendSingleWSMessage = (message) => {
    return new Promise((resolve, reject) => {
      this.ws.onopen = (e) => {
        if (this.ws.readyState === this.wsConnectionStates.open) {
          this.ws.send(message);
          this.ws.onmessage = (e) => {
            resolve(this.encapsulateHoSoMessage(e.data));
          };
        } else {
          console.log("error: ws state not open");
          reject("error: ws state not open");
        }
      };
    });
  };

  encapsulateHoSoMessage = (encapsulatedData) => {
    switch (HoSoHelper.parseHoSoMessage(encapsulatedData).type) {
      //TODO: REMOVE AFTER REQUEST SUCESSAUTOLOGIN RESPONSE PARAM UPDATE
      //polyfill empty values at request-level
      case "AUTO_LOGIN_RESULT":
      case "MANUAL_LOGIN_RESULT":
        return {
          isAuth: true,
          username: HoSoHelper.parseHoSoMessage(encapsulatedData).username,
          isAdmin: HoSoHelper.parseHoSoMessage(encapsulatedData).isAdmin,
          homeAlias: HoSoHelper.parseHoSoMessage(encapsulatedData).homeAlias,
          token: HoSoHelper.parseHoSoMessage(encapsulatedData).token,
        };
      case "ERROR":
        return {
          errorCode: HoSoHelper.parseHoSoMessage(encapsulatedData).errorCode,
          description: HoSoHelper.parseHoSoMessage(encapsulatedData)
            .description,
        };
      case "GADGET_LIST":
        return {
          gadgets: HoSoHelper.parseHoSoMessage(encapsulatedData).gadgets,
        };
      default:
    }
  };
  gadgetSetupReceiver = () => {
    return new Promise((resolve, reject) => {
        this.ws.onmessage = e => {
            if(HoSoHelper.parseHoSoMessage(e.data).type === 'GADGET_LIST'){
                resolve(this.encapsulateHoSoMessage(e.data))
            } 
            reject('error: wrong received HoSo message');
        }
    });
  }

  initLiveHooks = () => {
    this.ws.onopen = (e) => {
      console.log("ConnectionService init (reset)(websocket)");
      console.log("WS:ReadyState: " + this.ws.readyState);
    };
    this.ws.onmessage = (e) => {
        console.log('live-hook: ', e.data);
        
    };
    this.ws.onerror = (e) => {};
    this.ws.onclose = (e) => {};
  };
}
export default ConnectionService;
