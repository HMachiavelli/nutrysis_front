import React, { Component } from "react";
import { Grid } from "react-bootstrap";

import image from "assets/img/unisinos.png";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <img src={image} alt="Unisinos" width="100" />
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            Arquitetura de Software
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
