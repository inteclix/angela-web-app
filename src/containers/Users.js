import React from "react";
import { withRouter, Route } from "react-router-dom";
import WebServices from "../components/WebServices";
import { IoMdTrash, IoMdEye, IoMdAdd, IoIosEye } from "react-icons/io";

import Header from "../components/Header";
import Fabs, { Fab } from "../components/Fabs";
import { Label } from "../components/Ui";
class All extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true
    };
  }
  componentDidMount() {
    this.init();
  }
  init() {
    WebServices.getUsers()
      .then(res => {
        this.setState({ users: res.data.data, loading: false });
      })
      .catch(err => {
        alert(err);
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
          loading ...
        </div>
      );
    }
    return (
      <div style={{ flex: 1 }}>
        <Header back history={this.props.history} title="Users" />
        {this.state.users.length === 0 && (
          <div
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            No users found
          </div>
        )}
        {this.state.users.length !== 0 && (
          <div>
            {this.state.users.map((user, index) => (
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
                  <div>Username: {user.username}</div>
                  <div>{user.firstname + " " + user.lastname}</div>
                </div>
                <IoMdTrash
                  onClick={() => {
                    const quetion = window.confirm(
                      "Are you sure to delete this user: " + user.username
                    );
                    quetion &&
                      WebServices.deleteUser(user.id).then(res => {
                        alert("User deleted success");
                        this.init();
                      });
                  }}
                  color="red"
                  size={32}
                />
                <IoIosEye
                  onClick={() =>
                    this.props.history.push("/users/edit/" + user.id)
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
            onClick={() => this.props.history.push("/users/add")}
          />
        </Fabs>
      </div>
    );
  }
}

class Add extends React.Component {
  state = {
    id: 0,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    tel: "",
    role: "admin",
    is_active: true,
    img1: "123456789",
    img2: "123456789",
    img3: "123456789"
  };
  _create() {
    WebServices.addUser({ ...this.state })
      .then(res => {
        alert("user created success");
        this.props.history.replace("/users");
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <div>
        <Header back history={this.props.history} title="Add user" />
        <div>
          <Label label="Username">
            <input
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              value={this.state.username}
              placeholder="username"
            />
          </Label>
          <Label label="Password">
            <input
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              value={this.state.password}
              type="password"
              placeholder="password"
            />
          </Label>
          <Label label="firstname">
            <input
              onChange={e => {
                this.setState({ firstname: e.target.value });
              }}
              value={this.state.firstname}
              placeholder="firstname"
            />
          </Label>
          <Label label="lastname">
            <input
              onChange={e => {
                this.setState({ lastname: e.target.value });
              }}
              value={this.state.lastname}
              placeholder="lastname"
            />
          </Label>
          <Label label="Tel">
            <input
              onChange={e => {
                this.setState({ tel: e.target.value });
              }}
              value={this.state.tel}
              placeholder="tel"
            />
          </Label>
          <Label label="Role">
            <select
              onChange={e => {
                this.setState({ role: e.target.value });
              }}
              value={this.state.role}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </Label>
          <Label label="Is active">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ is_active: e.target.checked });
              }}
              checked={this.state.is_active}
              placeholder="is_active"
            />
          </Label>
          <button onClick={() => this._create()}>Create</button>
        </div>
      </div>
    );
  }
}

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      tel: "",
      role: "user",
      is_active: true,
      img1: "123456789",
      img2: "123456789",
      img3: "123456789",
      loading: true
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    WebServices.getUser(id)
      .then(res => {
        const data = res.data.data;
        this.setState({ ...data, loading: false });
      })
      .catch(err => {
        alert(err);
        this.setState({ loading: false });
      });
  }
  _update() {
    WebServices.editUser({ ...this.state })
      .then(res => {
        alert("user updated success");
        this.props.history.replace("/users");
      })
      .catch(err => {
        alert(err);
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
          loading ...
        </div>
      );
    }
    return (
      <div>
        <Header back history={this.props.history} title="Edit user" />
        <div>
          <Label label="Username">
            <input
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              value={this.state.username}
              placeholder="username"
            />
          </Label>
          <Label label="Password">
            <input
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              value={this.state.password}
              type="password"
              placeholder="password"
            />
          </Label>
          <Label label="firstname">
            <input
              onChange={e => {
                this.setState({ firstname: e.target.value });
              }}
              value={this.state.firstname}
              placeholder="firstname"
            />
          </Label>
          <Label label="lastname">
            <input
              onChange={e => {
                this.setState({ lastname: e.target.value });
              }}
              value={this.state.lastname}
              placeholder="lastname"
            />
          </Label>
          <Label label="Tel">
            <input
              onChange={e => {
                this.setState({ tel: e.target.value });
              }}
              value={this.state.tel}
              placeholder="tel"
            />
          </Label>
          <Label label="Role">
            <select
              onChange={e => {
                this.setState({ role: e.target.value });
              }}
              value={this.state.role}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </Label>
          <Label label="Is active">
            <input
              type="checkbox"
              onChange={e => {
                this.setState({ is_active: e.target.checked });
              }}
              checked={this.state.is_active}
              placeholder="is_active"
            />
          </Label>
          <button onClick={() => this._update()}>Update</button>
        </div>
      </div>
    );
  }
}

class Users extends React.Component {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <Route exact path="/users" component={All} />
        <Route path="/users/add" component={Add} />
        <Route path="/users/edit/:id" component={Edit} />
      </div>
    );
  }
}

export default Users;
