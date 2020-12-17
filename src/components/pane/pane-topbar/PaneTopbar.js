import React, { Component } from 'react';
import UserThumbnail from '../../user/user-thumbnail/UserThumbnail';
import { UserContext } from '../../../contexts/UserContext';
import './PaneTopbar.css';

class PaneTopbar extends Component {
  static contextType = UserContext;

  state = {};
  render() {
    return (
      <div className="pane-topbar">
        <div className="wrapper">
          <div className="left-container">
            <div className="logo"></div>
          </div>
          <div className="logout-btn"></div>
          <div className="right-container">
            <UserThumbnail username={'Homer'} size={40} />
            <div className="user-info">
              <h1>Homer</h1>
              <h2>Admin</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaneTopbar;
