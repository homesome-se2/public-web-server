import React, { Component } from 'react';
import ControlsGroupSelector from '../../controls/controls-group-selector/ControlsGroupSelector';
import './PaneGadgetGroupSelection.css';

class PaneGadgetGroupSelection extends Component {
  state = {};
  render() {
    return (
      <div className="pane-gadget-group-selection">
        <div className="content-wrapper">
          <h1 className="header black-medium">Categories</h1>
          <h2 className="sub-header light-grey">
            Select the category you want to filter the gadgets by
          </h2>
        </div>
        <ControlsGroupSelector></ControlsGroupSelector>
      </div>
    );
  }
}

export default PaneGadgetGroupSelection;
