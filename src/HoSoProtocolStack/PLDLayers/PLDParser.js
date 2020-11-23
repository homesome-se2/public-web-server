import HoSoHelper from '../../helpers/HoSoHelper';
import ConnectionService from '../../services/ConnectionService';
import HoSoSpecifics from '../HoSoSpecifics';
import PLObject from '../LDOModels/PLObject';

class PLDParser {
  /////////////////////////////////////
  ////////////// DEF /////////////////
  ///////////////////////////////////
  constructor(upperLayer, lowerLayer, CService) {
    this.upperLayer = upperLayer;
    this.lowerLayer = lowerLayer;
    this.CServiceInstance = CService;
  }
  /**
   * @param {Object} layer
   */
  set upperLayer(layer) {
    this._upperLayer = layer;
  }
  /**
   * @param {Object} layer
   */
  set lowerLayer(layer) {
    this._lowerLayer = layer;
  }
  /**
   * @param {Object} layer
   */
  set CServiceInstance(CServiceInstance) {
    this._CServiceInstance = CServiceInstance;
  }
  /////////////////////////////////////
  ////////////// IOPs  ///////////////
  ///////////////////////////////////
  send = (DLObject) => {
    const LDO = this.process(DLObject, { type: 'SEND' });
    console.log('PLDParser| send: ', LDO);

    if (this.getUpperlayer()) this.getUpperlayer().send(LDO);
    else
      return new Promise((resolve, reject) => {
        this._CServiceInstance
          .send(LDO, {
            transmissionMode:
              ConnectionService.messageTransmissionOptions.transmissionModes
                .fast,
            executingMode:
              ConnectionService.messageTransmissionOptions.executingModes
                .asyncContinue,
          })
          .then((rData) => {
            console.log('######YOU GOT RESOLVED: ', rData);
            resolve(rData);
          })
          .catch((err) => {
            console.log('######YOU GOT REJECTED: ', err);
            reject(err);
          });
      });
  };
  recv = (HoSoMessage) => {
    const LDO = this.process(HoSoMessage, { type: 'RECV' });
    console.log('PLDParser| recv: ', LDO);

    if (this.getLowerlayer()) this.getLowerlayer().recv(LDO);
  };
  process = (obj, action) => {
    switch (action.type) {
      case 'SEND':
        return this.process_send(obj);
      case 'RECV':
        return this.process_recv(obj);
      default:
        return this.process_recv(obj);
    }
  };
  /////////////////////////////////////
  ////////////// Layers //////////////
  ///////////////////////////////////
  getLowerlayer = () => {
    return this._lowerLayer;
  };
  getUpperlayer = () => {
    return this._upperLayer;
  };
  /////////////////////////////////////
  ////////////// OPs impl ////////////
  ///////////////////////////////////
  process_send = (DLObject) => {
    return HoSoHelper.buildHoSoString(DLObject.payload, {
      type: DLObject.header.type,
    });
  };
  process_recv = (obj) => {
    return new PLObject(
      obj.split(HoSoSpecifics.syntax.doubleSeparator)[0],
      obj.split(HoSoSpecifics.syntax.doubleSeparator).slice(1)
    );
  };
}

export default PLDParser;
