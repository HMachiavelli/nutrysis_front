import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import TableList from "../TableList.jsx";
import Form from "./Form.jsx";

import Swal from 'sweetalert2';

import api from "../../services/api";
import session from "../../services/session";

class Doencas extends Component {
  state = {
    head: [],
    list: [],
    path: ''
  };

  delete = async () => {
    Swal.fire({
      title: 'Atenção!',
      text: 'Quando um registro é excluído, não é possível realizar a sua restauração no futuro. Tem certeza que deseja continuar?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then(confirm => {
      if (confirm.value) {
        Swal.fire('ok');
      }
    })
  }

  async componentDidMount() {
    const res = await api.get('/diseases');

    console.log(res);

    const thArray = ["ID", "Nome", "Data descoberta", "Ações"];
    let tdArray = [];

    res.data.map((item, key) => {
      let date = new Date(item.dateDiscovery);

      console.log(date);
      date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      tdArray.push([(key+1), item.name, date]);
    });

    const path = '/admin/doencas';

    this.setState({head: thArray, list: tdArray, path: path});
  }

  render() {
    const {head, list, path} = this.state;
  
    return (
      <TableList addBtn={true} addBtnLink="/admin/doencas/add" delAction={this.delete} title="Doenças" tdArray={list} thArray={head} path={path} />
    );
  }
}

export default Doencas;
