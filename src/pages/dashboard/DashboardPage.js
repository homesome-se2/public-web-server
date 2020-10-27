import React, { Component } from "react";
import PaneActiveArea from "../../components/pane/pane-active-area/PaneActiveArea";
import PaneDetail from "../../components/pane/pane-detail/PaneDetail";
import PaneRoomSelection from "../../components/pane/pane-room-selection/PaneRoomSelection";
import { UserContext } from "../../contexts/UserContext";

import './DashboardPage.css';


class DashboardPage extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="dashboard-page">
        <PaneRoomSelection></PaneRoomSelection>
        <PaneActiveArea></PaneActiveArea>
        <PaneDetail></PaneDetail>
      </div>
    );
  }
}

export default DashboardPage;
