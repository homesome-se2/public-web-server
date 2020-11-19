import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import stEEmitterRVHub from '../EEmitters/RVHubs/stEEmitterRVHub';
import LSTokenService from '../services/LSTokenService';

class ProtectedRoutes extends Component {
  static contextType = UserContext;

  state = {};

  componentDidMount() {
    this.context.lifecycleHooks
      .getEEInstance()
      .subscribe(stEEmitterRVHub.events.onStateMounted, this.stateDidMount);
  }

  stateDidMount = () => {};

  isAuthorized = () => {
    if (this.context != null && this.context.isAuth) return 1;
    if (LSTokenService.isEligibleForAutoAuth()) return 0;
    return -1;
  };

  render() {
    const Component = this.props.component;
    const isAuthenticated = this.isAuthorized();

    if (isAuthenticated === 1) return <Component />;
    if (isAuthenticated === 0)
      return <Redirect to={{ pathname: '/reconnect' }} />;

    return <Redirect to={{ pathname: '/login' }} />;
  }
}

export default ProtectedRoutes;
