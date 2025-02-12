import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import logo from "assets/img/vacation.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
              <img src={logo} size={40} alt="logo_image" />
       </Navbar.Brand>
          <Navbar.Brand>
              <h1 style={{color: '#1DC7EA'}}>AnnualLeave</h1>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
