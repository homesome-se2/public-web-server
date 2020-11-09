import EEmitter from './EEmitter';

class paEmitterRVHub {
  /////////////////////////////////////
  ////////////// EVENTS ///////////////
  /////////////////////////////////////
  static events = {
    onParsingStarted: '$onParsingStarted-paEmitterRVHub',
    onParsingCompleted: '$onParsingCompleted-paEmitterRVHub',
    onParsingError: '$onParsingError-paEmitterRVHub',
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
  emitOnParsingStarted = (...args) => {
    this.EEInstance.emit(paEmitterRVHub.events.onParsingStarted, ...args);
  };
  emitOnParsingCompleted = (...args) => {
    this.EEInstance.emit(paEmitterRVHub.events.onParsingCompleted, ...args);
  };
  emitOnParsingError = (...args) => {
    this.EEInstance.emit(paEmitterRVHub.events.onParsingError, ...args);
  };
}
export default paEmitterRVHub;
