import React from "react";
import WebServices from "../../components/WebServices";
import {
  IoMdTrash,
  IoIosAlbums,
  IoMdAdd,
  IoIosEye,
  IoIosHome
} from "react-icons/io";

import { FaFileExcel } from "react-icons/fa";

import { PropagateLoader } from "react-spinners";

import Header from "../../components/Header";
import Fabs, { Fab } from "../../components/Fabs";

class All extends React.Component {
  constructor() {
    super();
    this.state = {
      farmers: [],
      loading: true
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    WebServices.getFarmers()
      .then(res => {
        this.setState({ farmers: res.data.data, loading: false });
      })
      .catch(err => {
        alert("حدث خطأ ما");
        this.setState({ loading: false });
      });
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
      <div style={{ flex: 1 }}>
        <Header back history={this.props.history} title="الكل" />
        {this.state.farmers.length === 0 && (
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            No farmers found
          </div>
        )}
        {this.state.farmers.length !== 0 && (
          <div>
            {this.state.farmers.map((farmer, index) => (
              <div
                key={index}
                style={{
                  alignItems: "center",
                  padding: 5,
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderBottomColor: "lightgray",
                  borderBottomStyle: "solid"
                }}
              >
                <div style={{ flex: 1, padding: 3 }}>
                  <div>إسم المزرعة : {farmer.farm_name}</div>
                  <div>
                    إسم المربي :{" "}
                    {farmer.farmer_first_name + " " + farmer.farmer_last_name}
                  </div>
                  <div>إنشاء من طرف : {farmer.user.username}</div>
                  <div>تاريخ الإنشاء : {farmer.created_at}</div>
                </div>
                <IoMdTrash
                  onClick={() => {
                    const quetion = window.confirm("هل تريد فعلا الحذف ");
                    quetion &&
                      WebServices.deleteFarmer(farmer.id).then(res => {
                        alert("تم الحذف");
                        this.init();
                      });
                  }}
                  color="red"
                  size={32}
                />
                <IoIosEye
                  onClick={() =>
                    this.props.history.push("/farmers/edit/" + farmer.id)
                  }
                  color="#3F51B5"
                  style={{ marginLeft: 10 }}
                  size={32}
                />
                <IoIosAlbums
                  onClick={() =>
                    this.props.history.push("/farmers/imgs/" + farmer.id)
                  }
                  color="#3F51B5"
                  style={{ marginLeft: 10 }}
                  size={32}
                />
              </div>
            ))}
          </div>
        )}

        <Fabs>
          <Fab
            Icon={IoMdAdd}
            onClick={() => this.props.history.push("/farmers/add")}
          />
          <Fab
            Icon={IoIosHome}
            onClick={() => this.props.history.replace("/")}
          />
          <Fab
            Icon={FaFileExcel}
            onClick={() => {
              const win = window.open(
                "https://angela.medda-dz.com/api/state/test",
                "_blank"
              );
              if (win != null) {
                win.focus();
              }
            }}
          />
        </Fabs>
      </div>
    );
  }
}

export default All;
