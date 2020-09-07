import React, { Component } from "react";
import { NavItem, Nav} from "react-bootstrap";
import {withRouter} from 'react-router-dom'
import { Button } from "semantic-ui-react";
// import Button from "components/CustomButton/CustomButton.jsx"

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
            <Button size="small" inverted circular color="blue">Log out</Button>
          </NavItem>  
        </Nav>
      </div>
    );
  }
}

export default withRouter(NavbarLinks);
