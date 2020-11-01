import React, { Component } from "react";
import { Row, Col } from "antd"
import PaneDetails from '../../components/pane/panedetails/PaneDetails'
import PaneRoomSelection from '../../components/pane/paneroomselection/PaneRoomSelection';
import PaneActiveArea from '../../components/pane/paneactivearea/PaneActiveArea';
import GadgetCard from '../../components/gadget/gadget-card/GadgetCard';
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
        <Row gutter={16} className="main-app-row">
          <Col xs={24} sm={24} lg={4}>
            <PaneRoomSelection />
          </Col>
          <Col xs={24} sm={24} lg={14}>
            <div style={{backgroundColor:'#f3f6ff',width:'100%',height:'85%'}}>
           <PaneActiveArea />
              <GadgetCard name="Kitchen Lamp" state={1} design={1} read={0}  />
              <GadgetCard name="Living Room TV" state={1} design={0} read={0} />
              <GadgetCard name="Temperature" state={1} design={0} read={1} />
            </div>
          </Col>
          <Col xs={24} sm={24} lg={6}>
            <PaneDetails />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardPage;
