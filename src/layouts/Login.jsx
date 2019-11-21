import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Access from "views/Access";
import Register from "views/Register";

import session from 'services/session';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    };
  }

  getRoutes = () => {
    return [{key: 'register', component: Register}, {key:'access', component: Access}].map((prop, key) => {
      return (
        <Route
          path={'/login/' + prop.key}
          render={props => (
            <prop.component
              {...props}
            />
          )}
          key={key}
        />
      );
    });
  };

  componentDidMount() {
    const user = session.load('user');

    if(user && user.token) {
      window.location.href = './admin/dashboard';
    }
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }

  render() {
    return (
      <div className="wrapper login-background">
        <Switch>{this.getRoutes()}</Switch>
      </div>
    );
  }
}

export default Login;
