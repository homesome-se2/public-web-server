import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './GadgetControlExpandedSetValue.css';

class GadgetControlExpandedSetValue extends Component {
  static contextType = UserContext;

  state = {
    percentage: this.context.selectedGadget.state,
  };

  handleChange = (e) => {
    this.setState({ percentage: e.target.value });
  };
  alterState = () => {
    this.context.update({
      gadgetId: this.context.selectedGadget.id,
      newState: this.state.percentage,
    });
  };
  render() {
    return (
      <div className="gadget-control-expanded-setValue">
        <div className="wrapper">
          <h2 className="sub-header light-grey value-sub-header">Value</h2>
          <div className={`percentage`}>
            {(Math.round(this.state.percentage * 10) / 10).toFixed(1)}
          </div>
          <div className="slider-wrapper">
            <input
              type="range"
              min="0"
              max="100"
              step="1.0"
              value={this.state.percentage}
              className="v-slider"
              onChange={(e) => {
                this.handleChange(e);
              }}
              onBlur={(e) => {
                this.alterState();
              }}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default GadgetControlExpandedSetValue;
