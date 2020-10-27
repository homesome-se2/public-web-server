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
  authTypes = {
    manualLogin: 0,
    autoLogin: 1,
  };

  constructor(wsUrl) {
    this.wsState = this.wsConnectionStates.closed;
    this.wsUrl = wsUrl;
    this.ws = null;
  }

  connect = () => {
    if (this.wsState === this.wsConnectionStates.open) {
      this.disconnect();
    } else if (this.wsState !== this.wsConnectionStates.closed) {
      console.log("ws socket already open");
      return -1;
    }

    this.wsState = this.wsConnectionStates.connecting;
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = "arraybuffer";

    this.initLiveHooks();
  };
  auth = (authType) => {
    if (authType === this.authTypes.manualLogin) {
    }
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
      if (this.ws.readyState === this.wsConnectionStates.open) {
        this.ws.send(message);
        this.ws.onmessage = (e) => {
          resolve(this.encapsulateHoSoMessage(e.data));
        };
      } else {
        console.log("error: ws state not open");
        reject("error: ws state not open");
      }
    });
  };

  encapsulateHoSoMessage = (encapsulatedData) => {
    switch (HoSoHelper.parseHoSoMessage(encapsulatedData).type) {
      //TODO: REMOVE AFTER REQUEST SUCESSAUTOLOGIN RESPONSE PARAM UPDATE
      //polyfill empty values at request-level
      case "AUTO_LOGIN_RESULT":
      case "MANUAL_LOGIN_RESULT":
        return {
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
                gadgets: HoSoHelper.parseHoSoMessage(encapsulatedData).gadgets
            };
      default:
    }
  };

  initLiveHooks = () => {
    this.ws.onopen = (e) => {};
    this.ws.onmessage = (e) => {};
    this.ws.onerror = (e) => {};
    this.ws.onclose = (e) => {};
  };
}
export default ConnectionService;
