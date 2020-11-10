import React, { Component } from 'react';
import '../../gadget/gadget-card/gadgetCard.css';
import { Paper } from '@material-ui/core';
import GadgetControlCompactSwitch from '../gadget-control-compact-switch/GadgetControlCompactSwitch';
import GadgeControlCompactBinarySensor from '../gadget-control-compact-binarySensor/GadgetControlCompactBinarySensor';
import GadgetControlCompactSensor from '../gadget-control-compact-sensor/GadgetControlCompactSensor';
import { UserContext } from '../../../contexts/UserContext';

class GadgetCard extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*     let x = 0;
    window.setInterval(
      () => {
        console.log('updated to :', x);
        if (x === 0) x = 1;
        else x = 0;
        this.context.update({
          gadgetId: 2,
          newState: x,
        });
      },
      5000,
      x
    ); */
  }

  renderCompactComponent = () => {
    switch (this.props.gadget.type) {
      case 'SWITCH':
        return <GadgetControlCompactSwitch checkedState={this.isActive()} />;
      case 'BINARY_SENSOR':
        return <GadgeControlCompactBinarySensor state={this.isActive()} />;
      case 'SENSOR':
        return <GadgetControlCompactSensor state={this.props.gadget.state} />;
      default:
    }
  };
  isActive = () => {
    return (
      this.props.gadget.type === 'SWITCH' && this.props.gadget.state === '1.0'
    );
  };
  getNewState = () => {
    switch (this.props.gadget.type) {
      case 'SWITCH':
        return this.props.gadget.state === '1.0' ? 0.0 : 1.0;
      default:
    }
  };
  alterState = () => {
    if (1) {
      this.context.update({
        gadgetId: this.props.gadget.id,
        newState: this.getNewState(),
      });
    }
  };
  render() {
    return (
      <div className={`gadget-card`}>
        <Paper
          elevation={0}
          className={`${this.isActive() ? ' active' : ''}`}
          onClick={this.alterState}
        >
          <div className="icon"></div>
          <div className="text-wrapper">
            <div className="gadget-alias">{this.props.gadget.alias}</div>
            <div className="gadget-status">connected</div>
          </div>
          <div className="control-wrapper">{this.renderCompactComponent()}</div>
        </Paper>
      </div>
    );
  }
}
export default GadgetCard;
