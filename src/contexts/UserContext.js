import React, { Component, createContext } from 'react';
import ConnectionService from '../services/ConnectionService';

export const UserContext = createContext();

class UserContextProvider extends Component {
  /////////////////////////////////////
  /////////////  s-CxSTATE ///////////
  ///////////////////////////////////
  state = {
    username: '',
    isAdmin: '',
    homeAlias: '',
    token: '',
    gadgets: [],
  };
  /////////////////////////////////////
  /////////////  i-SINGLETON /////////
  ///////////////////////////////////
  singletonInstances = {
    s_CService: null,
    s_PLDStack: null,
  };
  /////////////////////////////////////
  /////////  react-LIFECYCLE /////////
  ///////////////////////////////////
  componentDidMount() {
    console.log('UserContextProvider mounted.');

    /////////////////////////////// csService: init
    this.singletonInstances.s_CService = new ConnectionService(
      'ws://134.209.198.123:8084/homesome'
    );
    /////////////////////////////// csService: init
  }
  /////////////////////////////////////
  /////////////  p-METHODS ///////////
  ///////////////////////////////////
  csConnect = () => {
    return new Promise((resolve, reject) => {
      this.singletonInstances.s_CService
        .connect()
        .then((rData) => {
          resolve(rData);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          csConnect: this.csConnect,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
