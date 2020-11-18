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
}

export default stEEmitterRVHub;
