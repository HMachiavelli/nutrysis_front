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

import avatar from "assets/img/faces/face-3.jpg";

import api from '../../services/api';

class Form extends Component {
  state = {
    paciente: {
      name: '',
      email: ''
    },
    nutricionista: {
      name: '',
      email: ''
    },
    pacientes: [],
    nutricionistas: [],
    consulta: {
      patientId: '',
      nutritionistId: '',
      date: '',
      observation: ''
    },
    loading: false
  };

  async componentDidMount() {
    let pathArray = window.location.pathname.split('/');

    const id = pathArray[pathArray.length - 1];

    this.getAllPacientes();
    this.getAllNutricionistas();

    if (id) {
      this.get(id);
    }
  }

  get = async id => {
    try {
      const res = await api.get('/consultings/' + id);

      const date = res.data.date.split('T')[0];

      this.setState({
        consulta: {
          id: res.data._id,
          patientId: res.data.patientId,
          nutritionistId: res.data.nutritionistId,
          date: date,
          observation: res.data.observation
        }
      });

      this.getPaciente(this.state.consulta.patientId);
      this.getNutricionista(this.state.consulta.nutritionistId);

    } catch (e) {
      console.log(e.response);
    }
  }

  getPaciente = async id => {
    try {
      const res = await api.get('/users/' + id);

      this.setState({
        paciente: {
          name: res.data.name,
          email: res.data.email
        }
      });
    } catch (e) {
      console.log(e.response);
    }
  }

  getNutricionista = async id => {
    try {
      const res = await api.get('/users/' + id);

      this.setState({
        nutricionista: {
          name: res.data.name,
          email: res.data.email
        }
      });
    } catch (e) {
      console.log(e.response);
    }
  }

  getAllPacientes = async () => {
    try {
      const res = await api.get('/pacients/');

      let pacientes = [];

      res.data.map((item) => {
        pacientes.push({
          id: item._id,
          name: item.name,
          age: item.age,
          gender: item.gender
        });
      });

      this.setState({
        pacientes: pacientes
      });
    } catch (e) {
      console.log(e.response);
    }
  }

  getAllNutricionistas = async () => {
    try {
      const res = await api.get('/nutritionists/');

      let nutricionistas = [];

      res.data.map((item) => {
        nutricionistas.push({
          id: item._id,
          name: item.name,
          age: item.age,
          gender: item.gender
        });
      });

      this.setState({
        nutricionistas: nutricionistas
      });
    } catch (e) {
      console.log(e.response);
    }
  }

  handleSend = async () => {
    this.setState({ loading: true });

    try {
      let res;

      if (this.state.consulta) {
        res = await api.put('/consultings/' + this.state.consulta.id, this.state.consulta);
      } else {
        res = await api.post('/consultings', this.state.consulta);
      }

      console.log(res);

      this.setState({ loading: false });

      window.location.href = '/admin/consultas';
    } catch (error) {
      console.log(error.response);
      this.setState({ loading: false });
    }
  }

  handleDateChange = evt => {
    let consulta = {...this.state.consulta};
    consulta.date = evt.target.value;

    this.setState({ consulta: consulta });
  }
  handleObservationChange = evt => {
    let consulta = {...this.state.consulta};
    consulta.observation = evt.target.value;

    this.setState({ consulta: consulta });
  }
  handleNutricionistaChange = evt => {
    if (!evt.target) return;

    this.getNutricionista(evt.target.value);

    let consulta = {...this.state.consulta};
    consulta.nutritionistId = evt.target.value;

    this.setState({ consulta: consulta });
  }
  handlePacienteChange = evt => {
    if (!evt.target) return;

    this.getPaciente(evt.target.value);

    let consulta = {...this.state.consulta};
    consulta.patientId = evt.target.value;

    this.setState({ consulta: consulta });
  }

  render() {
    const { paciente, nutricionista, nutricionistas, pacientes, consulta } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title={this.props.title}
                content={
                  <form>

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <ControlLabel>Nutricionista</ControlLabel>
                          <FormControl value={consulta.nutritionistId} onChange={this.handleNutricionistaChange.bind(this)} componentClass="select">
                            <option value="">Selecione um nutricionista...</option>
                            {nutricionistas.map((e, key) => {
                              return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <ControlLabel>Paciente</ControlLabel>
                          <FormControl value={consulta.patientId} onChange={this.handlePacienteChange.bind(this)} componentClass="select">
                            <option value="">Selecione um paciente...</option>
                            {pacientes.map((e, key) => {
                              return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Data",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Data",
                          value: consulta.date,
                          onChange: this.handleDateChange
                        },
                        {
                          label: "Observação",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Observação",
                          value: consulta.observation,
                          onChange: this.handleObservationChange
                        }
                      ]}
                    />

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
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={nutricionista.name}
                userName={nutricionista.email}
              />
            </Col>

            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={paciente.name}
                userName={paciente.email}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Form;
