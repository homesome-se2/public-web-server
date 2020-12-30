import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import GadgetControlExpandedSwitch from '../../gadget/gadget-control-expanded-switch/GadgetControlExpandedSwitch';
import GadgetControlExpandedSetValue from '../../gadget/gadget-control-expanded-setValue/GadgetControlExpandedSetValue';
import GadgetControlExpandedSensor from '../../gadget/gadget-control-expanded-sensor/GadgetControlExpandedSensor';
import './PaneDetail.css';
import GadgetControlExpandedBinarySensor from '../../gadget/gadget-control-expanded-binarySensor/GadgetControlExpandedBinarySensor';

class PaneDetail extends Component {
  static contextType = UserContext;

  isGadgetSelected = () => {
    return (
      this.context.selectedGadget != null &&
      this.context.selectedGadget !== 'unset'
    );
  };

  getStatusHeading = () => {
    if (this.context.selectedGadget != null)
      switch (this.context.selectedGadget.type) {
        case 'SET_VALUE':
        case 'SENSOR':
          return 'Range';
        case 'SWITCH':
        case 'BINARY_SENSOR':
        default:
          return 'Status';
      }
  };

  getStatus = () => {
    if (this.context.selectedGadget != null)
      switch (this.context.selectedGadget.type) {
        case 'SWITCH':
          return this.context.selectedGadget.state === '1.0'
            ? 'The gadget is on'
            : 'The gadget is off';
        case 'SET_VALUE':
          return '0% to 100%';
        case 'BINARY_SENSOR':
          return this.getBinarySensorStatus(
            this.context.selectedGadget.valueTemplate,
            Number(this.context.selectedGadget.state) >= 1
          );
        case 'SENSOR':
          return this.context.selectedGadget.valueTemplate === 'temp'
            ? '-20°C to +60°C'
            : this.context.selectedGadget.valueTemplate === 'percent'
            ? '0% to 100%'
            : '0 to 1023';
        default:
      }
  };

  getBinarySensorStatus = (vTemplate, state) => {
    switch (vTemplate) {
      case 'detectorBurglar':
        return state ? 'Detector triggered!' : 'No detection occured';
      case 'door':
        return state ? 'The door is open' : 'The door is closed';
      case 'person':
        return state ? 'The person is Home' : 'The person is Away';
      default:
        return state ? 'Sensor reported On' : 'Sensor reported Off';
    }
  };

  renderExpandedComponent = () => {
    if (this.context.selectedGadget != null)
      switch (this.context.selectedGadget.type) {
        case 'SWITCH':
          return <GadgetControlExpandedSwitch />;
        case 'SET_VALUE':
          return <GadgetControlExpandedSetValue />;
        case 'BINARY_SENSOR':
          return <GadgetControlExpandedBinarySensor />;
        case 'SENSOR':
          return <GadgetControlExpandedSensor />;
        default:
      }
  };
  capitalizeString = (string) => {
    if (string === 'SET_VALUE') return 'SetValue';
    if (string === 'BINARY_SENSOR') return 'BSensor';
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  };

  resetSelectedGadget = (e) => {
    this.context.selectGadget(null);
  };

  state = {};
  render() {
    return (
      <div className="pane-detail">
        <div className="content-wrapper">
          <div className="p-wrapper">
            <div className="puller">
              <div
                className="dragger"
                onClick={(e) => {
                  this.resetSelectedGadget(e);
                }}
              ></div>
            </div>
          </div>
          <div
            className={`selection-overlay ${
              !this.isGadgetSelected() ? 'visible' : ''
            }`}
          >
            <h1>Select a gadget to inspect</h1>
          </div>
          <h2 className="sub-header light-grey">Device alias</h2>
          <input
            type="text"
            className="i-gadget-alias"
            value={
              this.context.selectedGadget != null
                ? this.context.selectedGadget.alias
                : 'UNSET'
            }
          />
          <div className="control-wrapper">
            {this.renderExpandedComponent()}
          </div>
          <div className="state-wrapper">
            <h2 className="sub-header center light-grey">
              {this.getStatusHeading()}
            </h2>
            <h1>
              <span className="">{this.getStatus()}</span>
            </h1>
          </div>
          <div className="divider"></div>
          <div className="info-box">
            <div className="row">
              <div className="left">
                <h2 className="sub-header light-grey">Device type</h2>
                <h1>
                  {this.context.selectedGadget != null
                    ? this.capitalizeString(this.context.selectedGadget.type)
                    : 'UNSET'}
                </h1>
              </div>
              <div className="right">
                <h2 className="sub-header light-grey">V-Template</h2>
                <h1>
                  {this.context.selectedGadget != null
                    ? this.capitalizeString(
                        this.context.selectedGadget.valueTemplate
                      )
                    : 'UNSET'}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="left full">
                <h2 className="sub-header light-grey">Gadget's internal ID</h2>
                <h1 className="lighter">
                  #
                  <span className="darker">
                    {this.context.selectedGadget != null
                      ? this.context.selectedGadget.gadgetID
                      : 'UNSET'}
                  </span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="left full">
                <h2 className="sub-header light-grey">Poll rate</h2>
                <h1>
                  <span>
                    {this.context.selectedGadget != null
                      ? this.context.selectedGadget.pollDelaySec
                      : 'UNSET'}
                    s
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaneDetail;
