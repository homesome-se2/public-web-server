import EEmitter from './EEmitter';

class deEEmitterRVHub {
  /////////////////////////////////////
  ////////////// EVENTS ///////////////
  /////////////////////////////////////
  static events = {
    onDecodingStarted: '$onDecodingStarted-deEEmitterRVHub',
    onDecodingCompleted: '$onDecodingCompleted-deEEmitterRVHub',
    onDecodingError: '$onDecodingError-deEEmitterRVHub',
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
  emitOnDecodingStarted = (...args) => {
    this.EEInstance.emit(deEEmitterRVHub.events.onDecodingStarted, ...args);
  };
  emitOnDecodingCompleted = (...args) => {
    this.EEInstance.emit(deEEmitterRVHub.events.onDecodingCompleted, ...args);
  };
  emitOnDecodingError = (...args) => {
    this.EEInstance.emit(deEEmitterRVHub.events.onDecodingError, ...args);
  };
}
export default deEEmitterRVHub;
