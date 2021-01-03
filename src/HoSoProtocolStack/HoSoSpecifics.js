class HoSoSpecifics {
  static syntax = {
    singleSeparator: ':',
    doubleSeparator: '::',
    invalid: '_INVALID_',
  };
  static commandCodes = {
    sending: {
      auth: {
        manualLogin: '101',
        autoLogin: '103',
        logOutThis: '105',
        logOutAll: '106',
      },
      gadgetState: {
        fetchGadgets: '301',
        fetchGadgetGroups: '370',
        alterGadgetState: '311',
        alterGadgetAlias: '401',
      },
      global: {
        ping: 'ping',
      },
    },
    receiving: {
      auth: {
        successfulManualLogin: '102',
        successfulAutoLogin: '104',
        unsuccessfulLogin: '903',
        successfulLogout: '107',
      },
      gadgetState: {
        fetchGadgets: '304',
        fetchGadgetGroups: '373',
        gadgetStateChange: '316',
        gadgetAddition: '352',
        gadgetRemoval: '354',
        gadgetAliasChange: '404',
      },
      global: {
        exception: '901',
        hubDisconnectedException: '904',
      },
    },
  };
}

export default HoSoSpecifics;