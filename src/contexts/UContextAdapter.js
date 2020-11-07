class UContextAdapter {
  constructor() {
    this.CChangeListener();
  }
  CChangeListener = () => {};
  static updateUCUserData = (state, update) => {
    state.username = update.props.C_nameID;
    state.isAdmin = update.props.C_isAdmin;
    state.token = update.props.C_SessionKey;
    state.homeAlias = update.props.H_Alias;
    return state;
  };
}

export default UContextAdapter;
