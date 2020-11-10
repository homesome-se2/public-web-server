import EEmitter from '../EEmitter';

class ucEEmitterRVHub {
  static events = {
    onHoSoMessageReceivedRVEEService:
      '$onHoSoMessageReceivedRVEServiceRVEEService',
    onSuccessfulManualLoginRVEEService:
      '$onHosoSuccessfulManaulLoginRVEEService',
    onUnSuccessfulManualLoginRVEEService:
      '$onHosoUnSuccessfulManaulLoginRVEEService',
    onServerExceptionRVEEService: '$onHosoServerExceptionRVEEService',
    onGadgetFetchCompleteRVEEService: '$onHosoGadgetListReceiveRVEEService',
    onGadgetGroupFetchCompleteRVEEService:
      '$onHosoGadgetGroupReceiveRVEEService',
    onGadgetStateChangeRVEEService: '$onHosoGadgetStateChangeRVEEService',
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

export default ucEEmitterRVHub;
