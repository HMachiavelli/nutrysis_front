import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/face-0.jpg";

import api from '../../services/api';
import notify from '../../services/notify';

class Form extends Component {
  state = {
    name: '',
    email: '',
    gender: '',
    phone: '',
    cpf: '',
    loading: false
  };

  componentDidMount() {
    let pathArray = window.location.pathname.split('/');

    const id = pathArray[pathArray.length - 1];

    if (id) {
      this.get(id);
    }
  }

  get = async id => {
    try {
      const res = await api.get('/users/' + id);

      this.setState({
        id: id,
        name: res.data.name,
        email: res.data.email,
        age: res.data.age,
        gender: res.data.gender,
        phone: res.data.phone,
        type: res.data.type,
        cpf: res.data.cpf
      });
    } catch (e) {
      console.log(e.response);
    }
  }

  handleSend = async () => {
    this.setState({ loading: true });

    try {
      let res;
      if (this.state.id) {
        res = await api.put('/users/' + this.state.id, this.state);
      } else {
        res = await api.post('/users', this.state);
      }

      console.log(res);

      this.setState({ loading: false });
      window.location.href = '/admin/usuarios';
    } catch (error) {
      notify.error('Houve um problema ao cadastrar', 'Atenção!');
      this.setState({ loading: false });
    }
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  }
  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  }
  handlePhoneChange = evt => {
    this.setState({ phone: evt.target.value });
  }
  handleCpfChange = evt => {
    this.setState({ cpf: evt.target.value });
  }
  handleDateChange = evt => {
    this.setState({ age: this.calculateAge(evt.target.value) });
  }
  handleGenderChange = evt => {
    this.setState({ gender: evt.target.value });
  }

  render() {
    const { name, email, gender, phone, cpf } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={this.props.title}
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Nome",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nome",
                          value: name,
                          onChange: this.handleNameChange
                        },
                        {
                          label: "Email",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          value: email,
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
                          value: phone,
                          onChange: this.handlePhoneChange
                        },
                        {
                          label: "CPF",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Seu CPF...",
                          value: cpf,
                          onChange: this.handleCpfChange
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <ControlLabel>Gênero</ControlLabel>
                          <FormControl value={gender} onChange={this.handleGenderChange.bind(this)} componentClass="select">
                            <option value="" disabled>Selecione o gênero...</option>
                            <option value="masc">Masculino</option>
                            <option value="fem">Feminino</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button bsStyle="primary" pullRight fill type="submit" onClick={this.handleSend} disabled={this.state.loading}>
                      {this.state.loading ? 'Aguarde...' : 'Salvar'}
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqPL0P2ZzX1oynKmDgwP-l62k96xHNhAYCpWuu41bZKUlU1Hia"
                avatar={avatar}
                name={name}
                userName={email}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Form;
