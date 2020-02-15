import React from "react";
import { withRouter } from "react-router-dom";
import WebServices from "../components/WebServices";
import {
  IoIosArrowBack,
  IoIosPerson,
  IoIosLogOut,
  IoMdSettings,
  IoIosNutrition
} from "react-icons/io";

import Header from "../components/Header";
import Fabs, { Fab } from "../components/Fabs";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true
    };
  }
  componentDidMount() {
    WebServices.getProfile().then(res => {
      this.setState({ user: res.data.data, loading: false });
    });
  }
  _logout() {
    WebServices.logout();
    this.props.history.replace("/login");
  }
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          loading ...
        </div>
      );
    }
    return (
      <div>
        <Header history={this.props.history} title="Home" />
        <div style={{ flex: 1, padding: 5 }} />

        <Fabs>
          {this.state.user !== null && this.state.user.role === "admin" && (
            <Fab
              Icon={IoIosPerson}
              onClick={() => this.props.history.push("/users")}
            />
          )}
          <Fab
            Icon={IoIosNutrition}
            onClick={() => this.props.history.push("/farmers")}
          />
          <Fab
            Icon={IoMdSettings}
            onClick={() => this.props.history.push("/settings")}
          />
          <Fab Icon={IoIosLogOut} onClick={() => this._logout()} />
        </Fabs>
      </div>
    );
  }
}

export default withRouter(Home);
