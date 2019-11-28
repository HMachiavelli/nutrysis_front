import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Nav, NavDropdown, MenuItem } from "react-bootstrap";

import session from '../../services/session';

class AdminNavbarLinks extends Component {
  logout = () => {
    session.remove('user');

    window.location.href = '/login/access';
  }

  render() {
    return (
      <div>
        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title={<i className="fa fa-user"></i>}
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1} href={"/admin/usuarios/edit/" + session.load('user')['_id']}>
              Meu cadastro
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5} onClick={this.logout}>Sair</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
