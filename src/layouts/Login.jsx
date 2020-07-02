import React, { Component } from "react";

import { login } from "../components/UserFunctions/UserFunctions.js"
import LoginNavbar from "components/Navbars/LoginNavbar";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    login(user).then(res => {
      console.log(res.error)
      if (res.error === undefined) {
        this.props.history.push('/admin')
      }
    })
  }
  render() {
    return (
      <div className="wrapper">
        <LoginNavbar></LoginNavbar>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={4} className="justify-content-md-center">
                <Card
                  title="Login"
                  content={
                    <form noValidate onSubmit={this.onSubmit}>
                      <ControlLabel>Username</ControlLabel>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.onChange}
                      />
                      <br></br>
                      <ControlLabel>Password</ControlLabel>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      <br></br>
                      <Button bsStyle="info" pullRight fill type="submit">
                        Login
                    </Button>
                      <div className="clearfix" />
                    </form>
                  }
                /></Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Login;
