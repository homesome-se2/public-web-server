import HoSoHelper from '../../helpers/HoSoHelper';
import HoSoSpecifics from '../HoSoSpecifics';
import DLObject from '../LDOModels/DLObject';
import ENLDObject from '../LDOModels/ENLDObject';

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
  send = (ELObject) => {
    const LDO = this.process(ELObject, { type: 'SEND' });
    console.log('PLDDecoder: ', LDO);

    if (this.getUpperlayer()) this.getUpperlayer().send(LDO);
  };
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
  process_send = (ELObject) => {
    return new DLObject(
      {
        type: ELObject.payload.type,
        directives: {},
      }, //header
      ELObject.payload.data // payload
    );
  };
  process_recv = (obj) => {
    switch (obj.commandCode) {
      case HoSoSpecifics.commandCodes.receiving.auth.successfulManualLogin:
        return new DLObject(
          { type: 'SUCCESSFUL_MANUAL_LOGIN', directives: {} }, //header
          obj.params // payload
        );
      case HoSoSpecifics.commandCodes.receiving.gadgetState.fetchGadgets:
        return new DLObject(
          {
            type: 'GADGET_LIST',
            directives: [
              new ENLDObject(
                'FETCH_AND_MERGE',
                [
                  HoSoHelper.buildHoSoString(
                    {},
                    { type: 'GADGET_FETCH_GADGETS_GROUPS' }
                  ),
                ],
                ENLDObject.executingMode.asyncContinue
              ),
            ],
          }, //header
          obj.params // payload
        );
      case HoSoSpecifics.commandCodes.receiving.gadgetState.fetchGadgetGroups:
        return new DLObject(
          {
            type: 'GADGET_GROUPS',
            directives: [],
          }, //header
          obj.params // payload
        );
      default:
    }
  };
}

export default PLDDecoder;
