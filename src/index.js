import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import Login from "layouts/Login.jsx";

let user = sessionStorage.getItem('user');

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route render={props => (user && user.token ? <Login {...props} /> : <AdminLayout {...props} />)} />
      <Redirect from="/" to={user && user.token ? "/login/access" : "/admin/dashboard"} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
