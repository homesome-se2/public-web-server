import React, { Component } from 'react';
import './PaneRoomSelection.css';

class PaneRoomSelection extends Component {
  state = {};
  render() {
    return (
      <div className="pane-room-selection">
        <div className="content-wrapper">
          <h1 className="header black-medium">Rooms</h1>
          <h2 className="sub-header light-grey">
            Select the room you want to filter the gadgets by
          </h2>
        </div>
      </div>
    );
  }
}

export default PaneRoomSelection;
