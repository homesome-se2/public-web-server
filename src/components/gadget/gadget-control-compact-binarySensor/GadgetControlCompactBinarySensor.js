import React, { Component } from 'react';
import './GadgeControlCompactBinarySensor.css';

class GadgeControlCompactBinarySensor extends Component {
  state = {};
  getStateText = (state) => {
    switch (this.props.vTemplate) {
      case 'detectorBurglar':
        return state ? 'Triggered' : 'Idle';
      case 'door':
        return state ? 'Open' : 'Closed';
      case 'person':
        return state ? 'Home' : 'Away';
      default:
        return state ? 'On' : 'Off';
    }
  };
  render() {
    return (
      <div className="gadget-control-compact-binarySensor">
        <div
          className={`led-indicator${this.props.state ? ' active' : ''}`}
        ></div>
        <div className={`led-status ${this.props.state ? 'active' : ''}`}>
          {this.getStateText(this.props.state)}
        </div>
      </div>
    );
  }
}

export default GadgeControlCompactBinarySensor;
