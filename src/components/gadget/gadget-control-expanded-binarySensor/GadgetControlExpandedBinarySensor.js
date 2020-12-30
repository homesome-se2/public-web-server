import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './GadgetControlExpandedBinarySensor.css';

class GadgetControlExpandedBinarySensor extends Component {
  static contextType = UserContext;
  state = {};
  isActive = () => {
    return Number(this.context.selectedGadget.state) >= 1 ? true : false;
  };
  getStateText = (state) => {
    switch (this.context.selectedGadget.valueTemplate) {
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
  getVariant = () => {
    switch (this.context.selectedGadget.valueTemplate) {
      case 'door':
      case 'detectorBurglar':
        return 'danger';
      case 'person':
      default:
        return 'default';
    }
  };

  render() {
    return (
      <div className="gadget-control-expanded-binarySensor">
        <div
          className={`wrapper ${
            this.isActive() ? 'active' : ''
          } ${this.getVariant()}`}
        >
          <div className="inner">
            <h2 className="status">{this.getStateText(this.isActive())}</h2>
          </div>
          <div className="outer"></div>
        </div>
      </div>
    );
  }
}

export default GadgetControlExpandedBinarySensor;
