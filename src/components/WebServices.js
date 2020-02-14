import axios from 'axios';

class WebServices {
  constructor() {
    this.domain = 'http://angela-server.epizy.com/api';
    this.user = null;
    this.id_token = "token"
  }

  setUser(user) {
    this.user = user;
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    /* return this.fetch('auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(res => {
      this.setToken(res.data.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });*/
    return this._axios()
      .post('/auth/login', {
        username,
        password,
      })
      .then(res => {
        console.dir(res)
        this.setToken(res.data.data.token); // Setting the token in localStorage
        return Promise.resolve(res);
      });
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  setToken(id_token) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', id_token);
    this.id_token = id_token;
    console.log('setToken' + id_token);
  }

  getToken() {
    // Retrieves the user token from localStorage
    const id_token = localStorage.getItem('id_token');
    console.log('getToken ' + id_token);
    this.id_token = id_token;
    return id_token;
  }

  async getProfile() {
    // Using jwt-decode npm package to decode the token
    //console.log(decode(this.getToken()));
    //return decode(this.getToken());
    return this._axios()
      .get('/auth/me')
      .then(res => {
        this.setUser(res.data);
        return Promise.resolve(res);
      });
  }

  async getUsers() {
    // Using jwt-decode npm package to decode the token
    //console.log(decode(this.getToken()));
    //return decode(this.getToken());
    return this._axios().get('/auth/users');
  }

  async getUser(id) {
    return this._axios().get('/auth/users/' + id);
  }

  async deleteUser(id) {
    return this._axios().delete('/auth/users/' + id);
  }

  async addUser(user) {
    return this._axios().post('/auth/users', {...user}).then(res => {
      return Promise.resolve(res);
    });
  }

  async editUser(user) {
    return this._axios().put('/auth/users/' + user.id, {...user})
  }

  async getFarmers() {
    // Using jwt-decode npm package to decode the token
    //console.log(decode(this.getToken()));
    //return decode(this.getToken());
    return this._axios().get('/farmers');
  }

  async getFarmer(id) {
    return this.fetch('/farmers/' + id, {
      method: 'GET',
    });
  }

  async deleteFarmer(id) {
    return this.fetch('/farmers/' + id, {
      method: 'DELETE',
    });
  }

  async addFarmer(state) {
    return this._axios().post('/farmers/' , {...state});
  }

  async editFarmer(
    id,
    username,
    password,
    firstname,
    lastname,
    tel,
    role,
    img1,
    img2,
    img3
  ) {
    return this.fetch('auth/farmers/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        username,
        password,
        firstname,
        lastname,
        tel,
        role,
        img1,
        img2,
        img3,
      }),
    }).then(res => {
      this.setToken(res.data.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.id_token,
    };

    return fetch(`${this.domain}/${url}`, {
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _axios(options) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.getToken(),
    };

    return axios.create({
      baseURL: this.domain,
      headers,
      ...options,
    });
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}

const WebServicesInstance = new WebServices();
export default WebServicesInstance;
