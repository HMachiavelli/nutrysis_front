import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Form from "./Form.jsx";
import List from "./List.jsx";

class Doencas extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/admin/doencas"
          render={props => (
            <List
              {...props}
            />
          )}
          key="0"
        />
        <Route
          path={`/admin/doencas/edit/:id`}
          render={props => (
            <Form
              {...props}
            />
          )}
          key="1"
        />
        <Route
          path="/admin/doencas/add"
          render={props => (
            <Form
              {...props}
            />
          )}
          key="2"
        />
      </Switch>
    );
  }
}

export default Doencas;
