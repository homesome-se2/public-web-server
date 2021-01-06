import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UserContext } from '../../../contexts/UserContext';
import './GadgetControlExpandedSensor.css';

class GadgetControlExpandedSensor extends Component {
  static contextType = UserContext;
  state = {};
  getGadgetProps = () => {
    switch (this.context.selectedGadget.valueTemplate) {
      case 'temp':
        return {
          unit: '°C',
          minValue: -20,
          maxValue: 60,
          steps: [150, 510, 860],
        };
      case 'percent':
        return {
          unit: '%',
          minValue: 0,
          maxValue: 100,
          steps: [150, 510, 860],
        };
      default:
        return {
          unit: 'u',
          minValue: 0,
          maxValue: 1023,
          steps: [150, 510, 860],
        };
    }
  };
  formatValue = (value) => {
    return (Math.round(value * 100) / 100).toFixed(2);
  };
  render() {
    return (
      <div className="gadget-control-expanded-sensor">
        <div className="wrapper">
          <div className="inner">
            <div className="state-value">
              {this.formatValue(this.context.selectedGadget.state)}
              <div className="unit">{this.getGadgetProps().unit}</div>
            </div>
          </div>
          <div className="dial">
            <div className="steps step1">{this.getGadgetProps().steps[0]}</div>
            <div className="steps step1">{this.getGadgetProps().steps[0]}</div>
            <div className="steps step1">{this.getGadgetProps().steps[0]}</div>
          </div>
          <CircularProgressbar
            value={this.context.selectedGadget.state}
            //text={`${this.context.selectedGadget.state}`}
            circleRatio={0.75}
            minValue={this.getGadgetProps().minValue}
            maxValue={this.getGadgetProps().maxValue}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: 'butt',
              trailColor: '#edeff4',
              textColor: '#fff',
            })}
            strokeWidth={10}
          />
        </div>
      </div>
    );
  }
}

export default GadgetControlExpandedSensor;
