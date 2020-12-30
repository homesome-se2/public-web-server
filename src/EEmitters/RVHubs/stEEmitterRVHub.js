import EEmitter from '../EEmitter';

/////////////////////////////////////
/////// STATE-LIFECYCLE-HUB /////////
/////////////////////////////////////

class stEEmitterRVHub {
  /////////////////////////////////////
  ////////////// EVENTS ///////////////
  /////////////////////////////////////
  static events = {
    onStateMounted: '$onUCSetStateMounted-stEEmitterRVHub', //-> singleton instances are mounted
    onUserAuthStarted: '$onUCUserAuthStarted-stEEmitterRVHub',
    onUserAuthComplete: '$onUCUserAuthComplet-stEEmitterRVHub',
    onStateReady: '$onUCStateReady-stEEmitterRVHub', //-> state is formed and complete
    onLougoutState: '$onUCLougoutState-stEEmitterRVHub',
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
  emitOnStateMounted = (...args) => {
    this.EEInstance.emit(stEEmitterRVHub.events.onStateMounted, ...args);
  };
  emitOnUserAuthStarted = (...args) => {
    this.EEInstance.emit(stEEmitterRVHub.events.onUserAuthStarted, ...args);
  };
  emitOnUserAuthComplete = (...args) => {
    this.EEInstance.emit(stEEmitterRVHub.events.onUserAuthComplete, ...args);
  };
  emitOnStateReady = (...args) => {
    this.EEInstance.emit(stEEmitterRVHub.events.onStateReady, ...args);
  };
  emitLogout = (...args) => {
    this.EEInstance.emit(stEEmitterRVHub.events.onLougoutState, ...args);
  };
}

export default stEEmitterRVHub;
