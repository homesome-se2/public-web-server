import HoSoSpecifics from '../HoSoSpecifics';
import PLObject from '../LDOModels/PLObject';

class PLDParser {
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
  send = (DLObject) => {};
  recv = (HoSoMessage) => {
    const LDO = this.process(HoSoMessage, { type: 'RECV' });
    console.log('PLDParser: ', LDO);

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
    return new PLObject(
      obj.split(HoSoSpecifics.syntax.doubleSeparator)[0],
      obj.split(HoSoSpecifics.syntax.doubleSeparator).slice(1)
    );
  };
}

export default PLDParser;
