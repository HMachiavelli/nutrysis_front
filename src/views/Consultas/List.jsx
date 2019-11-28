import React, { Component } from "react";

import TableList from "../TableList.jsx";

import Swal from 'sweetalert2';

import api from "../../services/api";
import notify from "../../services/notify";

class Consultas extends Component {
  state = {
    head: [],
    list: [],
    path: '/admin/consultas'
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
            await api.delete('/consultings/' + id);

            this.loadData();

            Swal.fire({
              icon: 'success'
            });
          })();
        } catch (e) {
          notify.error('Houve um problema ao conectar!', 'Atenção!');
        }
      }
    })
  }

  loadData = async () => {
    const res = await api.get('/consultings');

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
      <TableList addBtn={true} addBtnLink={path + "/add"} delAction={this.delete} title="Consultas" tdArray={list} thArray={head} path={path} />
    );
  }
}

export default Consultas;
