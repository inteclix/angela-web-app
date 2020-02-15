import React from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";

class Login extends React.Component {
  render() {
    return (
      <div>
        <Header back history={this.props.history} title="Settings" />
        <div>Settings</div>
      </div>
    );
  }
}
export default withRouter(Login);
