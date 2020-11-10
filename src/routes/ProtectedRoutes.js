import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthCryptoGuard from '../helpers/AuthCryptoGuard';
import LSTokenService from '../services/LSTokenService';

class ProtectedRoutes extends Component {
  state = {};
  render() {
    const Component = this.props.component;
    const isAuthenticated =
      LSTokenService.isAuth() &&
      AuthCryptoGuard.verify(
        AuthCryptoGuard.getBase64Encoding(
          AuthCryptoGuard.generateHash(
            LSTokenService.getToken(),
            LSTokenService.getUsername()
          )
        ),
        LSTokenService.getHash()
      );

    //TODO: TOKEN VERIFICATION

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  }
}

export default ProtectedRoutes;
