import React, { Component } from 'react';
import './ControlsGroupSelectorItem.css';

class ControlsGroupSelectorItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  handleClick = (e) => {
    this.props.onSelectionChange(this.props.gadgetName);
  };

  render() {
    const { gadgetName, active } = this.props;
    return (
      <div
        className="controls-group-selector-item"
        onClick={(e) => {
          this.handleClick(e);
        }}
      >
        <div className={`wrapper${active ? ' active' : ''}`}>
          <div className="group-name">{gadgetName}</div>
          <div className="group-icon"></div>
        </div>
      </div>
    );
  }
}

export default ControlsGroupSelectorItem;
