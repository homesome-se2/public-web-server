import React, {Component, createContext} from 'react';
import ConnectionService from '../services/ConnectionService';

export const UserContext = createContext();

class UserContextProvider extends Component {
    state = { 
        username: '',
        isAdmin: '',
        homeAlias: '',
        token: '',
        gadgets: [],
        csInstance: new ConnectionService('ws://134.209.198.123:8084/homesome')
     }
     updateGadgets = (gadgets) => {
        this.setState({gadgets: gadgets})
     }
     setUsername = (username) => {
        this.setState({username: username})
     }
     setAdminFlag = (adminFlag) => {
        this.setState({isAdmin: adminFlag})
     }
     setHomeAlias = (homeAlias) => {
        this.setState({homeAlias: homeAlias})
     }
     setToken = (token) => {
        this.setState({token: token})
     }
   
    render() { 
        return ( 
            <UserContext.Provider value={ {...this.state, updateGadgets: this.updateGadgets, setUsername: this.setUsername, 
            setAdminFlag: this.setAdminFlag, setHomeAlias: this.setHomeAlias, setToken: this.setToken} }>
                {this.props.children}
            </UserContext.Provider>
         );
    }
}
 
export default UserContextProvider;
