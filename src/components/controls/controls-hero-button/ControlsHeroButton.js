import React, {Component} from 'react';
import './ControlsHeroButton.css';

class ControlsHeroButton extends Component {
    state = {  }
    render() { 
        return ( 
            <div className={`controls-hero-button${this.props.disable ? ' disabled' : ''}`} onClick={this.props.onButtonClick}>
                <span className="label">{this.props.label}</span>
            </div>
         );
    }
}
 
export default ControlsHeroButton;
