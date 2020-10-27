import React, {Component} from 'react';
import "./PaneRoomSelection.css";

class PaneRoomSelection extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="pane pane-room-selection">
                <div className="content-wrapper">
                    <h1 className="medium-title d1-title">Rooms</h1>
                    <h2 className="medium-subtitle d2-subtitle">Select the room you want filter the gadgets by</h2>
                </div>
            </div>
         );
    }
}
 
export default PaneRoomSelection;