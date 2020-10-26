class ConnectionService{
    socket = {} ;

    constructor(url){
        this.socket = new WebSocket(url);
        console.log('Connection service init (websocket)')
    }

    login = (username, password) => {
        
        this.socket.addEventListener('open', function (event) {
            
        });
    }

}
export default ConnectionService;