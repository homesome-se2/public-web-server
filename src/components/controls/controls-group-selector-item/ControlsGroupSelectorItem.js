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
  generateThumbnail = (string) => {
    const ws = string.indexOf(' ');
    const nLegalPOS = ws <= string.length ? ws : ws + 1;
    if (ws >= 0) return string[0].toUpperCase() + string[nLegalPOS];
    if (string.length > 1) return string[0].toUpperCase() + string[1];
    return string[0].toUpperCase();
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
          <div className="group-icon">{this.generateThumbnail(gadgetName)}</div>
        </div>
      </div>
    );
  }
}

export default ControlsGroupSelectorItem;
