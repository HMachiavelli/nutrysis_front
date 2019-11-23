import React, { Component } from "react";

import TableList from "../TableList.jsx";

import Swal from 'sweetalert2';

import api from "../../services/api";

class Doencas extends Component {
  state = {
    head: [],
    list: [],
    path: '/admin/doencas'
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
            await api.delete('/diseases/' + id);

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
    const res = await api.get('/diseases');

    let tdArray = [];

    res.data.map((item) => {
      let date = new Date(item.dateDiscovery.split('T')[0]);
      tdArray.push([item._id, item.name, date.toLocaleDateString('pt-BR')]);
    });

    this.setState({ list: tdArray });
  }

  async componentDidMount() {
    const thArray = ["Id", "Nome", "Data descoberta", "Ações"];

    this.loadData();

    this.setState({ head: thArray });
  }

  render() {
    const { head, list, path } = this.state;

    return (
      <TableList addBtn={true} addBtnLink={path + "/add"} delAction={this.delete} title="Doenças" tdArray={list} thArray={head} path={path} />
    );
  }
}

export default Doencas;
