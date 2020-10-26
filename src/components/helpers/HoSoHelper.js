import LoginForm from "../form/LoginForm";

class HoSoHelper {
  static syntaxSpecifics = {
    separator: "::",
    sendingCommandCodes: {
      manualLogin: "101",
      autoReconnect: "103",
      logOut: "105",
    },
    receivingCommandCodes: {
      sucessfulManualLogin: "102",
      successfulAutoLogin: "104",
      error: "901",
    },
  };

  static buildLoginString = (username, password) => {
    return (
      this.syntaxSpecifics.sendingCommandCodes.manualLogin +
      this.syntaxSpecifics.separator +
      username +
      this.syntaxSpecifics.separator +
      password
    );
  };

  static buildLogoutString = () => {
    return this.syntaxSpecifics.sendingCommandCodes.logOut;
  };

  static buildAutoLoginString = (username, token) => {
    return (
      this.syntaxSpecifics.sendingCommandCodes.autoReconnect +
      this.syntaxSpecifics.separator +
      username +
      this.syntaxSpecifics.separator +
      token
    );
  };

  static parseString = (string) => {
    let params = string.split("::");
    return {
      commandCode: params[0],
      params: [...params.slice(1)],
    };
  };
  static parseHoSoMessage = message => {
      switch(this.parseString(message).commandCode){
            case HoSoHelper.syntaxSpecifics.receivingCommandCodes["successfulAutoLogin"]:
                //TODO: REQUEST SUCESSAUTOLOGIN RESPONSE PARAM UPDATE
                return {
                    type: 'AUTO_LOGIN_RESULT',
                    result: 'SUCCESS',
                    isAdmin: '',
                    homeAlias: '',
                    token: ''
                }
            case HoSoHelper.syntaxSpecifics.receivingCommandCodes["sucessfulManualLogin"]:
               return {
                    type: 'MANUAL_LOGIN_RESULT',
                    result: 'SUCCESS',
                    isAdmin: this.parseString(message).params[1],
                    homeAlias: this.parseString(message).params[2],
                    token: this.parseString(message).params[3]
                }
            case HoSoHelper.syntaxSpecifics.receivingCommandCodes["unsuccessfulLogin"]:
               return {
                    type: 'ERROR',
                    description: this.parseString(message).params[0],
                }
            default: 
            return {
                type: 'ERROR',
                description: 'invalid message format',
            }
      }
  }
}

export default HoSoHelper;
