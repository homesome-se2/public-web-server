import HoSoHelper from "../helpers/HoSoHelper";

class ConnectionService{
    wsConnectionStates = {
        connecting: 0,
        open: 1, 
        closing: 2, 
        closed: 3,
        disconnecting: 4 //custom
    }


    constructor(wsUrl){
        this.wsState = this.wsConnectionStates.closed;
        this.wsUrl = wsUrl;
        this.ws = null;
    }

    connect = () => {
        if(this.wsState === this.wsConnectionStates.open){
            this.disconnect();
        } else if(this.wsState !== this.wsConnectionStates.closed){
            console.log('ws socket already open');
            return -1;
        }

        this.wsState = this.wsConnectionStates.connecting;
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = "arraybuffer";

       


    }

    disconnect = () => {
        if(this.ws !== null && this.wsState === this.wsConnectionStates.open){
            return this.connectionTeardown();
        }else {
            console.log("Connection not open or ws instance null");
            return -1;
        }
    }
    connectionTeardown = () => {
        this.wsState = this.wsConnectionStates.disconnecting;
        this.ws.close(1000, "Client request disconnection");
        return 1;
    }

   
}
export default ConnectionService;