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
}
 
export default HoSoHelper;