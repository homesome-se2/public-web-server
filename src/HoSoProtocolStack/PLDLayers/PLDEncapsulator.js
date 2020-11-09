import UContextAdapter from '../../contexts/UContextAdapter';
import UCReceiverEEHub from '../../contexts/UCReceiverEEHub';
import AuthRequest from '../../models/AuthRequest';
import ELObject from '../LDOModels/ELObject';
import ENLObject from '../LDOModels/ENLObject';

class PLDEncapsulator {
  /////////////////////////////////////
  ////////////// DEF /////////////////
  ///////////////////////////////////
  constructor(upperLayer, lowerLayer, UCReceiverEEHub) {
    this.upperLayer = upperLayer;
    this.lowerLayer = lowerLayer;
    this.UCReceiverEEHub = UCReceiverEEHub;
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
  set UCReceiverEEHub(adapter) {
    this._UCReceiverEEHub = adapter;
  }
  /////////////////////////////////////
  ////////////// IOPs  ///////////////
  ///////////////////////////////////
  send = (UContextAdapterObject) => {
    const LDO = this.process(UContextAdapterObject, { type: 'SEND' });
    console.log('PLDEncapsulator: ', LDO);

    if (this.getUpperlayer()) this.getUpperlayer().send(LDO);
  };
  recv = (ELObject) => {
    const LDO = this.process(ELObject, { type: 'RECV' });
    console.log('PLDEncapsulator: ', this);

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
  process_send = (obj) => {
    switch (obj.constructor) {
      case AuthRequest:
        return new ENLObject({
          type: obj.type,
          data: obj.state,
        });
      default:
        return new ENLObject({ type: '!ERR: WRONG FORMAT', data: null });
    }
  };
  process_recv = (obj) => {
    switch (obj.payload.type) {
      case 'SUCCESSFUL_MANUAL_LOGIN':
        this._UCReceiverEEHub.getEEInstance().emit(
          UCReceiverEEHub.events.onSuccessfulManualLogin,
          new ENLObject({
            C_nameID: obj.payload.data[0],
            C_isAdmin: obj.payload.data[1],
            H_Alias: obj.payload.data[2],
            C_SessionKey: obj.payload.data[3],
          })
        );
        break;
      case 'GADGET_LIST':
        this._UCReceiverEEHub.getEEInstance().emit(
          UCReceiverEEHub.events.onGadgetFetchRVEEService,
          new ENLObject({
            gadgets: UContextAdapter.buildGadgetObjectArray(obj.payload.data),
          })
        );
        break;
      default:
        break;
    }
  };
  appendRequest = (type) => {
    return type + '_REQUEST';
  };
}

export default PLDEncapsulator;
