import React from "react";
import { withRouter } from "react-router-dom";
import WebServices from "../components/WebServices";
import Header from "../components/Header";
import { Label } from "../components/Ui";

class Setting extends React.Component {
  constructor() {
    super();
    this.state = {
      percentCompleted: 0
    };
    this.fileImg1 = React.createRef();
    window.fileimg1 = this.fileImg1;
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
        <button onClick={() => this.upload()}>upload</button>
      </div>
    );
  }
}
export default withRouter(Setting);
