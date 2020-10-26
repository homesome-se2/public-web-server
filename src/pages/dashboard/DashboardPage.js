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
    console.log(HoSoHelper.buildAutoLoginString('213213', 'DAB8D24756D3F0EB2F3A032477A3CFF3'));
    this.context.csInstance.connect();
    this.context.csInstance
      .autoLogin(LSTokenService.getUsername(), LSTokenService.getToken())
      .then((rData) => {
        console.log("autologin data: ", rData);
      });
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
