import React, { Component } from 'react';
import './PaneDetail.css';

class PaneDetail extends Component {
  state = {};
  render() {
    return (
      <div className="pane-detail">
        <div className="content-wrapper">
          <h1 className="header black-medium">Detail pane</h1>
          <h2 className="sub-header light-grey">Gadget's details</h2>
        </div>
      </div>
    );
  }
}

export default PaneDetail;
