import React, { Component, createContext } from "react";
import ConnectionService from "../services/ConnectionService";
import LSTokenService from "../services/LSTokenService";

export const UserContext = createContext();

class UserContextProvider extends Component {
  state = {
    username: "",
    isAdmin: "",
    homeAlias: "",
    token: "",
    gadgets: [],
    csInstance: new ConnectionService("ws://134.209.198.123:8084/homesome"),
    subscribers: {
      connectionOpenRV: null,
      gadgetFetchRV: null,
      gadgetStateUpdate: null,
    },
  };
  updateGadgets = (gadgets) => {
    this.setState({ gadgets: gadgets });
  };
  setUsername = (username) => {
    this.setState({ username: username });
  };
  setAdminFlag = (adminFlag) => {
    this.setState({ isAdmin: adminFlag });
  };
  setHomeAlias = (homeAlias) => {
    this.setState({ homeAlias: homeAlias });
  };
  setToken = (token) => {
    this.setState({ token: token });
  };
  updateGadget = (gadgetId, updatedValue) => {
     let found = this.state.gadgets.find( (gadget, index, arr) => {
        if(gadget.id === gadgetId){
         this.state.gadgets[index].state = updatedValue;
         return true;
        }
        return false;
      });
     return found;
  }
  setupEESubscribers = () => {
    console.log(this.state.csInstance.getWSReceiverEEmitterInstance);
    this.setState({
      subscribers: {
        gadgetStateUpdate: this.state.csInstance
          .getWSReceiverEEmitterInstance()
          .subscribe(
            ConnectionService.wsReceiverEEmitterEvent.onGadgetStateUpdateRV,
            (...args) => {
              console.log(args);
              //this.updateGadget(args[0].gadgetId, args[0].updatedValue);
            }
          ),
      },
    });
    this.setState({
      subscribers: {
         connectionOpenRV: this.state.csInstance
          .getWSReceiverEEmitterInstance()
          .subscribe(
            ConnectionService.wsReceiverEEmitterEvent.onConnectionOpenRV,
            (...args) => {
              console.log(args);
            }
          ),
      },
    });
    this.setState({
      subscribers: {
         connectionOpenRV: this.state.csInstance
          .getWSReceiverEEmitterInstance()
          .subscribe(
            ConnectionService.wsReceiverEEmitterEvent.onGadgetFecthRV,
            (...args) => {
              console.log('onGadgetFecthRV: ', args);
              this.updateGadgets(args[0].gadgets);
            }
          ),
      },
    });
  };

  setupContextState = (data) => {
      this.setUsername(data.username);
      this.setHomeAlias(data.homeAlias);
      this.setAdminFlag(data.isAdmin);
      this.setToken(data.token);
  }

   setupLSTS = (data) => {
      LSTokenService.setAdminFlag(!!data.isAdmin);
      LSTokenService.setHomeAlias(data.homeAlias);
      LSTokenService.setUsername(data.username);
      LSTokenService.setToken(data.token);
  }

  csConnect = () => {
    this.setupEESubscribers();
    return this.state.csInstance.connect();
  };
  login = (username, password) => {
    return new Promise((resolve, reject) => {
      this.state.csInstance
        .auth(ConnectionService.authTypes.manualLogin, username, password)
        .then((rData) => {
           console.log('rdata: ', rData);
          //you're auth with no errors!
          this.initLiveHooks();
          this.setupContextState(rData);
          this.setupLSTS(rData);

          resolve(rData);
        })
        .catch((rData) => {
          reject(rData);
        });
    });
  };
  initLiveHooks = () => {
   this.state.csInstance.initLiveHooks();
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          updateGadgets: this.updateGadgets,
          setUsername: this.setUsername,
          setAdminFlag: this.setAdminFlag,
          setHomeAlias: this.setHomeAlias,
          setToken: this.setToken,
          csConnect: this.csConnect,
          login: this.login,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;
