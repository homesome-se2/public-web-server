import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import ControlsGroupSelectorItem from '../controls-group-selector-item/ControlsGroupSelectorItem';
import './ControlsGroupSelector.css';

class ControlsGroupSelector extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  updateGroupSelection = (groupName) => {
    this.context.updateGadgetGroupSelection(groupName);
  };

  render() {
    return (
      <div className="controls-group-selector">
        <ul>
          {this.context.gadgetsGroups.map((gadgetGroup, key) => {
            return (
              <li key={key}>
                <ControlsGroupSelectorItem
                  gadgetName={gadgetGroup.name}
                  key={key}
                  active={
                    this.context.selectedGadgetGroup.name === gadgetGroup.name
                  }
                  onSelectionChange={this.updateGroupSelection}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ControlsGroupSelector;
