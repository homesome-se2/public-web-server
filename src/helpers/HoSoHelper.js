import HoSoSpecifics from '../HoSoProtocolStack/HoSoSpecifics';

class HoSoHelper {
  static buildHoSoString = (state, action) => {
    switch (action.type) {
      case 'AUTH_MANUAL_LOGIN':
        return (
          HoSoSpecifics.commandCodes.sending.auth.autoLogin +
          HoSoSpecifics.syntax.doubleSeparator +
          state.username +
          HoSoSpecifics.syntax.doubleSeparator +
          state.password
        );
      case 'AUTH_AUTO_LOGIN':
        return (
          HoSoSpecifics.commandCodes.sending.auth.autoLogin +
          HoSoSpecifics.syntax.doubleSeparator +
          state.username +
          HoSoSpecifics.syntax.doubleSeparator +
          state.token
        );
      case 'AUTH_LOG_OUT':
        return (
          HoSoSpecifics.commandCodes.sending.auth.logOut +
          HoSoSpecifics.syntax.doubleSeparator
        );
      case 'GADGET_FETCH_GADGETS_LIST':
        return (
          HoSoSpecifics.commandCodes.sending.gadgetState.fetchGadgets +
          HoSoSpecifics.syntax.doubleSeparator
        );
      case 'GADGET_FETCH_GADGETS_GROUPS':
        return (
          HoSoSpecifics.commandCodes.sending.gadgetState.fetchGadgetGroups +
          HoSoSpecifics.syntax.doubleSeparator
        );
      case 'GADGET_ALTER_GADGET':
        return (
          HoSoSpecifics.commandCodes.sending.gadgetState.alterGadgetState +
          HoSoSpecifics.syntax.doubleSeparator +
          state.gadgetID +
          HoSoSpecifics.syntax.doubleSeparator +
          state.newState
        );
      case 'GLOBAL_PING':
        return (
          HoSoSpecifics.commandCodes.sending.global.ping +
          HoSoSpecifics.syntax.doubleSeparator
        );
      default:
    }
  };
}

export default HoSoHelper;
