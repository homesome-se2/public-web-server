import React, { Component, createContext } from 'react';
import ucEEmitterRVHub from '../EEmitters/RVHubs/ucEEmitterRVHub';
import HoSoProtocolStackImpl from '../HoSoProtocolStack/HoSoProtocolStackImpl';
import AuthRequest from '../models/AuthRequest';
import AlterGadgetStateRequest from '../models/AlterGadgetStateRequest';
import ConnectionService from '../services/ConnectionService';
import UContextAdapter from './UContextAdapter';
import LSTokenService from '../services/LSTokenService';
import AuthCryptoGuard from '../helpers/AuthCryptoGuard';

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
    isAuth: '',
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

    /////////////////////////////// PLDStack: init
    this.singletonInstances.s_PLDStack = new HoSoProtocolStackImpl(
      this.singletonInstances.s_CService,
      this.singletonInstances.s_CService
        .getCSEEmitterRVHubInstance()
        .getEEInstance()
    );
    /////////////////////////////// PLDStack: init
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
  /////////////////////////////////////
  /////////////  auth  ///////////////
  ///////////////////////////////////
  //-> {username: '', password: ''}, {type: 'AUTH_MANUAL_LOGIN'}
  auth = (state, action) => {
    this.csConnect()
      .then((rData) => {
        switch (action.type) {
          case 'AUTH_MANUAL_LOGIN':
            this.singletonInstances.s_PLDStack.send(
              new AuthRequest(action.type, { ...state })
            );
            break;
          case 'AUTH_AUTO_LOGIN':
          default:
            this.singletonInstances.s_PLDStack.send(
              new AuthRequest('AUTH_AUTO_LOGIN', { ...state })
            );
        }
        this.ucHooks();
      })
      .catch((err) => {});
  };
  /////////////////////////////////////
  //////// alter-GADGET-S ////////////
  ///////////////////////////////////
  update = (state) => {
    this.singletonInstances.s_PLDStack.send(
      new AlterGadgetStateRequest(state.gadgetId, state.newState)
    );
  };

  /////////////////////////////////////
  ////////  ucReceiverEEHub  /////////
  ///////////////////////////////////
  ucHooks = () => {
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onSuccessfulManualLoginRVEEService,
        (...args) => {
          console.log('sucessful manual login (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(UContextAdapter.updateUCUserData(this.state, ...args));
          this.setupLSTS(...args);
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onSuccessfulAutoLoginRVEEService,
        (...args) => {
          console.log('sucessful auto login (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(
            UContextAdapter.updateUCUserData(this.state, {
              props: {
                C_SessionKey: LSTokenService.getToken(),
                C_isAdmin: LSTokenService.getAdminFlag(),
                C_nameID: LSTokenService.getUsername(),
                H_Alias: LSTokenService.getHomeAlias(),
                isAuth: true,
              },
            })
          );
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onUnSuccessfulLoginRVEEService,
        (...args) => {
          console.log('unsucessful login (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(UContextAdapter.updateUCUserData(this.state, ...args));
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onGadgetFetchCompleteRVEEService,
        (...args) => {
          console.log('gadget fetch (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(
            UContextAdapter.updateUCGadgetData(this.state, ...args)
          );
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onGadgetGroupFetchCompleteRVEEService,
        (...args) => {
          console.log('gadget groups (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(
            UContextAdapter.updateUCGadgetGroupData(this.state, ...args)
          );
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onGadgetStateChangeRVEEService,
        (...args) => {
          console.log('gadget state change (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(
            UContextAdapter.updateUCGadgetState(this.state, ...args)
          );
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onServerExceptionRVEEService,
        (...args) => {
          console.log('server exception (ucHook): ', ...args);
        }
      );
  };
  /////////////////////////////////////
  /////////////  l-METHODS ///////////
  ///////////////////////////////////
  setupLSTS = (data) => {
    LSTokenService.setAdminFlag(!!data.props.C_isAdmin);
    LSTokenService.setHomeAlias(data.props.H_Alias);
    LSTokenService.setUsername(data.props.C_nameID);
    LSTokenService.setToken(data.props.C_SessionKey);
    LSTokenService.setHash(
      AuthCryptoGuard.getBase64Encoding(
        AuthCryptoGuard.generateHash(
          data.props.C_SessionKey,
          data.props.C_nameID
        )
      )
    );
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          connect: this.csConnect,
          auth: this.auth,
          update: this.update,
          singletonInstances: this.singletonInstances,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
