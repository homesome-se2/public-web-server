class HoSoSpecifics {
    static syntaxSpecifics = {
        separator: '::',
        sendingCommandCodes: {
          manualLogin: '101',
          autoReconnect: '103',
          logOut: '105',
        },
        receivingCommandCodes: {
          successfulManualLogin: '102',
          successfulAutoLogin: '104',
          gadgetFetching: '304',
          gadgetStateUpdate: '316',
          serverException: '901',
          unsuccessfulLogin: '903'
          
        },
        invalidLocalCodes: {
          invalid: '_INVALID_'
        }
      };
}
 
export default HoSoSpecifics;