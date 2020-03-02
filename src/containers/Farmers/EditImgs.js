import React from "react";
import WebServices from "../../components/WebServices";
import { PropagateLoader } from "react-spinners";

import Header from "../../components/Header";
import { Label } from "../../components/Ui";

class EditImgs extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      percentCompletedImg1: 0,
      percentCompletedImg2: 0,
      percentCompletedImg3: 0,
      farmerId: 0,
      farmer_img1: "",
      farmer_img2: "",
      farmer_img3: ""
    };
    this.fileImg1 = React.createRef();
    this.fileImg2 = React.createRef();
    this.fileImg3 = React.createRef();
    this.img1 = React.createRef();
    this.img2 = React.createRef();
    this.img3 = React.createRef();
    window.img1 = this.img1;
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    WebServices.getFarmer(id)
      .then(res => {
        const data = res.data.data;
        this.setState({
          farmerId: id,
          farmer_img1: data.farmer_img1,
          farmer_img2: data.farmer_img2,
          farmer_img3: data.farmer_img3,
          loading: false
        });
      })
      .catch(err => {
        alert("حدث خطأ ما");
        this.setState({ loading: false });
      });
  }
  uploadImg1() {
    const config = {
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
        this.setState({ percentCompletedImg1: percentCompleted });
      }
    };

    let data = new FormData();
    data.append("fileImg1", this.fileImg1.current.files[0]);

    WebServices._axios()
      .post("/farmers/img1/" + this.state.farmerId, data, config)
      .then(
        res =>
          (this.img1.current.src =
            "https://angela.medda-dz.com/" + res.data.data.farmer_img1)
      )
      .catch(err => this.setState({ percentCompletedImg1: 100.0000001 }));
  }
  uploadImg2() {
    const config = {
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
        this.setState({ percentCompletedImg2: percentCompleted });
      }
    };

    let data = new FormData();
    data.append("fileImg2", this.fileImg2.current.files[0]);

    WebServices._axios()
      .post("/farmers/img2/" + this.state.farmerId, data, config)
      .then(
        res =>
          (this.img2.current.src =
            "https://angela.medda-dz.com/" + res.data.data.farmer_img2)
      )
      .catch(err => this.setState({ percentCompletedImg2: 100.0000001 }));
  }
  uploadImg3() {
    const config = {
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
        this.setState({ percentCompletedImg3: percentCompleted });
      }
    };

    let data = new FormData();
    data.append("fileImg3", this.fileImg3.current.files[0]);

    WebServices._axios()
      .post("/farmers/img3/" + this.state.farmerId, data, config)
      .then(
        res =>
          (this.img3.current.src =
            "https://angela.medda-dz.com/" + res.data.data.farmer_img3)
      )
      .catch(err => this.setState({ percentCompletedImg3: 100.0000001 }));
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
        <Header back history={this.props.history} title="تعديل الصور" />
        <Label label="صورة شمسية">
          <input ref={this.fileImg1} type="file" />
          <div
            style={{
              backgroundColor:
                this.state.percentCompletedImg1 === 100.0000001
                  ? "red"
                  : "green",
              width: `${this.state.percentCompletedImg1}%`,
              height: 3,
              margin: 5
            }}
          />
          <img
            ref={this.img1}
            onError={e => (e.target.src = require("../../images/photo.png"))}
            alt=""
            src={`https://angela.medda-dz.com/${this.state.farmer_img1}`}
            style={{ height: 200 }}
          />
          <button onClick={() => this.uploadImg1()}>رفع</button>
        </Label>
        <Label label="بطاقة التعريف الوطنية">
          <input ref={this.fileImg2} type="file" />
          <div
            style={{
              backgroundColor:
                this.state.percentCompletedImg2 === 100.0000001
                  ? "red"
                  : "green",
              width: `${this.state.percentCompletedImg2}%`,
              height: 3,
              margin: 5
            }}
          />
          <img
            ref={this.img2}
            onError={e => (e.target.src = require("../../images/photo.png"))}
            alt=""
            src={`https://angela.medda-dz.com/${this.state.farmer_img2}`}
            style={{ height: 200 }}
          />
          <button onClick={() => this.uploadImg2()}>رفع</button>
        </Label>
        <Label label="وصل البريد">
          <input ref={this.fileImg3} type="file" />
          <div
            style={{
              backgroundColor:
                this.state.percentCompletedImg3 === 100.0000001
                  ? "red"
                  : "green",
              width: `${this.state.percentCompletedImg3}%`,
              height: 3,
              margin: 5
            }}
          />
          <img
            ref={this.img3}
            onError={e => (e.target.src = require("../../images/photo.png"))}
            alt=""
            src={`https://angela.medda-dz.com/${this.state.farmer_img3}`}
            style={{ height: 200 }}
          />
          <button onClick={() => this.uploadImg3()}>رفع</button>
        </Label>
      </div>
    );
  }
}

export default EditImgs;
