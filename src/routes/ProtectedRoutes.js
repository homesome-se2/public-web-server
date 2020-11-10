import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LSTokenService from '../services/LSTokenService';

class ProtectedRoutes extends Component {
  state = {};
  render() {
    const Component = this.props.component;
    const isAuthenticated =
      LSTokenService.isAuth() && LSTokenService.isEligibleForAutoAuth();

    //TODO: TOKEN VERIFICATION

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  }
}

export default ProtectedRoutes;
