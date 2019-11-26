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
import Button from "components/CustomButton/CustomButton.jsx";

import api from '../../services/api';

class Form extends Component {
  state = {
    pacientes: [],
    prioridades: [],
    exame: {
      patientId: '',
      name: '',
      priority: '',
      date: ''
    },
    loading: false
  };

  async componentDidMount() {
    let pathArray = window.location.pathname.split('/');

    const id = pathArray[pathArray.length - 1];

    this.getAllPacientes();
    this.getPrioridades();

    if (id && id != '' && id != 'add') {
      this.get(id);
    }
  }

  get = async id => {
    try {
      const res = await api.get('/exams/' + id);

      const date = res.data.date.split('T')[0];

      this.setState({
        exame: {
          id: res.data._id,
          patientId: res.data.patientId,
          date: date,
          priority: res.data.priority,
          name: res.data.name
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
          name: item.name
        });
      });

      this.setState({
        pacientes: pacientes
      });
    } catch (e) {
      console.log(e.response);
    }
  }

  getPrioridades = () => {
    this.setState({prioridades: [{id: 1, name: 'Baixa'}, {id: 2, name: 'Normal'}, {id: 3, name: 'Alta'}, {id: 4, name: 'Urgente'}]});
  }

  handleSend = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    try {
      let res;
      if (this.state.exame && this.state.exame.id) {
        res = await api.put('/exams/' + this.state.exame.id, this.state.exame);
      } else {
        res = await api.post('/exams', this.state.exame);
      }

      this.setState({ loading: false });

      window.location.href = '/admin/exames';
    } catch (error) {
      console.log(error.response);
      this.setState({ loading: false });
    }
  }

  handleDateChange = evt => {
    let exame = {...this.state.exame};
    exame.date = evt.target.value;

    this.setState({ exame: exame });
  }
  handleNameChange = evt => {
    let exame = {...this.state.exame};
    exame.name = evt.target.value;

    this.setState({ exame: exame });
  }
  handlePriorityChange = evt => {
    let exame = {...this.state.exame};
    exame.priority = evt.target.value;

    this.setState({ exame: exame });
  }
  handlePacienteChange = evt => {
    if (!evt.target) return;

    let exame = {...this.state.exame};
    exame.patientId = evt.target.value;

    this.setState({ exame: exame });
  }

  render() {
    const { pacientes, prioridades, exame } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={this.props.title}
                content={
                  <form>

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <ControlLabel>Paciente</ControlLabel>
                          <FormControl value={exame.patientId} onChange={this.handlePacienteChange.bind(this)} componentClass="select">
                            <option value="">Selecione um paciente...</option>
                            {pacientes.map((e, key) => {
                              return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Descrição do exame",
                          type: "name",
                          bsClass: "form-control",
                          placeholder: "Descrição ou nome do exame a ser feito",
                          value: exame.name,
                          onChange: this.handleNameChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Data",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Data",
                          value: exame.date,
                          onChange: this.handleDateChange
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <ControlLabel>Prioridade</ControlLabel>
                          <FormControl value={exame.priority} onChange={this.handlePriorityChange.bind(this)} componentClass="select">
                            <option value="">Selecione a prioridade desse exame...</option>
                            {prioridades.map((e, key) => {
                              return <option key={key} value={e.id}>{e.name}</option>;
                            })}
                          </FormControl>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button bsStyle="primary" pullRight fill type="submit" onClick={e => this.handleSend(e)} disabled={this.state.loading}>
                      {this.state.loading ? 'Aguarde...' : 'Salvar'}
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Form;
