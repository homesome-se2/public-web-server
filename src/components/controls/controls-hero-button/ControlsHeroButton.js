import React, { Component } from 'react';
import './ControlsHeroButton.css';

class ControlsHeroButton extends Component {
  state = {};
  render() {
    const { disable, onButtonClick, label } = this.props;

    return (
      <div
        className={`controls-hero-button${disable ? ' disabled' : ''}`}
        onClick={onButtonClick}
      >
        <span className="label">{label}</span>
      </div>
    );
  }
}

export default ControlsHeroButton;
