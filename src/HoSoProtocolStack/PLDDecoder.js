import HoSoSpecifics from './HoSoSpecifics';
import DLObject from './LDOModels/DLObject';

class PLDDecoder {
  /////////////////////////////////////
  ////////////// DEF /////////////////
  ///////////////////////////////////
  constructor(upperLayer, lowerLayer) {
    this.upperLayer = upperLayer;
    this.lowerLayer = lowerLayer;
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
  /////////////////////////////////////
  ////////////// IOPs  ///////////////
  ///////////////////////////////////
  send = (ELObject) => {};
  recv = (PLObject) => {
    const LDO = this.process(PLObject, { type: 'RECV' });
    console.log('PLDDecoder: ', LDO);

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
  process_send = (obj) => {};
  process_recv = (obj) => {
    switch (obj.commandCode) {
      case HoSoSpecifics.commandCodes.receiving.auth.successfulManualLogin:
        return new DLObject(
          { type: 'SUCCESSFUL_MANUAL_LOGIN', directives: {} }, //header
          obj.params // payload
        );
      default:
    }
  };
}

export default PLDDecoder;
