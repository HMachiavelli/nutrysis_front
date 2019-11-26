import React, { Component } from "react";

import TableList from "../TableList.jsx";

import Swal from 'sweetalert2';

import api from "../../services/api";

class Consultas extends Component {
  state = {
    head: [],
    list: [],
    path: '/admin/exames'
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
            await api.delete('/exams/' + id);

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
    const res = await api.get('/exams');

    let tdArray = [];

    const list = res.data.map(async item => {
      const patient = await api.get('/users/' + item.patientId);
      const prioridades = ['', 'Baixa', 'Normal', 'Alta', 'Urgente']

      let date = new Date(item.date.split('T')[0]);
      tdArray.push([item._id, item.name, patient.data.name, prioridades[item.priority], date.toLocaleDateString('pt-BR')]);
    });

    Promise.all(list).then(() => this.setState({ list: tdArray }));
  }

  async componentDidMount() {
    const thArray = ["Id", "Exame", "Paciente", "Prioridade", "Data", "Ações"];

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
