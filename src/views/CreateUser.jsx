import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel
} from "react-bootstrap";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { register } from "../components/UserFunctions/UserFunctions.js"


import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


toast.configure()
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      name: '',
      nameError: '',
      jobTitle: '',
      jobTitleError: '',
      department: '',
      email: '',
      emailError: '',
      phone: '',
      usernameError: '',
      username: '',
      password: '',
      passwordError: '',
      daysAvailable: '',
      daysAvailableError: '',
      typeOfUser: '',
      typeOfUserError: '',
      daysUsed: '0',
    };
    this.onChange = this.onChange.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.toggleBlocking = this.toggleBlocking.bind(this);
  }
  toggleBlocking() {
    this.setState({blocking: !this.state.blocking});
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangeSelect(e) {
    console.log(e.target.value)
    this.setState({ typeOfUser: e.target.value })
  }
  validate = () => {
    let nameError = '';
    let jobTitleError = '';
    let usernameError = '';
    let passwordError = '';
    let emailError = '';
    let daysAvailableError = '';
    let typeOfUserError = '';

    if(!this.state.email.includes('@')){
      emailError = 'Invalid email';
    }
    else{
      emailError = '';
      this.setState({emailError});
    }
    if(!this.state.username){
      usernameError = "Username field cannot be blank";
    }else{
      usernameError = '';
      this.setState({usernameError})
    }
    if(!this.state.password){
      passwordError = "Password field cannot be blank";
    }else{
      passwordError = '';
      this.setState({passwordError})
    }
    if(!this.state.jobTitle){
      jobTitleError = "Job Title field cannot be blank";
    }else{
      jobTitleError = '';
      this.setState({jobTitleError})
    }
    if(!this.state.name){
      nameError = "Name field cannot be blank";
    }else{
      nameError = '';
      this.setState({nameError})
    }
    if(!this.state.daysAvailable){
      daysAvailableError = "Days available field cannot be blank";
    }else{
      daysAvailableError = '';
      this.setState({daysAvailableError})
    }
    if(!this.state.typeOfUser){
      typeOfUserError = "User type must be selected";
    }else{
      typeOfUserError = '';
      this.setState({typeOfUserError})
    }
    if(nameError || emailError || usernameError || passwordError || jobTitleError || daysAvailableError || typeOfUserError){
      this.setState({nameError, emailError, usernameError, passwordError, jobTitleError, daysAvailableError, typeOfUserError})
      return false
    }

    return true;
  }
  onSubmit(e) {
    e.preventDefault()
    const isValid = this.validate()
    if (isValid) {
      const user = {
        name: this.state.name,
        jobTitle: this.state.jobTitle,
        department: this.state.department,
        email: this.state.email,
        phone: this.state.phone,
        username: this.state.username,
        password: this.state.password,
        daysAvailable: this.state.daysAvailable,
        typeOfUser: this.state.typeOfUser,
        status: this.state.status
      }
      register(user).then(res => {
        if (res.status === 'User Created!') {
          this.toggleBlocking()
          window.setTimeout(function () { window.location = "" }, 2000)
          toast.success(res.status, {
            autoClose: 2000,
            position: "top-center",
          })
        } else if (res.error === 'User already exists') {
          toast.warn(res.error, {
            autoClose: 2000,
            position: "top-center",
          })
        }
      })
    }
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col mdOffset={3} md={6}>
            <BlockUi tag="div" blocking={this.state.blocking}>
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
                        <div style={{ color: "red" }}>{this.state.usernameError}</div>
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
                        <div style={{ color: "red" }}>{this.state.passwordError}</div>
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
                    <div style={{ color: "red" }}>{this.state.nameError}</div>
                    <Row>
                      <Col md={6}>
                        <ControlLabel>Email</ControlLabel>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.onChange}
                        />
                      <div style={{ color: "red" }}>{this.state.emailError}</div>
                      </Col>
                      <Col md={6}>
                        <ControlLabel>Phone number</ControlLabel>
                        <input
                          type="number"
                          className="form-control"
                          name="phone"
                          placeholder="Phone number"
                          value={this.state.phone}
                          onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlLabel>Job title</ControlLabel>
                        <input
                          type="text"
                          className="form-control"
                          name="jobTitle"
                          placeholder="Job Title"
                          value={this.state.jobTitle}
                          onChange={this.onChange}
                        />
                        <div style={{ color: "red" }}>{this.state.jobTitleError}</div>
                      </Col>
                    </Row>
                    <Col>
                      <ControlLabel>Department</ControlLabel>
                      <input
                        type="text"
                        className="form-control"
                        name="department"
                        placeholder="Department"
                        value={this.state.department}
                        onChange={this.onChange}
                      />
                    </Col>
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
                        <div style={{ color: "red" }}>{this.state.daysAvailableError}</div>
                      </Col>
                      <Col md={6}>
                        <ControlLabel>Select type of user</ControlLabel>
                       
                        <select id="typeOfUser" placeholder="Select type of user" className="form-control" value={this.state.typeOfUser} onChange={this.onChangeSelect}>
  
  <option index="1"></option>
  <option index="2" value="user">Employee</option>
  <option index="3" value="hr">Human Resources</option>
</select>
                        <div style={{ color: "red" }}>{this.state.typeOfUserError}</div>
                      </Col>
                    </Row>
                    <br></br>
                    <Button name="create" bsStyle="info" pullRight fill type="submit">
                      Create
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
              </BlockUi>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CreateUser;
