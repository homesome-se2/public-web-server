import Gadget from '../models/Gadget';

class UContextAdapter {
  constructor() {
    this.CChangeListener();
  }
  CChangeListener = () => {};
  static updateUCUserData = (state, ...update) => {
    state.username = update[0].props.C_nameID;
    state.isAdmin = update[0].props.C_isAdmin;
    state.token = update[0].props.C_SessionKey;
    state.homeAlias = update[0].props.H_Alias;
    return state;
  };
  static updateUCGadgetData = (state, ...update) => {
    state.gadgets = update[0].props?.gadgets;
    return state;
  };
  static updateUCGadgetGroupData = (state, ...update) => {
    state.gadgetsGroups = update[0].props?.gadgetsGroups;
    return state;
  };
  static updateUCGadgetState = (state, ...update) => {
    for (let g of state.gadgets) {
      if (g.id === update[0].props?.gadgetID)
        g.state = update[0].props?.newState;
    }
    console.log('+g:', state);

    return state;
  };
  static buildGadgetObjectArray = (paramsArray) => {
    let gadgetList = [];
    for (let i = 0; i < Number(paramsArray[0]); i++) {
      gadgetList.push(
        new Gadget(
          paramsArray[i * Gadget.gadgetProperties + 1],
          paramsArray[i * Gadget.gadgetProperties + 2],
          paramsArray[i * Gadget.gadgetProperties + 3],
          paramsArray[i * Gadget.gadgetProperties + 4],
          paramsArray[i * Gadget.gadgetProperties + 5],
          paramsArray[i * Gadget.gadgetProperties + 6]
        )
      );
    }
    return gadgetList;
  };
}

export default UContextAdapter;
