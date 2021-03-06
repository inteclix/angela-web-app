import React from "react";
import { withRouter } from "react-router-dom";

import WebServices from "../components/WebServices";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  _login() {
    WebServices.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace("/");
        console.log("then in handle submit");
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
        className="login"
      >
        <img
          alt=""
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
            marginTop: 20
          }}
          src={require("../images/logo.jpg")}
        />
        <h1>Angela</h1>
        <div>
          <input
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
            value={this.state.username}
            placeholder="إسم المستخدم"
          />
          <input
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
            value={this.state.password}
            placeholder="الرقم السري"
            type="password"
          />
          <button onClick={() => this._login()}>دخول</button>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
