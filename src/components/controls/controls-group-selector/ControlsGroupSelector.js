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
  renderPlaceholder = () => {
    if (this.context !== null && this.context.gadgetsGroups.length === 0)
      return <div className="placeholder">No gadget groups present</div>;
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
          {this.renderPlaceholder()}
        </ul>
      </div>
    );
  }
}

export default ControlsGroupSelector;
