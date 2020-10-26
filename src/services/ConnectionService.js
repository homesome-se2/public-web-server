import HoSoHelper from "../components/helpers/HoSoHelper";

class ConnectionService{
    socket = {} ;

    constructor(url){
        this.socket = new WebSocket(url);
        console.log('Connection service init (websocket)');
    }

    login = (username, password) => {
        return new Promise((resolve, reject) => {
            this.socket.onopen = e => {
                console.log("websocket connection opened");
                this.socket.send(HoSoHelper.buildLoginString(username, password));
    
                this.receiver().then((rData) => {
                    resolve(rData);
                }).catch((rData) => {
                    reject(rData);
                });
            }
        })
    }

    auth = () => {

    }

    receiver = () => {
        return new Promise((resolve, reject) => {
            this.socket.onmessage = e => {
               // console.log(`received data: ${e.data}`);;
                switch(HoSoHelper.parseHoSoMessage(e.data).type){
                    case 'AUTO_LOGIN_RESULT':
                       //TODO: REMOVE AFTER REQUEST SUCESSAUTOLOGIN RESPONSE PARAM UPDATE
                       //polyfill empty values at request-level
                    resolve({
                        username: HoSoHelper.parseHoSoMessage(e.data).username,
                        isAdmin: HoSoHelper.parseHoSoMessage(e.data).isAdmin,
                        homeAlias: HoSoHelper.parseHoSoMessage(e.data).homeAlias,
                        token: HoSoHelper.parseHoSoMessage(e.data).token
                    });
                    break;
                    case 'MANUAL_LOGIN_RESULT':
                        resolve({
                            username: HoSoHelper.parseHoSoMessage(e.data).username,
                            isAdmin: HoSoHelper.parseHoSoMessage(e.data).isAdmin,
                            homeAlias: HoSoHelper.parseHoSoMessage(e.data).homeAlias,
                            token: HoSoHelper.parseHoSoMessage(e.data).token
                        });
                    break;
                    case 'ERROR':
                      reject({
                        errorCode: HoSoHelper.parseHoSoMessage(e.data).errorCode,
                        description: HoSoHelper.parseHoSoMessage(e.data).description
                      });
                    break;
    
                    default:
    
                }
                resolve(HoSoHelper.parseHoSoMessage(e.data).type);
            }
        })
    }

}
export default ConnectionService;