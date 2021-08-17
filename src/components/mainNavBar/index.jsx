import { useAuthData } from "hooks/authData";
import React from "react";
import { Navbar, Nav, NavLink  } from "react-bootstrap";
//import { FaBars } from "react-icons/fa";

const MainNavBar = (props) => {
  const { loginState } = useAuthData();

  return (
    <Navbar fixed className="navbar-dark bg-primary" expand="lg">
      <Navbar.Brand>Bodi mass index calculator(BMI)</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="container-fluid">
          <NavLink href="#/home">Home</NavLink>

          <NavLink href="#/about">About</NavLink>
          {!loginState.OK ? (
            <NavLink href="#/login" className="ms-auto ml-auto">
              Login
            </NavLink>
          ) : (
            <NavLink href="#/login" className="ms-auto ml-auto">
              {loginState?.data.name}:{" "}
              {loginState?.data.first_name + " " + loginState?.data.second_name}
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavBar;
