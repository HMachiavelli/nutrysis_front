import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Form from "./Form.jsx";
import List from "./List.jsx";

class Pacientes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/pacientes"
          render={props => (
            <List
              {...props}
            />
          )}
          key="0"
        />
        <Route
          path={`/admin/pacientes/edit/:id`}
          render={props => (
            <Form
              {...props}
            />
          )}
          key="1"
        />
      </Switch>
    );
  }
}

export default Pacientes;
