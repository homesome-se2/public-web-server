import ELObject from '../LDOModels/ELObject';

class PLDExecutor {
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
  recv = (DLObject) => {
    const LDO = this.process(DLObject, { type: 'RECV' });
    console.log('PLDExecutor: ', LDO);

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
    if (!Object.entries(obj.header.directives).length === 0)
      this.exec(obj.header.directives);
    return new ELObject({ type: obj.header.type, data: obj.payload });
  };
  exec = (directives) => {
    //exec async directives
  };
}

export default PLDExecutor;
