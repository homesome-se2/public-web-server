class HoSoHelper {
    static syntaxSpecifics = {
        separator: "::",
        sendingCommandCodes: {
            manualLogin: "101",
            autoReconnect: "103",
            logOut: "105"
        },
        receivingCommandCodes: {
            "101": "102",
            "103": "104",
        
        }
    }

    static buildLoginString = (username, password) => {
        return this.syntaxSpecifics.sendingCommandCodes.manualLogin + this.syntaxSpecifics.separator +
        username + this.syntaxSpecifics.separator +
        password;
    }

    static buildLogoutString = () => {
        return this.syntaxSpecifics.sendingCommandCodes.logOut;
    }

    static buildAutoLoginString = (username, token) => {
        return this.syntaxSpecifics.sendingCommandCodes.autoReconnect + this.syntaxSpecifics.separator +
        username + this.syntaxSpecifics.separator +
        token;
    }
    

}
 
export default HoSoHelper;