import React, { Component } from 'react';
import './GadgetControlCompactSwitch.css';

class GadgetControlCompactSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="gadget-control-compact-switch">
        <div className="wrapper">
          <label className="switch">
            <input
              type="checkbox"
              checked={this.props.checkedState}
              onClick={() => {}}
              onChange={(e) => {
                this.props.onStateAltered(e);
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  }
}

export default GadgetControlCompactSwitch;
