import React, { Component } from "react";
import { Grid, Row, Col, Table, Button, ButtonToolbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";

import Card from "components/Card/Card.jsx";

class TableList extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={this.props.title}
                category={this.props.subtitle}
                addBtn={this.props.addBtn}
                addBtnLink={this.props.addBtnLink}
                ctTableFullWidth
                ctTableResponsive
                ctTableUpgrade
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {this.props.thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td style={{textAlign:'left'}} key={key}>{prop}</td>;
                            })}

                            <td key="action" width="190">
                              <ButtonToolbar>
                                <Button bsStyle="primary" bsSize="small">
                                  <NavLink to={this.props.path + "/edit/" + prop[0]}>
                                    Editar <i className="pe-7s-note" />
                                  </NavLink>
                                </Button>

                                <Button bsStyle="primary" bsSize="small">
                                  <a href="#" onClick={() => this.props.delAction(prop[0])}>
                                    Excluir <i className="pe-7s-trash" />
                                  </a>
                                </Button>
                              </ButtonToolbar>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
