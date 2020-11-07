class HoSoSpecifics {
  static syntax = {
    singleSeparator: ':',
    doubleSeparator: '::',
  };
  static commandCodes = {
    sending: {
      auth: {
        manualLogin: '101',
        autoLogin: '103',
        logOut: '105',
      },
      gadgetState: {
        fetchGadgets: '301',
        fetchGadgetGroups: '370',
        alterGadgetState: '311',
      },
    },
    receiving: {
      auth: {
        successfulManualLogin: '102',
        successfulAutoLogin: '104',
        unsuccessfulLogin: '903',
      },
      gadgetState: {
        fetchGadgets: '304',
        fetchGadgetGroups: '373',
        gadgetStateChange: '316',
        GadgetAddition: '352',
        gadgetRemoval: '354',
      },
      global: {
        exception: '901',
        ping: 'ping',
      },
    },
  };

  static syntaxSpecifics = {
    separator: '::',
    sendingCommandCodes: {
      auth: {
        manualLogin: '101',
        autoLogin: '103',
        logOut: '105',
      },
    },
    receivingCommandCodes: {
      successfulManualLogin: '102',
      successfulAutoLogin: '104',
      gadgetFetching: '304',
      gadgetStateUpdate: '316',
      serverException: '901',
      unsuccessfulLogin: '903',
    },
    invalidLocalCodes: {
      invalid: '_INVALID_',
    },
  };
}

export default HoSoSpecifics;