import React, { Component } from 'react';
import './TestProgress.css';
import { Grid } from '@material-ui/core';
import ControlsProgressInset from '../../../components/controls/controls-progress-inset/ControlsProgressInset';

class TestProgress extends Component {
  state = {
    progress: 0,
  };
  componentDidMount() {
    this.simulateProgress();
  }
  getProgress = () => {
    return this.state.progress < 100 ? this.state.progress + 3 : 0;
  };
  simulateProgress = () => {
    setInterval(() => {
      this.setState({ progress: this.getProgress() });
    }, 100);
  };
  render() {
    return (
      <div className="test-progress">
        <div className="container">
          <h1 className="title">Test: progress comparison</h1>
          <h2 className="subtitle">controls-progress-inset comparison</h2>
          <Grid container direction="row" justify="center" alignItems="center">
            <div className="wrapper">
              <ControlsProgressInset type="indeterminate" scale="0.3" />
              <div className="header">indeterminate</div>
            </div>
            <div className="wrapper">
              <ControlsProgressInset
                type="determinate"
                scale="0.3"
                progress={this.state.progress}
              />
              <div className="header">determinate</div>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

export default TestProgress;
