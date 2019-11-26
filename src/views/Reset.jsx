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
    password: '',
    confPassword: '',
    token: '',
    error: ''
  };

  handleSend = async () => {
    this.setState({ loading:true });

    const data = this.state;

    try {
      const res = await api.post('/reset_password/' + data.token, data);

      this.setState({ loading: false });

      window.location.href = '/login/access';
    } catch(error) {
      this.setState({ loading: false, error: error.response.data });
    }
  };

  componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');

    if(!email || !token || email === '' || token === '') {
      window.location.href='/login/access';
    }

    this.setState({email: email, token: token});
  }

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
                value: this.state.email,
                bsClass: "form-control",
                placeholder: "Seu e-mail cadastrado no sistema",
                disabled: true
              }
            ]}
          />
          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Nova senha",
                type: "password",
                value: this.state.password,
                bsClass: "form-control",
                placeholder: "Sua nova senha para acesso ao sistema",
                disabled: false,
                onChange: evt => {this.setState({password: evt.target.value})}
              }
            ]}
          />
          <FormInputs
            ncols={["col-md-12"]}
            properties={[
              {
                label: "Confirme a senha",
                type: "password",
                value: this.state.confPassword,
                bsClass: "form-control",
                placeholder: "Confirme a sua nova senha",
                disabled: false,
                onChange: evt => {this.setState({confPassword: evt.target.value})}
              }
            ]}
          />

          <p className="error-login">{this.state.error}</p>

          <Row>
            <Col md={12}>
              <Button disabled={this.state.loading} bsStyle="success" pullRight fill type="button" onClick={this.handleSend}>
                {this.state.loading ? 'Aguarde...' : 'Alterar senha'}
              </Button>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Access;
