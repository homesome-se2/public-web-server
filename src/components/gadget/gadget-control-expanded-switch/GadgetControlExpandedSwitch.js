import React, { Component } from 'react';
import './GadgetControlExpandedSwitch.css';

class GadgetControlExpandedSwitch extends Component {
  state = {};
  render() {
    return (
      <div className="gadget-control-expanded-switch">
        <div className="wrapper">
          <div className="switch">
            <div className="inner">
              <h2>OFF</h2>
            </div>
            <div className="outer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default GadgetControlExpandedSwitch;
