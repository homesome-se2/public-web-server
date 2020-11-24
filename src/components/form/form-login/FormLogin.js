import React, { Component } from 'react';
import ControlsInput from '../../controls/controls-input/ControlsInput';
import ControlsHeroButton from '../../controls/controls-hero-button/ControlsHeroButton';
import './FormLogin.css';

class FormLogin extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorClass: '',
    editable: true,
    updated: false,
  };

  submitForm = () => {
    if (this.state.username.length < 4 || this.state.password.length < 4) {
      this.setState({ error: true });
      this.setState({ errorClass: 'error' });
      this.wait(1000).then(() => {
        this.setState({ errorClass: '' });
      });
    } else {
      this.setState({ error: false });
      this.props.onAuth(this.state.username, this.state.password);
    }
    this.setState({ updated: false });
  };

  wait = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  render() {
    return (
      <div className={`form-login ${this.props.className}`}>
        <div className="wrapper">
          <div className="caption">
            <h2>WELCOME BACK</h2>
            <h1>Sign into your account</h1>
          </div>
          <form>
            <ControlsInput
              type="text"
              label="Username"
              placeholder="Enter your username or client ID"
              onValueChange={(value) => {
                this.setState({ username: value });
                this.setState({ updated: true });
              }}
              err={
                (this.props.invalid && !this.state.updated) ||
                (this.state.error && !this.state.updated)
              }
              className={` ${this.state.errorClass} ${
                this.props.invalid ? 'late-error' : ''
              }`}
            />
            <ControlsInput
              type="password"
              label="Password"
              placeholder="Enter your password"
              onValueChange={(value) => {
                this.setState({ updated: true });

                this.setState({ password: value });
              }}
              err={
                (this.props.invalid && !this.state.updated) ||
                (this.state.error && !this.state.updated)
              }
              className={` ${this.state.errorClass} ${
                this.props.invalid ? 'late-error' : ''
              }`}
            />
            <ControlsHeroButton
              label="Login"
              disable={false}
              onButtonClick={this.submitForm}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default FormLogin;
