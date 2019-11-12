import React, { Component } from "react";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";

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
                              return <td key={key}>{prop}</td>;
                            })}

                            <td key="action">
                              <NavLink classList="table-action" to={this.props.path + "/edit/" + prop[0]}><i className="pe-7s-note" /></NavLink>
                              <a classList="table-action" href="#" onClick={() => this.props.delAction(prop[0])}><i className="pe-7s-trash" /></a>
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
