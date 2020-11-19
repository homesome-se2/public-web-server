import React, { Component } from 'react';
import ControlsProgressInset from '../../../components/controls/controls-progress-inset/ControlsProgressInset';
import './Reconnect.css';

import { Grid } from '@material-ui/core';

class Reconnect extends Component {
  state = {
    progress: 0,
  };
  componentDidMount() {
    this.update();
  }
  update = () => {
    setInterval(() => {
      this.setState({ progress: this.state.progress + 1 });
    }, 100);
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
