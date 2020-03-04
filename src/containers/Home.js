import React from "react";
import { withRouter } from "react-router-dom";
import WebServices from "../components/WebServices";
import {
  IoIosArrowBack,
  IoIosPerson,
  IoIosLogOut,
  IoMdSettings,
  IoIosNutrition,
  IoIosDocument
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
    const data = {
      labels: ["المستخدمين", "المربيين", ""],
      datasets: [
        {
          label: "عدد الإحصائيات",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [this.state.numberUsers, this.state.numberFarmers, 0]
        }
      ]
    };
    return (
      <div
        style={{
          flex: 1,
          backgroundImage: "linear-gradient(to top left, white, #b2bbe8)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Bar data={data} />

        <div style={{ textAlign: "right", margin: 5, padding: 5 }}>
          <button
            onClick={() => {
              axios({
                url: WebServices.domain + "/state/farmers_excel",
                method: "GET",
                responseType: "blob", // important
                headers: {
                  Authorization: "Bearer " + WebServices.getToken()
                }
              }).then(response => {});
            }}
          >
            <IoIosDocument
              size={32}
              style={{ marginRight: 10, marginLeft: 10 }}
            />
            تحميل ملف الإكسيل
          </button>
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
          <Fab Icon={IoIosLogOut} onClick={() => this._logout()} />
        </Fabs>
      </div>
    );
  }
}

export default withRouter(Home);
