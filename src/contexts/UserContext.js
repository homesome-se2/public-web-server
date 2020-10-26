import React, {Component, createContext} from 'react';
import ConnectionService from '../services/ConnectionService';

export const UserContext = createContext();

class UserContextProvider extends Component {
    state = { 
        username: '',
        isAdmin: '',
        homeAlias: '',
        token: '',
        csInstance: new ConnectionService('ws://134.209.198.123:8084/homesome')
     }
    render() { 
        return ( 
            <UserContext.Provider value={ {...this.state} }>
                {this.props.children}
            </UserContext.Provider>
         );
    }
}
 
export default UserContextProvider;
