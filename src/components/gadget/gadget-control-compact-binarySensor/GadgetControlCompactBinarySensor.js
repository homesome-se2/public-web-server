import React, { Component } from 'react';
import './GadgeControlCompactBinarySensor.css';

class GadgeControlCompactBinarySensor extends Component {
  state = {};
  render() {
    return (
      <div className="gadget-control-compact-binarySensor">
        <div
          className={`led-indicator${this.props.state ? ' active' : ''}`}
        ></div>
        <div className="led-status">{this.props.state ? 'ON' : 'OFF'}</div>
      </div>
    );
  }
}

export default GadgeControlCompactBinarySensor;
