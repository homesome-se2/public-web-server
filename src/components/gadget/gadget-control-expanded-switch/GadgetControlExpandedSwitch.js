import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './GadgetControlExpandedSwitch.css';

class GadgetControlExpandedSwitch extends Component {
  static contextType = UserContext;

  state = {};

  isActive = () => {
    return this.context.selectedGadget != null
      ? this.context.selectedGadget.state === '1.0'
      : false;
  };
  getNewState = () => {
    return this.isActive() ? '0.0' : '1.0';
  };
  alterState = () => {
    this.context.update({
      gadgetId: this.context.selectedGadget.id,
      newState: this.getNewState(),
    });
  };
  render() {
    return (
      <div className="gadget-control-expanded-switch">
        <div className="wrapper">
          <div className={`switch ${this.isActive() ? 'active' : ''}`}>
            <div
              className="inner"
              onClick={() => {
                this.alterState();
              }}
            >
              <h2>{this.isActive() ? 'ON' : 'OFF'}</h2>
            </div>
            <div className="outer"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default GadgetControlExpandedSwitch;
