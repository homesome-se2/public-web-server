import csEEmitterRVHub from '../EEmitters/csEEmitterRVHub';

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
      };
    });
  };
  /////////////////////////////////////
  /////////////  WS-SEND  ////////////
  ///////////////////////////////////
  //-> {message: ''}, {transmissionMode: 'FAST', executingMode: '@WAIT_RESPONSE_CONTINUE'}
  send = (message, action) => {
    switch (action.transmissionMode) {
      case 'FAST':
        return new Promise((resolve, reject) => {
          if (this.ws.readyState === this.wsConnectionStates.open) {
            this.ws.send(message);
            ///-> only for special dev purposes - use centralized otherwise
            if (
              action.executingMode ===
              this.transmissionModes.executingModes.waitAndContinue
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
        });
      case 'SAFE':
      default:
        return new Promise((resolve, reject) => {
          this.ws.onopen = (e) => {
            if (this.ws.readyState === this.wsConnectionStates.open) {
              this.ws.send(message);
              ///-> only for special dev purposes - use centralized otherwise
              if (
                action.executingMode ===
                this.transmissionModes.executingModes.waitAndContinue
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
