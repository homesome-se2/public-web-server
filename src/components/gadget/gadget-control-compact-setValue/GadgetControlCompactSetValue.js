import React, { Component } from 'react';
import './GadgetControlCompactSetValue.css';

class GadgetControlCompactSetValue extends Component {
  state = {
    percentage: this.props.state,
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
    const { state } = this.props;
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
              className="v-slider"
              onChange={(e) => {
                this.handleChange(e);
              }}
              onBlur={(e) => {
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
