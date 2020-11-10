import React, { Component } from 'react';
import './GadgetControlCompactSensor.css';

class GadgetControlCompactSensor extends Component {
  state = {};
  render() {
    return (
      <div className="gadget-control-compact-sensor">
        <div className="value">{this.props.state + 'C'}</div>
      </div>
    );
  }
}

export default GadgetControlCompactSensor;
