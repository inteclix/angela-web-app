import React from "react";
import { Route, Switch } from "react-router-dom";

import withAuth from "../components/withAuth";

import Home from "./Home";
import Login from "./Login";
import Users from "./Users";
import Farmers from "./Farmers";
import About from "./About";

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/farmers" component={Farmers} />
        <Route exact path="/login" component={Login} />
        <Route path="/about" component={About} />
      </Switch>
    );
  }
}

export default withAuth(Main);
