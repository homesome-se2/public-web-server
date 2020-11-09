import EEmitter from './EEmitter';

class csEEmitterRVHub {
  /////////////////////////////////////
  ////////////// EVENTS ///////////////
  /////////////////////////////////////
  static events = {
    onConnectionOpen: '$onWSConnectionOpen-CSEEmitterRVHub',
    onConnectionOpening: '$onWSConnectionOpening-CSEEmitterRVHub',
    onConnectionClosed: '$onWSConnectionClosed-CSEEmitterRVHub',
    onCSLiveHooksInitialized: '$onWSonCSLiveHooksInitialized-CSEEmitterRVHub',
  };
  constructor() {
    this.EEInstance = new EEmitter();
  }
  getEEInstance = () => {
    return this.EEInstance;
  };
  /////////////////////////////////////
  ////////////// g-EMITTERS ///////////
  /////////////////////////////////////
  emitGEvent = (eName, ...args) => {
    this.EEInstance.emit(eName, ...args);
  };
  /////////////////////////////////////
  ////////////// l-EMITTERS ///////////
  /////////////////////////////////////
  emitOnConnectionOpen = (...args) => {
    this.EEInstance.emit(csEEmitterRVHub.events.onConnectionOpen, ...args);
  };
  emitOnConnectionOpening = (...args) => {
    this.EEInstance.emit(csEEmitterRVHub.events.onConnectionOpening, ...args);
  };
  emitOnConnectionClosed = (...args) => {
    this.EEInstance.emit(csEEmitterRVHub.events.onConnectionClosed, ...args);
  };
  emitonCSLiveHooksInitialized = (...args) => {
    this.EEInstance.emit(
      csEEmitterRVHub.events.onCSLiveHooksInitialized,
      ...args
    );
  };
}

export default csEEmitterRVHub;
