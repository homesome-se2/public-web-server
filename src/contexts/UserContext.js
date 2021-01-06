import React, { Component, createContext } from 'react';
import ucEEmitterRVHub from '../EEmitters/RVHubs/ucEEmitterRVHub';
import HoSoProtocolStackImpl from '../HoSoProtocolStack/HoSoProtocolStackImpl';
import AuthRequest from '../models/AuthRequest';
import AlterGadgetStateRequest from '../models/AlterGadgetStateRequest';
import ConnectionService from '../services/ConnectionService';
import UContextAdapter from './UContextAdapter';
import LSTokenService from '../services/LSTokenService';
import AuthCryptoGuard from '../helpers/AuthCryptoGuard';
import stEEmitterRVHub from '../EEmitters/RVHubs/stEEmitterRVHub';
import LogoutRequest from '../models/LogoutRequest';
import AlterGadgetAliasRequest from '../models/AlterGadgetAliasRequest';

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
    gadgetsGroups: [],
    selectedGadgetGroup: null,
    selectedGadget: null,
    lifecycleHooks: new stEEmitterRVHub(),
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

    /////////////////////////////// lifecycleHooks: emitOnStateMounted
    this.state.lifecycleHooks.emitOnStateMounted(this.state);
    /////////////////////////////// lifecycleHooks: emitOnStateMounted
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
            /////////////////////////////// lifecycleHooks: emitOnUserAuthStarted
            this.state.lifecycleHooks.emitOnUserAuthStarted(action.type, {
              ...state,
            });
            /////////////////////////////// lifecycleHooks: emitOnUserAuthStarted
            break;
          case 'AUTH_AUTO_LOGIN':
          default:
            this.singletonInstances.s_PLDStack.send(
              new AuthRequest('AUTH_AUTO_LOGIN', { ...state })
            );
            /////////////////////////////// lifecycleHooks: emitOnUserAuthStarted
            this.state.lifecycleHooks.emitOnUserAuthStarted(action.type, {
              ...state,
            });
          /////////////////////////////// lifecycleHooks: emitOnUserAuthStarted
        }
        this.ucHooks();
      })
      .catch((err) => {});
  };
  /////////////////////////////////////
  /////////////  log-out  /////////////
  ////////////////////////////////////
  logout = (state, action) => {
    switch (action.type) {
      case 'ALL':
        this.singletonInstances.s_PLDStack.send(
          new LogoutRequest('ALL', state)
        );
        break;
      default:
        this.singletonInstances.s_PLDStack.send(
          new LogoutRequest('THIS', state)
        );
    }
    this.setState(UContextAdapter.clearState());
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
  //////// alter-GADGET-A ////////////
  ///////////////////////////////////
  updateAlias = (state) => {
    this.singletonInstances.s_PLDStack.send(
      new AlterGadgetAliasRequest(state.gadgetId, state.newAlias)
    );
  };

  /////////////////////////////////////
  //////// selected-gadget ///////////
  ///////////////////////////////////
  selectGadget = (state) => {
    this.setState({ selectedGadget: state });
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
          this.setState(
            UContextAdapter.updateUCUserData(this.state, ...args),
            () => {
              /////////////////////////////// lifecycleHooks: emitOnUserAuthComplete
              this.state.lifecycleHooks.emitOnUserAuthComplete(
                this.state,
                ...args
              );
              /////////////////////////////// lifecycleHooks: emitOnUserAuthComplete
            }
          );
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
            }),
            () => {
              /////////////////////////////// lifecycleHooks: emitOnUserAuthComplete
              this.state.lifecycleHooks.emitOnUserAuthComplete(
                this.state,
                ...args
              );
              /////////////////////////////// lifecycleHooks: emitOnUserAuthComplete
            }
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
          this.setState(
            UContextAdapter.updateUCUserData(this.state, ...args),
            () => {
              /////////////////////////////// lifecycleHooks: emitOnUserAuthComplete
              this.state.lifecycleHooks.emitOnUserAuthComplete(
                this.state,
                ...args
              );
              /////////////////////////////// lifecycleHooks: emitOnUserAuthComplete
            }
          );
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onSuccessfulLogoutRVEEService,
        (...args) => {
          console.log('successful logout (ucHook): ', ...args);
          LSTokenService.clearStorage();
          this.singletonInstances.s_CService.disconnect();
          this.setState(UContextAdapter.clearContext(), () => {
            /////////////////////////////// lifecycleHooks: emitLogout
            this.state.lifecycleHooks.emitLogout(this.state, ...args);
            /////////////////////////////// lifecycleHooks: emitLogout
          });
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
            UContextAdapter.updateUCGadgetGroupData(this.state, ...args),
            () => {
              /////////////////////////////// lifecycleHooks: onStateReady
              this.state.lifecycleHooks.emitOnStateReady(this.state, ...args);
              /////////////////////////////// lifecycleHooks: onStateReady
            }
          );
          console.log('!curre!!!nt state: ', this.state);
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
            UContextAdapter.updateUCGadgetState(this.state, ...args),
            () => {
              /////////////////////////////// lifecycleHooks: emitGadgetStateChange
              this.state.lifecycleHooks.emitGadgetStateChange(
                this.state,
                ...args
              );
              /////////////////////////////// lifecycleHooks: emitGadgetStateChange
            }
          );
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onGadgetAliasChangeRVEEService,
        (...args) => {
          console.log('gadget alias change (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(
            UContextAdapter.updateUCGadgetAlias(this.state, ...args)
          );
          console.log('!current state: ', this.state);
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(ucEEmitterRVHub.events.onGadgetAddedRVEEService, (...args) => {
        console.log('new gadget added (ucHook): ', ...args);
        console.log('!old state: ', this.state);
        this.setState(UContextAdapter.addGadget(this.state, ...args));
        console.log('!current state: ', this.state);
      });
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onHubDisconnectedRVEEService,
        (...args) => {
          console.log('hub disconnected (ucHook): ', ...args);
          this.logout({ state: {}, type: 'THIS' });
        }
      );
    this.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onGadgetRemovedRVEEService,
        (...args) => {
          console.log('gadget removed (ucHook): ', ...args);
          console.log('!old state: ', this.state);
          this.setState(UContextAdapter.removeGadget(this.state, ...args));
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
    LSTokenService.setAdminFlag(data.props.C_isAdmin === 'true' ? true : false);
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
  /////////////////////////////////////
  /////////  g-GroupSelection ////////
  ///////////////////////////////////
  updateGadgetGroupSelection = (groupName) => {
    for (let group of this.state.gadgetsGroups) {
      if (group.name === groupName) {
        this.setState({ selectedGadgetGroup: group });
        return true;
      }
    }
    return false;
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          connect: this.csConnect,
          auth: this.auth,
          logout: this.logout,
          update: this.update,
          updateAlias: this.updateAlias,
          selectGadget: this.selectGadget,
          singletonInstances: this.singletonInstances,
          updateGadgetGroupSelection: this.updateGadgetGroupSelection,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
