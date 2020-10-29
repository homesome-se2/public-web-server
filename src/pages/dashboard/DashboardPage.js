import React, { Component } from "react";
import { Row, Col } from "antd"
import PaneActiveArea from '../../components/pane/PaneActiveArea/PaneActiveArea';
import PaneDetail from "../../components/pane/pane-detail/PaneDetail";
import PaneRoomSelection from "../../components/pane/pane-room-selection/PaneRoomSelection";
import { UserContext } from "../../contexts/UserContext";
import 'antd/dist/antd.css';
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
        <PaneDetail></PaneDetail>
        <Row gutter={16} className="main-app-row">
          <Col>
            <PaneActiveArea/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardPage;
