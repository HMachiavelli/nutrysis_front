import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import logo from "assets/img/reactlogo.png";

import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from '../services/api';
import session from '../services/session';

class Access extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    error: ''
  };

  handleSend = async () => {
    this.setState({ loading:true });

    const data = this.state;
    
    try {
      const res = await api.post('/signin', data);

      const user = res.data;

      session.save('user', user);
      
      this.setState({ loading: false });

      window.location.href = '/';
    } catch(error) {
      this.setState({ loading: false, error: error.response.data });
    }
  };

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
                disabled: false,
                onChange: input => {this.setState({email: input.target.value})}
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
                disabled: false,
                onChange: input => {this.setState({password: input.target.value})}
              }
            ]}
          />

          <p className="error-login">{this.state.error}</p>

          <NavLink to={'/login/register'}>
            <Button disabled={this.state.loading} bsStyle="primary" pullLeft fill type="button">
              Criar conta
            </Button>
          </NavLink>
          <Button disabled={this.state.loading} bsStyle="success" pullRight fill type="button" onClick={this.handleSend}>
            {this.state.loading ? 'Aguarde...' : 'Entrar'}
          </Button>
        </div>
    );
  }
}

export default Access;
