import React from "react";
import { withRouter } from "react-router-dom";
import WebServices from "../components/WebServices";
import Header from "../components/Header";
import { Label } from "../components/Ui";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      percentCompleted: 0
    };
    this.fileImg1 = React.createRef();
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
    data.append("file", files[0]);

    WebServices._axios()
      .post("/auth/users/img1", data, config)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <Header back history={this.props.history} title="Settings" />
        <div>Settingsdd</div>
        <Label label="بطاقة التعريف الوطنية">
          <input type="file" />
        </Label>
      </div>
    );
  }
}
export default withRouter(Login);
