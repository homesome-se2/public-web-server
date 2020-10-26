class HoSoHelper {
    static syntaxSpecifics = {
        separator: "::",
        commandCodes: {
            manualLogin: "101",
            autoReconnect: "103",
            logOut: "105"
        }
    }


    static buildLoginString = (username, password) => {
        return this.syntaxSpecifics.commandCodes.manualLogin + this.syntaxSpecifics.separator +
        username + this.syntaxSpecifics.separator +
        password;
    }

    static buildLogoutString = () => {
        return this.syntaxSpecifics.commandCodes.logOut;
    }
}
 
export default HoSoHelper;