import React, {Component} from 'react';
import './PaneActiveArea.css';

class PaneActiveArea extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="pane pane-active-area">
                <div className="inner-area">
                    <div className="content-wrapper">
                        <div className="no-scroll-area device-list-header-wrapper">
                            <span className="device-list-header-group">
                                <h2 className="medium-title d1-title">Device list</h2>
                                <h2 className="medium-subtitle d2-subtitle">All the available gadgets</h2>
                            </span>
                            <div className="separator"></div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default PaneActiveArea;