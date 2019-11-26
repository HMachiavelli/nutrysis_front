import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Row,
  Col
} from "react-bootstrap";

import logo from "assets/img/reactlogo.png";

import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from '../services/api';
import session from '../services/session';

class Access extends Component {
  state = {
    email: '',
    loading: false,
    msgSuccess: '',
    error: ''
  };

  handleSend = async () => {
    this.setState({ loading:true });

    const data = this.state;

    try {
      const res = await api.post('/forgot_password', {email: data.email});

      this.setState({loading: false, msgSuccess: 'Confira o seu e-mail para prosseguir', email: ''});
    } catch(error) {
      this.setState({ loading: false, error: error.response.data });
    }
  };

  render() {
    return (
      <div id="login-panel" className="login-panel content">
          <div className="logo">
            <a href="/login/access" className="simple-text logo-mini">
              <div className="logo-img">
                <img src={logo} alt="logo_image" />
              </div>
            </a>
          </div>

          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "E-mail cadastrado",
                type: "text",
                bsClass: "form-control",
                placeholder: "Seu e-mail cadastrado no sistema",
                disabled: false,
                onChange: input => {this.setState({email: input.target.value})}
              }
            ]}
          />

          <p className="error-login">{this.state.error}</p>
          <p className="success-login">{this.state.msgSuccess}</p>

          <Row>
            <Col md={12}>
              <NavLink to={'/login/access'}>
                <Button disabled={this.state.loading} bsStyle="default" fill type="button">
                  Voltar
                </Button>
              </NavLink>
              <Button disabled={this.state.loading} bsStyle="success" pullRight fill type="button" onClick={this.handleSend}>
                {this.state.loading ? 'Aguarde...' : 'Recuperar senha'}
              </Button>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Access;
