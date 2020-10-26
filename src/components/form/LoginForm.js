import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import './LoginForm.css';

import { TextField } from '@material-ui/core';
import ControlsHeroButton from "../controls/controls-hero-button/ControlsHeroButton";
import { UserContext } from "../../contexts/UserContext";
import LSTokenService from "../../services/LSTokenService";



class LoginForm extends Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      attemptedLogin: 0,
      invalid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
  }

  navigate = (target, param) => {
    this.props.history.push({
        pathname: `/${target}`,
        state: param
    });
}

  handleSubmit = e => {
    e.preventDefault();

    this.setState({attemptedLogin: this.state.attemptedLogin+1});

    if(this.areFieldsValid()){
      this.context.csInstance.connect();
      this.context.csInstance.login(this.state.username, this.state.password).then((rData) => {
        console.log(rData)
        this.context.username = this.state.username;
        this.context.isAdmin = rData.isAdmin;
        this.context.homeAlias = rData.homeAlias;
        this.context.token = rData.token;
        LSTokenService.setAdminFlag(!!rData.isAdmin);
        LSTokenService.setHomeAlias(rData.homeAlias);
        LSTokenService.setToken(rData.token);

        this.navigate("dashboard", {});

      }).catch((rData) => {
        console.log(rData);
        this.setState({invalid: true});
      });
    }
    
  }

  areFieldsValid = () => {
    return this.state.username.length >= 3 && this.state.password.length >=3;
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
       
        <TextField className="input-field" id="username-field" label="Username" 
        onChange={ e => {this.setState({username: e.target.value})} } required fullWidth
        error={ this.state.invalid || (this.state.username.length <= 3 && this.state.attemptedLogin>0 )}
        
        />

        <TextField className="input-field"  
        id="password-field" label="Password" 
        type="password" required fullWidth
          onChange={ e => {this.setState({password: e.target.value})} }
          error={ this.state.invalid || (this.state.username.length <= 3 && this.state.attemptedLogin>0)}
        />

        {this.state.invalid &&
          <span className="login-error">
            <h2>*Incorrect username or password!</h2>
          </span>
          
        }
        <ControlsHeroButton onButtonClick={this.handleSubmit} label="Login"></ControlsHeroButton>
      </form>
    );
  }
}

export default withRouter(LoginForm);
