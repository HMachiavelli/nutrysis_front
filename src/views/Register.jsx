import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import {
  Row,
  Col,
  PageHeader,
  FormControl,
  FormGroup,
  ControlLabel
} from "react-bootstrap";

import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import api from '../services/api';

class Register extends Component {
  state = {
    name: '',
    email: '',
    gender: '',
    phone: '',
    age: '',
    cpf: '',
    password: '',
    confPassword: '',
    loading: false,
    error: {}
  };

  calculateAge = date => {
    var today = new Date();
    var birthDate = new Date(date);
    var ageNow = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageNow--;
    }

    return ageNow;
  }

  handleSend = async () => {
    this.setState({loading: true});

    console.log(this.state);

    await api.post('/users', this.state);//aguardando ajustes na api
    this.setState({loading: false});
  }

  handleNameChange = evt => {
    this.setState({name: evt.target.value});
  }
  handleEmailChange = evt => {
    this.setState({email: evt.target.value});
  }
  handlePhoneChange = evt => {
    this.setState({phone: evt.target.value});
  }
  handleCpfChange = evt => {
    this.setState({cpf: evt.target.value});
  }
  handleDateChange = evt => {
    this.setState({age: this.calculateAge(evt.target.value)});
  }
  handleGenderChange = evt => {
    this.setState({gender: evt.target.value});
  }
  handlePasswordChange = evt => {
    this.setState({password: evt.target.value});
  }
  handleConfPasswordChange = evt => {
    this.setState({confPassword: evt.target.value});
  }

  render() {
    return (
      <div className="content">
          <Row>
            <Col md={12}>
            <PageHeader>
              Criar uma conta no Nutrysis
            </PageHeader>
              <div className="login-panel">
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  properties={[
                    {
                      label: "Nome",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Seu nome completo...",
                      onChange: this.handleNameChange
                    },
                    {
                      label: "E-mail",
                      type: "email",
                      bsClass: "form-control",
                      placeholder: "Seu melhor e-mail...",
                      onChange: this.handleEmailChange
                    }
                  ]}
                />
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  properties={[
                    {
                      label: "Telefone",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Seu telefone...",
                      onChange: this.handlePhoneChange
                    },
                    {
                      label: "CPF",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "Seu CPF...",
                      onChange: this.handleCpfChange
                    }
                  ]}
                />

                <FormInputs
                  ncols={["col-md-12"]}
                  properties={[
                    {
                      label: "Data de Nascimento",
                      type: "date",
                      bsClass: "form-control",
                      placeholder: "Sua data de nascimento...",
                      onChange: this.handleDateChange
                    }
                  ]}
                />

                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <ControlLabel>Gênero</ControlLabel>
                      <FormControl onChange={this.handleGenderChange.bind(this)} componentClass="select">
                        <option value="" selected disabled>Selecione o gênero...</option>
                        <option value="masc">Masculino</option>
                        <option value="fem">Feminino</option>
                      </FormControl>
                    </FormGroup>
                  </Col>
                </Row>

                <FormInputs
                  ncols={["col-md-6", 'col-md-6']}
                  properties={[
                    {
                      label: "Senha de acesso",
                      type: "password",
                      bsClass: "form-control",
                      onChange: this.handlePasswordChange
                    },
                    {
                      label: "Confirmar senha",
                      type: "password",
                      bsClass: "form-control",
                      onChange: this.handleConfPasswordChange
                    }
                  ]}
                />

                <NavLink to={'/login/access'}>
                  <Button bsStyle="default" pullLeft fill type="button" disabled={this.state.loading}>
                    Voltar
                  </Button>
                </NavLink>
                <Button onClick={this.handleSend} bsStyle="info" pullRight fill type="button" disabled={this.state.loading}>
                  {this.state.loading ? 'Aguarde...' : 'Criar'}
                </Button>
                <div className="clearfix" />
              </div>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Register;
