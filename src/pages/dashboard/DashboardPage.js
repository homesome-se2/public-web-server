import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './DashboardPage.css';
import PaneRoomSelection from '../../components/pane/pane-room-selection/PaneRoomSelection';
import { Grid } from '@material-ui/core';
import PaneActiveArea from '../../components/pane/pane-active-area/PaneActiveArea';
import PaneDetail from '../../components/pane/pane-detail/PaneDetail';
import ucEEmitterRVHub from '../../EEmitters/RVHubs/ucEEmitterRVHub';
import LSTokenService from '../../services/LSTokenService';
import PaneGadgetGroupSelection from '../../components/pane/pane-gadget-group-selection/PaneGadgetGroupSelection';

class DashboardPage extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

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

  render() {
    return (
      <div className="dashboard-page">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={2} className="pane-grid-item">
            <PaneGadgetGroupSelection />
          </Grid>
          <Grid item xs={8}>
            <PaneActiveArea />
          </Grid>
          <Grid item xs={2}>
            <PaneDetail />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DashboardPage;
