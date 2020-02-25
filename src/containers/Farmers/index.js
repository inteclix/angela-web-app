import React from "react";
import { Route } from "react-router-dom";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";
import EditImgs from "./EditImgs";

class Users extends React.Component {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <Route exact path="/farmers" component={All} />
        <Route path="/farmers/add" component={Add} />
        <Route path="/farmers/edit/:id" component={Edit} />
        <Route exact path="/farmers/imgs/:id/" component={EditImgs} />
      </div>
    );
  }
}

export default Users;
