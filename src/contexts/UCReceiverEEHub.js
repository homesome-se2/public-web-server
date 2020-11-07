import EEmitter from '../helpers/EEmitter';

class UCReceiverEEHub {
  static events = {
    onHoSoMessageReceived: '$onHoSoMessageReceivedRVEService',
    onSuccessfulManualLogin: '$onHosoSuccessfulManaulLogin',
  };
  constructor() {
    this.EEInstance = new EEmitter();
  }
  getEEInstance = () => {
    return this.EEInstance;
  };
  emitGEvent = (eName, ...args) => {
    this.EEInstance.emit(eName, ...args);
  };
}

export default UCReceiverEEHub;
