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
    return (
      <div>
        <div style={{ textAlign: "right", margin: 5, padding: 5 }}>
          {this.state.user.role === "admin" && (
            <h2>
              عدد المستخدمين <IoIosPerson size={24} /> :{"  "}
              {this.state.numberUsers}{" "}
            </h2>
          )}
          <h2>
            عدد المربين <IoIosNutrition size={24} /> :{"  "}
            {this.state.numberFarmers}{" "}
          </h2>
        </div>

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
