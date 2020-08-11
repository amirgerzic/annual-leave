import React, { Component } from "react";
import { NavItem, Nav} from "react-bootstrap";
import {withRouter} from 'react-router-dom'

class NavbarLinks extends Component {

  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push('/login')
  }
  
  render() {
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={this.logOut.bind(this)}>
            Log out
          </NavItem>  
        </Nav>
      </div>
    );
  }
}

export default withRouter(NavbarLinks);
