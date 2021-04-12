import "./HeaderNavigation.css"

import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";

const COA_URL = "http://www.cleanoceanaction.org/index.php?id=2";
const SUPERSET_URL = "http://coa-superset-prod.eba-b9cczgua.us-east-1.elasticbeanstalk.com/superset/dashboard/coa-ui/?preselect_filters=%7B%221%22%3A%20%7B%22__time_range%22%3A%20%22No%20filter%22%7D%7D";

class HeaderNavigation extends Component {
  render() {
    return (
      <div className="HeaderNavigation">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
	      <Navbar.Link href={COA_URL} target="_blank">
	        Clean Ocean Action
	      </Navbar.Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            <Navbar.Text>
	      <Navbar.Link href={SUPERSET_URL} target="_blank">
	        Visualizations
              </Navbar.Link>
            </Navbar.Text>
            <Navbar.Text>
	      <Navbar.Link href={COA_URL} target="_blank">
	        About
	      </Navbar.Link>
            </Navbar.Text>
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
