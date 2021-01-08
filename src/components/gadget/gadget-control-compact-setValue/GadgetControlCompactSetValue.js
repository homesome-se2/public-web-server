import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import stEEmitterRVHub from '../../../EEmitters/RVHubs/stEEmitterRVHub';
import './GadgetControlCompactSetValue.css';

class GadgetControlCompactSetValue extends Component {
  static contextType = UserContext;

  state = {
    percentage: this.props.state,
  };
  componentDidMount() {
    this.context.lifecycleHooks
      .getEEInstance()
      .subscribe(
        stEEmitterRVHub.events.onGadgetStateUpdated,
        this.didGadgetStateUpdate
      );
  }
  didGadgetStateUpdate = (state, ...args) => {
    if (args[0].props.gadgetID === this.props.gadgetID) {
      this.setState({ percentage: args[0].props.newState });
      this.props.onValueChange(args[0].props.newState);
    }
  };
  generateLocation = () => {
    if (this.state.percentage < 50) return 'upper';
    return 'lower';
  };
  handleChange = (e) => {
    this.setState({ percentage: e.target.value });
    this.props.onValueChange(e.target.value);
  };

  render() {
    return (
      <div className="gadget-control-compact-setValue">
        <div className="wrapper">
          <div className={`percentage ${this.generateLocation()}`}>
            {(Math.round(this.state.percentage * 10) / 10).toFixed(1)}
          </div>
          <div className="slider-wrapper">
            <input
              type="range"
              min="0"
              max="100"
              step="1.0"
              value={this.state.percentage}
              className="v-slider"
              onChange={(e) => {
                this.handleChange(e);
              }}
              onMouseUp={(e) => {
                this.props.onStateAltered(e);
              }}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default GadgetControlCompactSetValue;
