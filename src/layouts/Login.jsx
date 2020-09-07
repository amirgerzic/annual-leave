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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const jwtDecode = require('jwt-decode');

toast.configure()
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "blue",
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
      if (res.error ==="Wrong username or password") {
        toast.warn(res.error, {
          autoClose: 3000
        })
      }
      const token = localStorage.getItem('usertoken')
      if (res.error === undefined) {
        var decoded = jwtDecode(token)
        if (decoded.typeOfUser === 'user') {
          this.props.history.push('/user')
        } else if (decoded.typeOfUser === 'admin') {
          this.props.history.push('/admin')
        } else if (decoded.typeOfUser === 'hr') {
          this.props.history.push('/hr')
        }
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
              <Col mdOffset={4} md={4} className="justify-content-md-center">
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
