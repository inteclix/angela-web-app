import React from "react";
import { withRouter } from "react-router-dom";
import WebServices from "../components/WebServices";
import Header from "../components/Header";
import { Label } from "../components/Ui";

class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      percentCompleted: 0,
      user: null,
      loading: true
    };
    this.fileImg1 = React.createRef();
    window.fileimg1 = this.fileImg1;
    WebServices.getProfile().then(res => {
      this.setState({ user: res.data.data, loading: false });
    });
  }
  upload(files) {
    const config = {
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
        this.setState({ percentCompleted });
      }
    };

    let data = new FormData();
    data.append("img1", this.fileImg1.current.files[0]);

    WebServices._axios()
      .post("/auth/users/img1", data, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
        <Header back history={this.props.history} title="Settings" />
        <Label label="بطاقة التعريف الوطنية">
          <input ref={this.fileImg1} type="file" />
          <div
            style={{
              backgroundColor: "green",
              width: `${this.state.percentCompleted}%`,
              height: 3,
              margin: 5
            }}
          />
        </Label>
        <img
          src={`https://8000-port-server.medda-dz.com/${this.state.user.img1}`}
          style={{ height: 150 }}
        />
        <button onClick={() => this.upload()}>upload</button>
      </div>
    );
  }
}
export default withRouter(Setting);
