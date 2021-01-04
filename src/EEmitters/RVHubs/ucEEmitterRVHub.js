import EEmitter from '../EEmitter';

class ucEEmitterRVHub {
  static events = {
    onHoSoMessageReceivedRVEEService:
      '$onHoSoMessageReceivedRVEServiceRVEEService',
    onSuccessfulManualLoginRVEEService:
      '$onHosoSuccessfulManaulLoginRVEEService',
    onSuccessfulAutoLoginRVEEService: '$onHosoSuccessfulAutoLoginRVEEService',
    onSuccessfulLogoutRVEEService: '$onHoSoSuccessfulLogoutRVEEService',
    onUnSuccessfulLoginRVEEService: '$onHosoUnSuccessfulLoginRVEEService',
    onHubDisconnectedRVEEService: '$onHosoHubDisconnectedRVEEService',
    onServerExceptionRVEEService: '$onHosoServerExceptionRVEEService',
    onGadgetFetchCompleteRVEEService: '$onHosoGadgetListReceiveRVEEService',
    onGadgetGroupFetchCompleteRVEEService:
      '$onHosoGadgetGroupReceiveRVEEService',
    onGadgetStateChangeRVEEService: '$onHosoGadgetStateChangeRVEEService',
    onGadgetAliasChangeRVEEService: '$onHosoGadgetAliasChangeRVEEService',
    onGadgetAddedRVEEService: '$onHosoGadgetAddedRVEEService',
    onGadgetRemovedRVEEService: '$onHosoGadgetRemovedRVEEService',
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
