import React, { Component } from 'react';
import './ControlsInput.css';

class ControlsInput extends Component {
  state = {
    value: '',
    typed: false,
  };
  isValid = () => {
    if (this.props.err || (this.state.value.length < 4 && this.state.type))
      return 0;
    return this.state.typed ? this.state.value.length >= 4 : -1;
  };
  getFormState = (err) => {
    if (!this.isValid()) return 'invalid';
    if (this.isValid() > 0) return 'valid';
    return '';
  };
  handleChange(event) {
    if (this.state.value.length > 0) this.setState({ typed: true });
    this.setState({ value: event.target.value });
    this.props.onValueChange(event.target.value);
  }
  handleBlur = () => {
    if (this.state.value.length > 0) {
      this.setState({ typed: true });
    }
  };
  render() {
    const { type, label, placeholder, disabled } = this.props;
    return (
      <div className={`controls-input ${this.props.className}`}>
        <label>{label}</label>
        <div className="input-wrapper">
          <input
            className={`${this.getFormState(this.props.err)}`}
            type={type}
            placeholder={placeholder}
            value={this.state.value}
            onChange={(e) => {
              this.handleChange(e);
            }}
            onBlur={this.handleBlur}
            disabled={disabled}
          ></input>
          <div
            className={`icon ${this.isValid() ? ' valid' : 'invalid'}${
              this.state.typed || this.props.err ? ' visible' : ''
            }`}
          ></div>
        </div>
      </div>
    );
  }
}

export default ControlsInput;
