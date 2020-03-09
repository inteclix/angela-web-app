import React from "react";
import { withRouter } from "react-router-dom";
import WebServices from "../components/WebServices";
import {
  IoIosArrowBack,
  IoIosPerson,
  IoIosLogOut,
  IoMdSettings,
  IoIosNutrition,
  IoIosDocument,
  IoIosHelpCircleOutline
} from "react-icons/io";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import Header from "../components/Header";
import Fabs, { Fab } from "../components/Fabs";
import Axios from "axios";
import { Bar } from "react-chartjs-2";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      numberFarmers: 0,
      numberUsers: 0,
      loading: true
    };
  }
  componentDidMount() {
    WebServices.getProfile().then(res => {
      this.setState({ user: res.data.data });
      WebServices._axios()
        .get("/state/numbers_farmers_users")
        .then(res => {
          this.setState({
            numberFarmers: res.data.nb_farmers,
            numberUsers: res.data.nb_users,
            loading: false
          });
        })
        .catch(err => {});
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
          <PropagateLoader />
        </div>
      );
    }
    const dataUsers = {
      labels: ["المستخدمين", ""],
      datasets: [
        {
          label: "عدد المستخدمين",
          backgroundColor: "rgba(76,175,80,0.2)",
          borderColor: "rgba(76,175,80,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(76,175,80,0.4)",
          hoverBorderColor: "rgba(76,175,80,1)",
          data: [this.state.numberUsers, 0]
        }
      ]
    };
    const dataFarmers = {
      labels: ["المربيين", ""],
      datasets: [
        {
          label: "عدد المربيين",
          backgroundColor: "rgba(3,169,244,0.2)",
          borderColor: "rgba(3,169,244,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(3,169,244,0.4)",
          hoverBorderColor: "rgba(3,169,244,1)",
          data: [this.state.numberFarmers, 0]
        }
      ]
    };
    return (
      <div
        style={{
          flex: 1,
          backgroundImage: "linear-gradient(to top left, white, #b2bbe8)"
        }}
      >
        <div
          style={{
            margin: 10,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 5,
            backgroundColor: "white"
          }}
        >
          <img
            alt=""
            style={{
              height: 100,
              width: 100,
              alignSelf: "center",
              margin: 20
            }}
            src={require("../images/logo.jpg")}
          />
        </div>

        <div
          style={{
            margin: 10,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 5,
            backgroundColor: "white"
          }}
        >
          <Bar data={dataUsers} />
        </div>

        <div
          style={{
            margin: 10,
            marginLeft: 5,
            marginRight: 5,
            borderRadius: 5,
            backgroundColor: "white"
          }}
        >
          <Bar data={dataFarmers} />
        </div>
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
            Icon={IoIosHelpCircleOutline}
            onClick={() => this.props.history.push("/about")}
          />
          <Fab Icon={IoIosLogOut} onClick={() => this._logout()} />
        </Fabs>
      </div>
    );
  }
}

export default withRouter(Home);
