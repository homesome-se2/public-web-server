import csEEmitterRVHub from '../EEmitters/RVHubs/csEEmitterRVHub';
import HoSoHelper from '../helpers/HoSoHelper';

class ConnectionService {
  /////////////////////////////////////
  ////////////// DEF /////////////////
  ///////////////////////////////////
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
    this.csEEmitterRVHub = new csEEmitterRVHub();
  }
  getCSEEmitterRVHubInstance = () => {
    return this.csEEmitterRVHub;
  };
  static messageTransmissionOptions = {
    transmissionModes: {
      fast: '@FAST',
      safe: '@SAFE',
    },
    executingModes: {
      waitAndContinue: '@WAIT_RESPONSE_CONTINUE',
      asyncContinue: '@EXEC_CONTINUE',
    },
  };

  /////////////////////////////////////
  /////////////  CONNECT  ////////////
  ///////////////////////////////////
  connect = () => {
    return new Promise((resolve, reject) => {
      if (this.wsState === this.wsConnectionStates.open) {
        this.disconnect();
        console.log('ws socket already open');
        reject('WS_ALREADY_OPEN'); //=todo: UPDATE DISCONNECT/RECONNECT POLICY
      }
      this.wsState = this.wsConnectionStates.connecting;
      this.ws = new WebSocket(this.wsUrl);
      this.ws.binaryType = 'arraybuffer';

      /////////////////////////////// csEEMitterRVHub: emitOnConnectionOpening
      console.log('ConnectionService initinializing...');
      this.csEEmitterRVHub.emitOnConnectionOpening(this.ws);
      /////////////////////////////// csEEMitterRVHub: emitOnConnectionOpening

      this.ws.onopen = (e) => {
        console.log('ConnectionService initialized');
        console.log('WS:ReadyState: ' + this.ws.readyState);
        this.wsState = this.wsConnectionStates.open;
        /////////////////////////////// csEEMitterRVHub: emitOnConnectionOpen
        this.csEEmitterRVHub.emitOnConnectionOpen(this.ws);
        /////////////////////////////// csEEMitterRVHub: emitOnConnectionOpen

        /////////////////////////////// csLiveHooks: init
        this.initCSLiveHooks();
        /////////////////////////////// csLiveHooks: init
        resolve(this.ws);
      };
    });
  };
  /////////////////////////////////////
  /////////////  AUTH  ////////////
  ///////////////////////////////////
  auth = (state, action) => {
    switch (action.type) {
      case 'AUTH_MANUAL_LOGIN':
        return new Promise((resolve, reject) => {
          this.send(
            HoSoHelper.buildHoSoString(
              { username: state.username, password: state.password },
              { type: 'AUTH_MANUAL_LOGIN' }
            ),
            {
              transmissionMode:
                ConnectionService.messageTransmissionOptions.transmissionModes
                  .fast,
              executingMode:
                ConnectionService.messageTransmissionOptions.executingModes
                  .asyncContinue,
            }
          )
            .then((rData) => {
              resolve(rData);
            })
            .catch((err) => {
              reject(err);
            });
        });
      case 'AUTH_AUTO_LOGIN':
      default:
    }
  };

  /////////////////////////////////////
  /////////////  WS-SEND  ////////////
  ///////////////////////////////////
  //-> {message: ''}, {transmissionMode: 'FAST', executingMode: '@WAIT_RESPONSE_CONTINUE'}
  send = (message, action) => {
    switch (action.transmissionMode) {
      case ConnectionService.messageTransmissionOptions.transmissionModes.fast:
        return new Promise((resolve, reject) => {
          if (this.ws.readyState === this.wsConnectionStates.open) {
            this.ws.send(message);
            ///-> only for special dev purposes - use centralized otherwise
            if (
              action.executingMode ===
              ConnectionService.messageTransmissionOptions.executingModes
                .waitAndContinue
            ) {
              this.ws.onmessage = (e) => {
                console.log('response: ', e.data);
                resolve(e.data); //=TODO: PLUG THE PLDS!!
              };
            } else {
              resolve();
            }
          } else {
            console.log('error: ws state not open');
            reject('error: ws state not open');
          }
        });
      case ConnectionService.messageTransmissionOptions.transmissionModes.safe:
      default:
        return new Promise((resolve, reject) => {
          this.ws.onopen = (e) => {
            if (this.ws.readyState === this.wsConnectionStates.open) {
              this.ws.send(message);
              ///-> only for special dev purposes - use centralized otherwise
              if (
                action.executingMode ===
                ConnectionService.messageTransmissionOptions.executingModes
                  .waitAndContinue
              ) {
                this.ws.onmessage = (e) => {
                  resolve(e.data); //=TODO: PLUG THE PLDS!!
                };
              } else {
                resolve();
              }
            } else {
              console.log('error: ws state not open');
              reject('error: ws state not open');
            }
          };
        });
    }
  };
  /////////////////////////////////////
  /////////////  cs-LIVEHOOKS ////////
  ///////////////////////////////////
  initCSLiveHooks = () => {
    console.log('cs-LIVEHOOKS: initialized');
    /////////////////////////////// csEEMitterRVHub: emitonCSLiveHooksInitialized
    this.csEEmitterRVHub.emitOnCSLiveHooksInitialized(this.ws);
    /////////////////////////////// csEEMitterRVHub: emitonCSLiveHooksInitialized

    this.ws.onopen = (e) => {
      console.log('ConnectionService initialized. (reset)(websocket)');
      console.log('WS:ReadyState: ' + this.ws.readyState);
      /////////////////////////////// csEEMitterRVHub: emitOnConnectionOpen
      this.csEEmitterRVHub.emitOnConnectionOpen(this.ws);
      /////////////////////////////// csEEMitterRVHub: emitOnConnectionOpen
    };

    this.ws.onmessage = (e) => {
      console.log('message received: ', e.data);
      /////////////////////////////// csEEMitterRVHub: emitOnMessageReceived
      this.csEEmitterRVHub.emitOnMessageReceived(e.data);
      /////////////////////////////// csEEMitterRVHub: emitOnMessageReceived
    };
    this.ws.onerror = (e) => {
      /////////////////////////////// csEEMitterRVHub: emitOnConnectionError
      this.csEEmitterRVHub.emitOnConnectionError(e.data);
      /////////////////////////////// csEEMitterRVHub: emitOnConnectionError
    };
    this.ws.onclose = (e) => {
      /////////////////////////////// csEEMitterRVHub: emitOnConnectionClosed
      this.csEEmitterRVHub.emitOnConnectionClosed(this.ws);
      /////////////////////////////// csEEMitterRVHub: emitOnConnectionClosed
    };
  };

  /////////////////////////////////////
  /////////////  C-TEARDOWN  /////////
  ///////////////////////////////////
  disconnect = () => {
    if (this.ws !== null && this.wsState === this.wsConnectionStates.open) {
      return this.connectionTeardown();
    } else {
      console.log('Connection not open or ws instance null');
      return -1;
    }
  };
  connectionTeardown = () => {
    this.wsState = this.wsCustomInterdiaryStates.disconnecting;
    this.ws.close(1000, 'Client request disconnection');
    /////////////////////////////// csEEMitterRVHub: emitOnConnectionClosed
    this.csEEmitterRVHub.emitOnConnectionClosed(this.ws);
    /////////////////////////////// csEEMitterRVHub: emitOnConnectionClosed
    return 1;
  };
}

export default ConnectionService;
