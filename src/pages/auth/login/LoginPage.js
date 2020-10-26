import React, {Component} from 'react';
import LoginForm from '../../../components/form/LoginForm';
import { ReactComponent as HSLogo } from '../../../assets/images/hs-webjs-logo.svg';
import './LoginPage.css';



class LoginPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="login-page">
                <div className="fw-wrapper center">
                    <HSLogo className="header-logo center" />
                    <h1 className="black-medium">Sign in to your <b>smart-home</b> dashboard</h1>
                    <LoginForm />
                </div>
                
            </div>
         );
    }
}
 
export default LoginPage;