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
import session from '../../services/session';

class Form extends Component {
  state = {
    name: '',
    dateDiscovery: '',
    observation: '',
    loading: false
  };

  handleSend = async () => {
    this.setState({loading: true});

    try {
      const res = await api.post('/diseases', this.state);

      this.setState({loading: false});
      window.location.href = '/admin/doencas';
    } catch(error) {
      console.log(error.response);
      this.setState({loading: false});
    }
  }

  handleNameChange = input => {
    this.setState({name: input.target.value});
  }
  handleDateChange = input => {
    this.setState({dateDiscovery: input.target.value});
  }
  handleObsChange = input => {
    this.setState({observation: input.target.value});
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={this.props.title}
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Nome",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Nome da doença",
                          onChange: this.handleNameChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Data da descoberta",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Data em que foi descoberta a doença",
                          onChange: this.handleDateChange
                        }
                      ]}
                    />

                    <Col md={12}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Observações</ControlLabel>
                        <FormControl
                          rows="4"
                          componentClass="textarea"
                          bsClass="form-control"
                          placeholder="Preencha aqui as observações sobre a doença"
                          onChange={this.handleObsChange}
                        />
                      </FormGroup>
                    </Col>

                    <Button bsStyle="info" disabled={this.state.loading} pullRight fill type="button" onClick={this.handleSend}>
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
