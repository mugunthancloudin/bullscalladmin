import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import logo from "../assets/images/Bull'sCallLogo.png";

export default function Navbar_header() {
  return (
    <>
      <Navbar
        variant="light"
        className="navbar_background"
        sticky="top"
        expand="sm"
      >
        <Container fluid>
          <NavLink href="/" className="d-flex">
            <img src={logo} className="navlogo" width={40} />
            <h2 className="text-white ms-2 mt-3 fw-bold">Bull's Call</h2>{" "}
          </NavLink>

          {/* <NavbarToggle aria-controls="navbar-dark-color: rgba($white, .55);" /> */}

          <NavbarCollapse
            id="navbar-dark-example"
            className="justify-content-end font-weight-bold text-white"
          >
            <Nav>
              <NavLink href="/classicBetting">
                <button className="nav_button text-nowrap">Launch App</button>
              </NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}
