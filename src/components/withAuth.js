import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WebServices from './WebServices';

export default function withAuth(AuthComponent) {
  return withRouter(
    class AuthWrapped extends Component {
      constructor() {
        super();
        this.state = {
          user: null,
          loading: true,
        };
      }
      componentDidMount() {
        //const token = await WebServices.getToken();
        WebServices.getProfile()
          .then(res => {
            console.log('res' + res);
            res &&
              this.setState({
                user: res.data.data,
              });
            this.setState({ loading: false });
          })
          .catch(err => {
            //WebServices.logout()
            this.props.history.replace('/login');
            this.setState({ loading: false });
          });

      }

      render() {
        if (this.state.loading) {
          return (
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex:1
              }}>
              loading ...
            </div>
          );
        }
        return <AuthComponent user={this.state.user} />;
      }
    }
  );
}
