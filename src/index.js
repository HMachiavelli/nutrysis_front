import React from "react";
import ReactDOM from "react-dom";

import { NotificationContainer } from 'react-notifications';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import 'react-notifications/lib/notifications.css';

import AdminLayout from "layouts/Admin.jsx";
import Login from "layouts/Login.jsx";

import session from 'services/session';

let user = session.load('user');

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to={(user && user.token ? "/admin/dashboard" : "/login/access/")} />
      <Route render={props => (user && user.token ? <AdminLayout {...props} /> : <Login {...props} />)} />
    </Switch>
    
    <NotificationContainer />
  </BrowserRouter>,
  document.getElementById("root")
);
