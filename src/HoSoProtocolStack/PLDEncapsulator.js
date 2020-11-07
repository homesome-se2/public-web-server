import ENLObject from './LDOModels/ENLObject';

class PLDEncapsulator {
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
  send = (UContextAdapterObject) => {};
  recv = (ELObject) => {
    const LDO = this.process(ELObject, { type: 'RECV' });
    console.log('PLDEncapsulator: ', LDO);

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
    switch (obj.payload.type) {
      case 'SUCCESSFUL_MANUAL_LOGIN':
        return new ENLObject({
          C_nameID: obj.payload.data[0],
          C_isAdmin: obj.payload.data[1],
          H_Alias: obj.payload.data[2],
          C_SessionKey: obj.payload.data[3],
        });
      default:
    }
  };
}

export default PLDEncapsulator;
