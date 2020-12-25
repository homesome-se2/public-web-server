import React, { Component } from 'react';
import './GadgetControlCompactSensor.css';

class GadgetControlCompactSensor extends Component {
  state = {};
  getFormattedState = (state, type) => {
    switch (type) {
      case 'temp':
        return (Math.round(state * 100) / 100).toFixed(2) + ' °C';
      case 'percent':
        return (Math.round(state * 100) / 100).toFixed(2) + '%';
      default:
        return (Math.round(state * 100) / 100).toFixed(2) + 'u';
    }
  };
  render() {
    const { state, vTemplate } = this.props;
    return (
      <div className="gadget-control-compact-sensor">
        <div className="value">{this.getFormattedState(state, vTemplate)}</div>
      </div>
    );
  }
}

export default GadgetControlCompactSensor;
