import EEmitter from './EEmitter';

class paEEmitterRVHub {
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
    this.EEInstance.emit(paEEmitterRVHub.events.onParsingStarted, ...args);
  };
  emitOnParsingCompleted = (...args) => {
    this.EEInstance.emit(paEEmitterRVHub.events.onParsingCompleted, ...args);
  };
  emitOnParsingError = (...args) => {
    this.EEInstance.emit(paEEmitterRVHub.events.onParsingError, ...args);
  };
}
export default paEEmitterRVHub;
