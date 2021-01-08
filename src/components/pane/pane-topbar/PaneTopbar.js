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
          <div
            className="logout-btn all"
            title="Logout from all devices"
            onClick={() => {
              this.context.logout({ payload: null }, { type: 'ALL' });
            }}
          >
            <div className="icon"></div>
          </div>
          <div
            className="logout-btn this"
            title="Logout from this device"
            onClick={() => {
              this.context.logout({ payload: null }, { type: 'THIS' });
            }}
          ></div>

          <div className="right-container">
            <UserThumbnail username={this.context.username} size={40} />
            <div className="user-info">
              <h1>{this.context.username}</h1>
              <h2>{this.context.isAdmin === 'true' ? 'Admin' : 'User'}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaneTopbar;
