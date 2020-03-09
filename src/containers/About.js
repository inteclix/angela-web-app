import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";

class About extends React.Component {
  render() {
    return (
      <div>
        <Header back history={this.props.history} title="عن الجمعية" />
        <div>
          <img
            alt=""
            style={{ width: "100%" }}
            src={require("../images/about.jpg")}
          />
          <img
            alt=""
            style={{
              width: 70,
              height: 70,
              alignSelf: "center",
              margin: 30
            }}
            src={require("../images/inteclix.png")}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(About);
