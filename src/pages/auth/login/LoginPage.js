import React, { Component } from 'react';
import ControlsProgressInset from '../../../components/controls/controls-progress-inset/ControlsProgressInset';
import FormLogin from '../../../components/form/form-login/FormLogin';
import { UserContext } from '../../../contexts/UserContext';
import ucEEmitterRVHub from '../../../EEmitters/RVHubs/ucEEmitterRVHub';
import Timer from '../../../helpers/Timer';
import './LoginPage.css';

class LoginPage extends Component {
  static contextType = UserContext;
  eTimer = new Timer(0, 0);

  state = {
    currentCardAnimation: 'card-enter',
    currentLogoAnimation: 'logo-reveal',
    loaderActive: false,
    invalid: false,
  };
  auth = (username, password) => {
    console.log('submit', username, password);
    this.setState({ currentCardAnimation: 'card-lock' });
    this.setState({ currentLogoAnimation: 'logo-lock' });
    this.setState({ invalid: false });
    this.wait(800).then(() => {
      this.setState({ loaderActive: true });
    });

    this.context.auth(
      { username: username, password: password },
      { type: 'AUTH_MANUAL_LOGIN' }
    );
    this.eTimer.start();
    this.setupEESubscribers();
  };
  setupEESubscribers = () => {
    this.context.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onUnSuccessfulLoginRVEEService,
        (...args) => {
          const elapsed = this.eTimer.end();
          if (elapsed < 4000)
            this.wait(4000 - elapsed).then(() => {
              this.setState({ currentCardAnimation: 'card-back' });
              this.setState({ currentLogoAnimation: 'logo-back' });
              this.setState({ loaderActive: false });
              this.setState({ invalid: true });
            });
        }
      );
    this.context.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onSuccessfulManualLoginRVEEService,
        (...args) => {
          const elapsed = this.eTimer.end();
          if (elapsed < 4000)
            this.wait(4000 - elapsed).then(() => {
              this.navigate('dashboard', {});
            });
        }
      );
  };

  wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  navigate = (target, param) => {
    this.props.history.push({
      pathname: `/${target}`,
      state: param,
    });
  };
  render() {
    return (
      <div className="login-page">
        <div className="header">
          <div className={`logo-wrapper ${this.state.currentLogoAnimation}`}>
            <ControlsProgressInset
              type="indeterminate"
              scale="0.3"
              active={this.state.loaderActive}
            />
          </div>
        </div>
        <div className="fw-wrapper container">
          <div className="card-wrapper">
            <FormLogin
              className={`${this.state.currentCardAnimation}`}
              onAuth={this.auth}
              invalid={this.state.invalid}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
