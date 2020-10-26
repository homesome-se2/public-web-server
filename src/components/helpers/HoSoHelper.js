class HoSoHelper {
    static syntaxSpecifics = {
        separator: "::",
        sendingCommandCodes: {
            manualLogin: "101",
            autoReconnect: "103",
            logOut: "105"
        },
        receivingCommandCodes: {
            sucessfulManualLogin: "102",
            successfulAutoLogin: "104",
        
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
    
    static parseString(string){
        let params = string.split("::");
        return {
            commandCode: params[0],
            params: [...params.slice(1)]
        };
    }
}
 
export default HoSoHelper;