import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Form from "./Form.jsx";
import List from "./List.jsx";

class Usuarios extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/usuarios"
          render={props => (
            <List
              {...props}
            />
          )}
          key="0"
        />
        <Route
          path={`/admin/usuarios/edit/:id`}
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

export default Usuarios;
