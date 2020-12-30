import Gadget from '../models/Gadget';

class UContextAdapter {
  constructor() {
    this.CChangeListener();
  }
  CChangeListener = () => {};
  static updateUCGadgetAlias = (state, ...update) => {
    for (let g of state.gadgets) {
      if (g.id === update[0].props?.gadgetID)
        g.alias = update[0].props?.newAlias;
    }

    return state;
  };
  static updateUCUserData = (state, ...update) => {
    state.isAuth = update[0].props.isAuth;
    state.username = update[0].props.C_nameID;
    state.isAdmin = update[0].props.C_isAdmin;
    state.token = update[0].props.C_SessionKey;
    state.homeAlias = update[0].props.H_Alias;
    return state;
  };
  static clearContext = () => {
    return {};
  };
  static updateUCGadgetData = (state, ...update) => {
    state.gadgets = update[0].props?.gadgets;
    return state;
  };
  static updateUCGadgetGroupData = (state, ...update) => {
    state.gadgetsGroups = update[0].props?.gadgetsGroups.reverse();
    state.selectedGadgetGroup = update[0].props?.gadgetsGroups[0];
    return state;
  };
  static updateUCGadgetState = (state, ...update) => {
    for (let g of state.gadgets) {
      if (g.id === update[0].props?.gadgetID)
        g.state = update[0].props?.newState;
    }

    return state;
  };
  static addGadget = (state, ...update) => {
    state.gadgets.push(update[0].props);
    return state;
  };
  static removeGadget = (state, ...update) => {
    console.log('removed: ', update[0].props.gadgetID);
    for (let i = 0; i < state.gadgets.length; i++) {
      if (state.gadgets[i].gadgetID === update[0].props.gadgetID)
        state.gadgets.splice(i, 1);
    }

    console.log('state:-->', state);
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
