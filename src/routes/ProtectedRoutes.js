import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'



class ProtectedRoutes extends Component {
    state = {  }
    render() { 
        const Component = this.props.component;
        const isAuthenticated = false;
       
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}
 
export default ProtectedRoutes;