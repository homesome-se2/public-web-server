import React, { Component } from 'react';
import '../../gadget/gadget-card/gadgetCard.css';
import { Paper } from '@material-ui/core';
import GadgetControlCompactSwitch from '../gadget-control-compact-switch/GadgetControlCompactSwitch';
import GadgeControlCompactBinarySensor from '../gadget-control-compact-binarySensor/GadgetControlCompactBinarySensor';
import GadgetControlCompactSensor from '../gadget-control-compact-sensor/GadgetControlCompactSensor';
import { UserContext } from '../../../contexts/UserContext';
import GadgetControlCompactSetValue from '../gadget-control-compact-setValue/GadgetControlCompactSetValue';

class GadgetCard extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {}

  renderGadgetIcon = () => {
    switch (this.props.gadget.type) {
      case 'SWITCH':
        if (this.props.gadget.valueTemplate === 'light')
          return <div className="icon custom switch-light"></div>;
        if (this.props.gadget.valueTemplate === 'alarmBurglar')
          return <div className="icon custom switch-alarmBurglar"></div>;
        if (this.props.gadget.valueTemplate === 'fan')
          return <div className="icon custom switch-fan"></div>;

        return <div className="icon custom switch-default"></div>;
      case 'SET_VALUE':
        return <div className="icon custom setValue-default"></div>;
      case 'SENSOR':
        if (this.props.gadget.valueTemplate === 'temp')
          return <div className="icon custom sensor-temp"></div>;

        return <div className="icon custom sensor-default"></div>;
      case 'BINARY_SENSOR':
        if (this.props.gadget.valueTemplate === 'detectorBurglar')
          return (
            <div className="icon custom binarySensor-detectorBurglar"></div>
          );
        if (this.props.gadget.valueTemplate === 'door')
          return <div className="icon custom binarySensor-door"></div>;
        if (this.props.gadget.valueTemplate === 'person')
          return <div className="icon custom binarySensor-person"></div>;
        return <div className="icon custom binarySensor-default"></div>;
      default:
        return <div className="icon default"></div>;
    }
  };

  renderCompactComponent = () => {
    switch (this.props.gadget.type) {
      case 'SWITCH':
        return (
          <GadgetControlCompactSwitch
            checkedState={this.isActive()}
            onStateAltered={(e) => {
              this.alterState(e.target.value);
            }}
          />
        );
      case 'SET_VALUE':
        return (
          <GadgetControlCompactSetValue
            state={this.props.gadget.state}
            onValueChange={(e) => {
              this.valueChanged(e);
            }}
            onStateAltered={(e) => {
              this.alterState(e.target.value);
            }}
          />
        );
      case 'BINARY_SENSOR':
        return (
          <GadgeControlCompactBinarySensor
            state={this.isActive()}
            vTemplate={this.props.gadget.valueTemplate}
          />
        );
      case 'SENSOR':
        return (
          <GadgetControlCompactSensor
            state={this.props.gadget.state}
            vTemplate={this.props.gadget.valueTemplate}
          />
        );
      default:
    }
  };
  generateActiveColorClass = () => {
    switch (this.props.gadget.type) {
      case 'SWITCH':
        if (this.props.gadget.valueTemplate === 'alarmBurglar') return 'safe';
        break;
      case 'BINARY_SENSOR':
        if (this.props.gadget.valueTemplate === 'detectorBurglar')
          return 'danger';
        if (this.props.gadget.valueTemplate === 'door') return 'danger';
        break;
      default:
        return 'init-default';
    }
    return 'init-default';
  };
  isActive = () => {
    switch (this.props.gadget.type) {
      case 'SWITCH':
      case 'BINARY_SENSOR':
        if (Number(this.props.gadget.state >= 1)) return true;
        return false;
      case 'SET_VALUE':
        if (parseFloat(this.state.value) > 50.0) return true; //this.props.gadget.state
        return false;
      default:
    }
  };
  getNewState = () => {
    switch (this.props.gadget.type) {
      case 'SWITCH':
        return this.props.gadget.state === '1.0' ? 0.0 : 1.0;
      default:
    }
  };
  updateSelectedGadgetCard = () => {
    this.context.selectGadget(this.props.gadget);
  };
  valueChanged = (e) => {
    console.log('slider value: ', e);
    this.setState({ value: e });
  };
  alterState = (state) => {
    console.log('new state: ', state);
    /* this.setState({ loading: true }); */
    //-> EXPERIMENTAL

    switch (this.props.gadget.type) {
      case 'SWITCH':
        this.context.update({
          gadgetId: this.props.gadget.id,
          newState: this.getNewState(),
        });
        break;
      case 'SET_VALUE':
        this.context.update({
          gadgetId: this.props.gadget.id,
          newState: state,
        });
        break;
      default:
    }
  };
  render() {
    return (
      <div className={`gadget-card`}>
        <Paper
          elevation={0}
          className={` ${this.generateActiveColorClass()} ${
            this.isActive() ? ' active' : ''
          }`}
        >
          <div
            className="interactive-area"
            onClick={(e) => {
              this.updateSelectedGadgetCard();
            }}
          ></div>
          <div
            className="loader"
            style={{ display: this.state.loading ? 'block' : 'none' }}
          ></div>
          {this.renderGadgetIcon()}
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
