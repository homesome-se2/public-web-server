import EEmitter from './EEmitter';

class exEEmitterRVHub {
  /////////////////////////////////////
  ////////////// EVENTS ///////////////
  /////////////////////////////////////
  static events = {
    onExecutionStarted: '$onExecutionStarted-exEEmitterRVHub',
    onExecutionCompleted: '$onExecutionCompleted-exEEmitterRVHub',
    onExecutionError: '$onExecutionError-exEEmitterRVHub',
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
  emitOnExecutionStarted = (...args) => {
    this.EEInstance.emit(exEEmitterRVHub.events.onExecutionStarted, ...args);
  };
  emitOnPExecutionCompleted = (...args) => {
    this.EEInstance.emit(exEEmitterRVHub.events.onExecutionCompleted, ...args);
  };
  emitOnExecutionError = (...args) => {
    this.EEInstance.emit(exEEmitterRVHub.events.onExecutionError, ...args);
  };
}
export default exEEmitterRVHub;
