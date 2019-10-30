import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title={<i class="fa fa-user"></i>}
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>
              <NavLink to="/admin/user">Meu cadastro</NavLink>
            </MenuItem>
            <MenuItem eventKey={2.2}>Mensagens</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Sair</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
