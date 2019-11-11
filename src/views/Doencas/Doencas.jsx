import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import TableList from "../TableList.jsx";

class Doencas extends Component {
  state = {
    head: [],
    list: [],
    path: ''
  };

  componentDidMount() {
    const thArray = ["ID", "Nome", "Descrição", "Ações"];
    const tdArray = [
      ["1", "Diabetes", "Lorem ipsum door sit amet, lorem ipsum dolor sit amet"],
      ["2", "Apendicite", "Curaçao"],
      ["3", "Câncer de mama", "Netherlands"],
      ["4", "Câncer de pele", "Korea, South"],
      ["5", "Obesidade", "Malawi"]
    ];
    const path = '/admin/doencas';

    this.setState({head: thArray, list: tdArray, path: path});
  }

  render() {
    const {head, list, path} = this.state;
  
    return (
      <TableList addBtn={true} addBtnLink="./doencas/add" delAction={this.delete} title="Doenças" tdArray={list} thArray={head} path={path} />
    );
  }
}

export default Doencas;
