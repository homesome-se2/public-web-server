import EEmitter from './EEmitter';

class csEEmitterRVHub {
  /////////////////////////////////////
  ////////////// EVENTS ///////////////
  /////////////////////////////////////
  static events = {
    onConnectionOpen: '$onWSConnectionOpen-CSEEmitterRVHub',
    onConnectionOpening: '$onWSConnectionOpening-CSEEmitterRVHub',
    onConnectionClosed: '$onWSConnectionClosed-CSEEmitterRVHub',
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
    this.EEInstance.emit(this.events.onConnectionOpen, ...args);
  };
  emitOnConnectionOpening = (...args) => {
    this.EEInstance.emit(this.events.onConnectionOpening, ...args);
  };
  emitOnConnectionClosed = (...args) => {
    this.EEInstance.emit(this.events.onConnectionClosed, ...args);
  };
}

export default csEEmitterRVHub;
