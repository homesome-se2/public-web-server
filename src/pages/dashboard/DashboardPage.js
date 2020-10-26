import React, { Component } from "react";
import { UserContext } from "../../contexts/UserContext";

class DashboardPage extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      
    };

  }
  componentDidMount() {
    this.context.csInstance.listenForUpdates();
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
