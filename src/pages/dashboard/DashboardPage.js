import React, { Component } from "react";
import { UserContext } from "../../contexts/UserContext";
import HoSoHelper from "../../helpers/HoSoHelper";
import LSTokenService from "../../services/LSTokenService";

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
        <h1>dashboard</h1>
        {this.context.username}
      </div>
    );
  }
}

export default DashboardPage;
