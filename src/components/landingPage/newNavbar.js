import React from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import logo from "../assets/images/LogoDark.png";

export default function Navbar_header() {
  return (
    <>
     <Navbar variant="light" className='navbar_background' sticky="top" expand="sm">
        <Container fluid>
          <NavLink href="/">
            <img src={logo} className="navlogo"/>
          </NavLink>

          {/* <NavbarToggle aria-controls="navbar-dark-color: rgba($white, .55);" /> */}

          <NavbarCollapse
            id="navbar-dark-example"
            className="justify-content-end font-weight-bold text-white"
          >
            <Nav>
             

              <NavLink href="/demo"><button className='nav_button'>Launch App</button></NavLink>

             
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    
    </>
  )
}

