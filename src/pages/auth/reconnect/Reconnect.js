import React, { Component } from 'react';
import ControlsProgressInset from '../../../components/controls/controls-progress-inset/ControlsProgressInset';
import './Reconnect.css';

import { Grid } from '@material-ui/core';
import stEEmitterRVHub from '../../../EEmitters/RVHubs/stEEmitterRVHub';
import { UserContext } from '../../../contexts/UserContext';
import LSTokenService from '../../../services/LSTokenService';
import Timer from '../../../helpers/Timer';

class Reconnect extends Component {
  static contextType = UserContext;
  eTimer = new Timer(0, 0);

  state = {
    progress: 0,
  };

  componentDidMount() {
    if (!LSTokenService.isEligibleForAutoAuth()) this.navigate('login', {});

    if (this.context != null) this.autoAuth();
    this.context.lifecycleHooks
      .getEEInstance()
      .subscribe(stEEmitterRVHub.events.onStateMounted, this.stateDidMount);

    this.context.lifecycleHooks
      .getEEInstance()
      .subscribe(stEEmitterRVHub.events.onUserAuthComplete, (args) => {
        this.authDataReady(args);
      });

    this.eTimer.start();
  }

  authDataReady = (data) => {
    const elapsed = this.eTimer.end();
    if (data.isAuth) {
      if (elapsed < 4000)
        this.wait(4000 - elapsed).then(() => {
          this.navigate('dashboard', {});
        });
      else this.navigate('dashboard', {});
    } else {
      LSTokenService.clearStorage();
      this.navigate('login', {});
    }
  };

  autoAuth = () => {
    this.context.auth(
      {
        username: LSTokenService.getUsername(),
        token: LSTokenService.getToken(),
      },
      { type: 'AUTH_AUTO_LOGIN' }
    );
  };

  stateDidMount = () => {
    this.autoAuth();
  };
  update = () => {
    setInterval(() => {
      this.setState({ progress: this.state.progress + 1 });
    }, 100);
  };
  navigate = (target, param) => {
    this.props.history.push({
      pathname: `/${target}`,
      state: param,
    });
  };
  wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  render() {
    return (
      <div className="reconnect-page">
        <Grid container direction="column" justify="center" alignItems="center">
          <div className="wrapper">
            <ControlsProgressInset type="indeterminate" scale="0.3" />
            <div className="status"></div>
          </div>
        </Grid>
      </div>
    );
  }
}

export default Reconnect;
