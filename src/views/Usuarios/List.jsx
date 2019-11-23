import React, { Component } from "react";

import TableList from "../TableList.jsx";

import Swal from 'sweetalert2';

import api from "../../services/api";

class Usuarios extends Component {
  state = {
    head: [],
    list: [],
    path: '/admin/usuarios'
  };

  delete = async (id) => {
    Swal.fire({
      title: 'Atenção!',
      text: 'Quando um registro é excluído, não é possível realizar a sua restauração no futuro. Tem certeza que deseja continuar?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
    }).then(confirm => {
      if (confirm.value) {
        try {
          (async () => {
            await api.delete('/users/' + id);

            this.loadData();

            Swal.fire({
              icon: 'success'
            });
          })();
        } catch (e) {
          console.log(e.response);
        }
      }
    })
  }

  loadData = async () => {
    const res = await api.get('/users');

    let tdArray = [];

    res.data.map((item) => {
      tdArray.push([item._id, item.name, item.age]);
    });

    this.setState({ list: tdArray });
  }

  async componentDidMount() {
    const thArray = ["Id", "Nome", "Idade", "Ações"];

    this.loadData();

    this.setState({ head: thArray });
  }

  render() {
    const { head, list, path } = this.state;

    return (
      <TableList delAction={this.delete} title="Usuarios" tdArray={list} thArray={head} path={path} />
    );
  }
}

export default Usuarios;
