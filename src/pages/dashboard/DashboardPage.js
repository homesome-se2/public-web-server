import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './DashboardPage.css';
import { Grid } from '@material-ui/core';
import PaneActiveArea from '../../components/pane/pane-active-area/PaneActiveArea';
import PaneDetail from '../../components/pane/pane-detail/PaneDetail';
import ucEEmitterRVHub from '../../EEmitters/RVHubs/ucEEmitterRVHub';
import PaneGadgetGroupSelection from '../../components/pane/pane-gadget-group-selection/PaneGadgetGroupSelection';
import PaneTopbar from '../../components/pane/pane-topbar/PaneTopbar';
import stEEmitterRVHub from '../../EEmitters/RVHubs/stEEmitterRVHub';
import { withRouter } from 'react-router-dom';

class DashboardPage extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.context.lifecycleHooks
      .getEEInstance()
      .subscribe(stEEmitterRVHub.events.onLougoutState, this.didStateLogout);
  }
  didStateLogout = () => {
    this.navigate('login', {});
  };

  setupEESubscribers = () => {
    this.context.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onUnSuccessfulLoginRVEEService,
        (...args) => {
          this.setState({ invalid: true });
        }
      );
    this.context.singletonInstances.s_PLDStack
      .getucEEmitterRVHub()
      .getEEInstance()
      .subscribe(
        ucEEmitterRVHub.events.onSuccessfulManualLoginRVEEService,
        (...args) => {
          this.navigate('dashboard', {});
        }
      );
  };
  navigate = (target, param) => {
    this.props.history.push({
      pathname: `/${target}`,
      state: param,
    });
  };
  render() {
    return (
      <div className="dashboard-page">
        <PaneTopbar />
        <div className="pane-wrapper">
          <div className="group-sel-wrapper">
            <PaneGadgetGroupSelection />
          </div>
          <div className="active-area-wrapper">
            <PaneActiveArea />
          </div>
          <div className="pane-detail-wrapper">
            <PaneDetail />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DashboardPage);
