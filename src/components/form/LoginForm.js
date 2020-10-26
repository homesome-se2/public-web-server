import React, { Component } from "react";
import './LoginForm.css';

import { TextField, Button } from '@material-ui/core';
import ControlsHeroButton from "../controls/controls-hero-button/ControlsHeroButton";


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleClick = (e) => {
    this.handleSubmit(e);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
       
        <TextField className="input-field" id="filled-basic" label="Username" 
        value={this.state.value} 
        onChange={this.handleChange} required fullWidth/>

        <TextField className="input-field"  
        id="filled-basic" label="Password" 
        type="password" required fullWidth/>


        <ControlsHeroButton onButtonClick={this.handleClick} label="Login"></ControlsHeroButton>
      </form>
    );
  }
}

export default LoginForm;
