import React, { Component } from "react";
import {
  Modal,
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { register } from "../components/UserFunctions/UserFunctions.js"


import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from 'react-select'

const options = [
  { value: 'user', label: 'Employee' },
  { value: 'hr', label: 'Human Resourses' }
]

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
      name: '',
      jobDescription: '',
      username: '',
      password: '',
      daysAvailable: '',
      typeOfUser: '',
      daysUsed: '0',
    };
    this.onChange = this.onChange.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addModalClose = this.addModalClose.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangeSelect(e) {
    this.setState({ typeOfUser: e.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const user = {
      name: this.state.name,
      jobDescription: this.state.jobDescription,
      username: this.state.username,
      password: this.state.password,
      daysAvailable: this.state.daysAvailable,
      typeOfUser: this.state.typeOfUser,
      status: this.state.status
    }
   // this.setState({ addModalShow: true })
    register(user).then(res => {
      console.log(res)
    })
  }
  addModalClose() {
    this.setState({ addModalShow: false })
    window.location.reload(true)
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col mdOffset={3} md={6}>
              <Card
                title="Create User"
                content={
                  <form noValidate onSubmit={this.onSubmit}>

                    <Row>
                      <Col md={6}>
                        <ControlLabel>Username</ControlLabel>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Username"
                          value={this.state.username}
                          onChange={this.onChange}
                        />
                      </Col>
                      <Col md={6}>
                        <ControlLabel>Password</ControlLabel>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                      </Col>
                    </Row>


                    <ControlLabel>Name</ControlLabel>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Full Name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    <ControlLabel>Job description</ControlLabel>
                    <FormControl
                      rows="5"
                      componentClass="textarea"
                      bsClass="form-control"
                      name="jobDescription"
                      placeholder="Job Decription"
                      value={this.state.jobDescription}
                      onChange={this.onChange}
                    />
                    <Row>
                      <Col md={6}>
                        <ControlLabel>Days</ControlLabel>
                        <input
                          type="number"
                          className="form-control"
                          name="daysAvailable"
                          placeholder="Days Available"
                          value={this.state.daysAvailable}
                          onChange={this.onChange}
                        />
                      </Col>
                      <Col md={6}>
                        <ControlLabel>Type</ControlLabel>
                        <Select
                          placeholder="Select type Of User"
                          onChange={this.onChangeSelect}
                          options={options}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Create
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Modal show={this.state.addModalShow} onHide={this.addModalClose}
              bsSize="small"
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  User Created
                </Modal.Title>
              </Modal.Header>
              
            </Modal>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CreateUser;
