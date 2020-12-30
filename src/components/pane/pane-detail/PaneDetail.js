import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import GadgetControlExpandedSetValue from '../../gadget/gadget-card/gadget-control-expanded-setValue/GadgetControlExpandedSetValue';
import GadgetControlExpandedSwitch from '../../gadget/gadget-control-expanded-switch/GadgetControlExpandedSwitch';
import './PaneDetail.css';

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
          return 'Range';
        case 'SWITCH':
        case 'BINARY_SENSOR':
        case 'SENSOR':
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
          return '0% - 100%';
        case 'BINARY_SENSOR':
          return this.context.selectedGadget.state;
        case 'SENSOR':
          return this.context.selectedGadget.state;
        default:
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
          return null;
        case 'SENSOR':
        default:
      }
  };
  capitalizeString = (string) => {
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
