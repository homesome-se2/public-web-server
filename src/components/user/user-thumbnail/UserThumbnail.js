import React, { Component } from 'react';
import './UserThumbnail.css';

class UserThumbnail extends Component {
  state = {};
  getUsernameInitial = (username) => {
    return username[0].toUpperCase();
  };
  render() {
    const { size, username } = this.props;
    return (
      <div className="user-thumbnail">
        <div
          className="thumbnail"
          style={{ width: size + 'px', height: size + 'px' }}
        >
          {this.getUsernameInitial(username)}
        </div>
      </div>
    );
  }
}

export default UserThumbnail;
