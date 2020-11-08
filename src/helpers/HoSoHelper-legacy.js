import Gadget from "../models/Gadget";

class HoSoHelper {
  static syntaxSpecifics = {
    separator: "::",
    sendingCommandCodes: {
      manualLogin: "101",
      autoReconnect: "103",
      logOut: "105",
    },
    receivingCommandCodes: {
      successfulManualLogin: "102",
      successfulAutoLogin: "104",
      gadgetFetching: "304",
      gadgetStateUpdate: "316",
      serverException: "901",
      unsuccessfulLogin: "903"
      
    },
    invalidLocalCodes: {
      invalid: '_INVALID_'
    }
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
  static buildAutoLoginString = (username, token) => {
    return (
      this.syntaxSpecifics.sendingCommandCodes.autoReconnect +
      this.syntaxSpecifics.separator +
      username +
      this.syntaxSpecifics.separator +
      token
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
  static parseString = (string) => {
    let params = string.split("::");
    return {
      commandCode: params[0],
      params: [...params.slice(1)],
    };
  };
  static parseHoSoMessage = (message) => {
    switch (this.parseString(message).commandCode) {
      case HoSoHelper.syntaxSpecifics.receivingCommandCodes[
        "successfulAutoLogin"
      ]:
        //TODO: REQUEST SUCESSAUTOLOGIN RESPONSE PARAM UPDATE
        //polyfill empty values
        return {
          type: "AUTO_LOGIN_RESULT",
          result: "SUCCESS",
          username: "",
          isAdmin: "",
          homeAlias: "",
          token: "",
        };
      case HoSoHelper.syntaxSpecifics.receivingCommandCodes[
        "successfulManualLogin"
      ]:
        return {
          type: "MANUAL_LOGIN_RESULT",
          result: "SUCCESS",
          username: this.parseString(message).params[0],
          isAdmin: this.parseString(message).params[1],
          homeAlias: this.parseString(message).params[2],
          token: this.parseString(message).params[3],
        };
      case HoSoHelper.syntaxSpecifics.receivingCommandCodes[
        "unsuccessfulLogin"
      ]:
        return {
          type: "LOGIN_ERROR",
          errorCode: this.parseString(message).commandCode,
          description: this.parseString(message).params[0],
        };
      case HoSoHelper.syntaxSpecifics.receivingCommandCodes["gadgetFetching"]:
        return {
          type: "GADGET_LIST",
          gadgets: this.buildGadgetObjectArray(
            this.parseString(message).params
          ),
        };
      case HoSoHelper.syntaxSpecifics.receivingCommandCodes[
        "gadgetStateUpdate"
      ]:
        return {
          type: "GADGET_STATE_UPDATE",
          gadgetId: this.parseString(message).params[0],
          updatedValue: this.parseString(message).params[1],
        };
        case HoSoHelper.syntaxSpecifics.receivingCommandCodes["serverException"]:
        return {
          type: "SERVER_EXCEPTION",
          errorCode: this.parseString(message).commandCode,
          description: this.parseString(message).params[0],
        };
      default:
        return {
          type: "ERROR",
          errorCode: this.parseString(message).commandCode,
          description: "invalid or unhandled response message format",
        };
    }
  };
}

export default HoSoHelper;
