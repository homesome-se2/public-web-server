import EEmitter from './EEmitter';

class enEEmitterRVHub {
  /////////////////////////////////////
  ////////////// EVENTS ///////////////
  /////////////////////////////////////
  static events = {
    onEncapsulationStarted: '$onEncapsulationStarted-enEEmitterRVHub',
    onEncapsulationCompleted: '$onEncapsulationCompleted-enEEmitterRVHub',
    onEncapsulationError: '$onEncapsulationError-enEEmitterRVHub',
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
  emitOnEncapsulationStarted = (...args) => {
    this.EEInstance.emit(
      enEEmitterRVHub.events.onEncapsulationStarted,
      ...args
    );
  };
  emitOnEncapsulationCompleted = (...args) => {
    this.EEInstance.emit(
      enEEmitterRVHub.events.onEncapsulationCompleted,
      ...args
    );
  };
  emitOnEncapsulationError = (...args) => {
    this.EEInstance.emit(enEEmitterRVHub.events.onEncapsulationError, ...args);
  };
}
export default enEEmitterRVHub;
