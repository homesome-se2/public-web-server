import UContextAdapter from '../../contexts/UContextAdapter';
import ucEEmitterRVHub from '../../EEmitters/RVHubs/ucEEmitterRVHub';
import AuthRequest from '../../models/AuthRequest';
import HoSoSpecifics from '../HoSoSpecifics';
import ENLObject from '../LDOModels/ENLObject';

class PLDEncapsulator {
  /////////////////////////////////////
  ////////////// DEF /////////////////
  ///////////////////////////////////
  constructor(upperLayer, lowerLayer, ucEEmitterRVHub) {
    this.upperLayer = upperLayer;
    this.lowerLayer = lowerLayer;
    this.ucEEmitterRVHub = ucEEmitterRVHub;
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
  set ucEEmitterRVHub(adapter) {
    this._ucEEmitterRVHub = adapter;
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
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onSuccessfulManualLoginRVEEService,
          new ENLObject({
            C_nameID: obj.payload.data[0],
            C_isAdmin: obj.payload.data[1],
            H_Alias: obj.payload.data[2],
            C_SessionKey: obj.payload.data[3],
          })
        );
        break;
      case 'GADGET_LIST':
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onGadgetFetchCompleteRVEEService,
          new ENLObject({
            gadgets: UContextAdapter.buildGadgetObjectArray(obj.payload.data),
          })
        );
        break;
      case 'GADGET_GROUPS':
        const groups = [];
        for (let g of obj.payload.data) {
          groups.push({
            name: g.split(HoSoSpecifics.syntax.singleSeparator)[0],
            gadgetIds: g.split(HoSoSpecifics.syntax.singleSeparator).slice(1),
          });
        }
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onGadgetGroupFetchCompleteRVEEService,
          new ENLObject({
            gadgetsGroups: groups,
          })
        );
      default:
        break;
    }
  };
  appendRequest = (type) => {
    return type + '_REQUEST';
  };
}

export default PLDEncapsulator;
