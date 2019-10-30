import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import FormInputs from "components/FormInputs/FormInputs";
import Button from "components/CustomButton/CustomButton";

import routes from "routes.js";

import logo from "assets/img/reactlogo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: ''
    };
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
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper" className="login-background">
        <div id="login-panel" className="login-panel" ref="loginPanel">
          <div className="logo">
            <a href="https://www.creative-tim.com?ref=lbd-sidebar" className="simple-text logo-mini">
              <div className="logo-img">
                <img src={logo} alt="logo_image" />
              </div>
            </a>
          </div>

          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Usuário",
                type: "text",
                bsClass: "form-control",
                placeholder: "Usuário",
                disabled: false
              }
            ]}
          />

          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Senha",
                type: "password",
                bsClass: "form-control",
                placeholder: "Senha",
                disabled: false
              }
            ]}
          />

          <Button bsStyle="success" pullRight fill type="submit">
            Entrar
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
