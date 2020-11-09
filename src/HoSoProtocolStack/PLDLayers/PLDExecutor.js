import HoSoHelper from '../../helpers/HoSoHelper';
import ELObject from '../LDOModels/ELObject';

class PLDExecutor {
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
  send = (ENLObject) => {
    const LDO = this.process(ENLObject, { type: 'SEND' });
    console.log('PLDExecutor: ', LDO);

    if (this.getUpperlayer()) this.getUpperlayer().send(LDO);
  };
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
  process_send = (ENLObject) => {
    return new ELObject({
      type: ENLObject.props.type,
      data: ENLObject.props.data,
    });
  };
  process_recv = (obj) => {
    if (Object.entries(obj.header.directives).length > 0)
      this.exec(obj.header.directives);
    return new ELObject({ type: obj.header.type, data: obj.payload });
  };
  exec = (ENLDObject) => {
    //exec async directives
    let d_Promises = [];

    console.log('ws: ', this._CServiceInstance);

    console.log('im executing directives: ', ENLDObject);
    console.log('im executing directives length: ', ENLDObject.length);
  };
}

export default PLDExecutor;
