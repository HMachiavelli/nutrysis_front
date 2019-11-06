import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class Access extends Component {
  render() {
    return (
      <div id="login-panel" className="login-panel content">
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

          <NavLink to={'/login/register'}>
            <Button bsStyle="primary" pullLeft fill type="button">
              Criar conta
            </Button>
          </NavLink>
          <Button bsStyle="success" pullRight fill type="submit">
            Entrar
          </Button>
        </div>
    );
  }
}

export default Access;
