import "./HeaderNavigation.css"

import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";

class HeaderNavigation extends Component {
  render() {
    return (
      <div className="HeaderNavigation">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/about">Clean Ocean Action</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/visualizations">
              <NavItem>Visualizations</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/contributions">
              <NavItem>Contribution</NavItem>
            </LinkContainer>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default HeaderNavigation;
