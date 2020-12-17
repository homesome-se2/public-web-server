import UContextAdapter from '../../contexts/UContextAdapter';
import ucEEmitterRVHub from '../../EEmitters/RVHubs/ucEEmitterRVHub';
import AlterGadgetStateRequest from '../../models/AlterGadgetStateRequest';
import AuthRequest from '../../models/AuthRequest';
import LogoutRequest from '../../models/LogoutRequest';
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
    console.log('PLDEncapsulator| send: ', LDO);

    if (this.getUpperlayer()) this.getUpperlayer().send(LDO);
  };
  recv = (ELObject) => {
    const LDO = this.process(ELObject, { type: 'RECV' });
    console.log('PLDEncapsulator| recv: ', this);

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
      case AlterGadgetStateRequest:
        return new ENLObject({
          type: 'GADGET_ALTER_GADGET_STATE',
          data: obj,
        });
      case LogoutRequest:
        const typeString =
          obj.type === 'ALL' ? 'AUTH_LOGOUT_ALL' : 'AUTH_LOGOUT_THIS';
        return new ENLObject({
          type: typeString,
          data: obj,
        });
      default:
        return new ENLObject({ type: '!ERR: UNSUPPORTED REQUEST', data: null });
    }
  };
  process_recv = (obj) => {
    switch (obj.payload.type) {
      case 'SUCCESSFUL_MANUAL_LOGIN':
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onSuccessfulManualLoginRVEEService,
          new ENLObject({
            isAuth: true,
            C_nameID: obj.payload.data[0],
            C_isAdmin: obj.payload.data[1],
            H_Alias: obj.payload.data[2],
            C_SessionKey: obj.payload.data[3],
          })
        );
        break;
      case 'SUCCESSFUL_AUTO_LOGIN':
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onSuccessfulAutoLoginRVEEService,
          new ENLObject({
            isAuth: true,
            C_nameID: obj.payload.data[0],
            C_isAdmin: obj.payload.data[1],
            H_Alias: obj.payload.data[2],
            C_SessionKey: obj.payload.data[3],
          })
        );
        break;
      case 'SUCCESSFUL_LOGOUT':
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onSuccessfulLogoutRVEEService,
          new ENLObject({
            message: obj.payload.data,
          })
        );
        break;
      case 'UNSUCCESSFUL_LOGIN':
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onUnSuccessfulLoginRVEEService,
          new ENLObject({
            isAuth: false,
            C_nameID: HoSoSpecifics.syntax.invalid,
            C_isAdmin: HoSoSpecifics.syntax.invalid,
            H_Alias: HoSoSpecifics.syntax.invalid,
            C_SessionKey: HoSoSpecifics.syntax.invalid,
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
        break;
      case 'GADGET_STATE_CHANGE':
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onGadgetStateChangeRVEEService,
          new ENLObject({
            gadgetID: obj.payload.data[0],
            newState: obj.payload.data[1],
          })
        );
        break;
      case 'SERVER_EXCEPTION':
        this._ucEEmitterRVHub.getEEInstance().emit(
          ucEEmitterRVHub.events.onServerExceptionRVEEService,
          new ENLObject({
            errorCode: HoSoSpecifics.commandCodes.receiving.global.exception,
            description: obj.payload.data[0],
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
