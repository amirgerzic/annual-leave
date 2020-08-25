import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormGroup,
  FormControl
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from 'react-select'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { request } from "../components/UserFunctions/UserFunctions.js"
import { format, compareAsc } from 'date-fns'
const jwtDecode = require('jwt-decode');

const options = [
  { value: 'Sick', label: 'Sick Leave' },
  { value: 'Vacation', label: 'Vacation' },
  { value: 'Hometime', label: 'Hometime' },
  { value: 'Other', label: 'Other' },
]
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      name: '',
      daysOff: '',
      reason: '',
      additionalInfo: '',
      employeeId: '',
      status: 'PENDING'
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeDate(e) {
    this.setState({ date: e })
  }
  componentDidMount()  {
    const token = localStorage.getItem('usertoken')
    var decoded = jwtDecode(token)
    this.setState({name: decoded.name})
    this.setState({employeeId: decoded._id})
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangeSelect(e) {
    this.setState({reason: e.value})
  }
  onSubmit(e) {
    e.preventDefault()
    const leave = {
      date: format(this.state.date, 'dd/MM/yyyy'),
      name: this.state.name,
      daysOff: this.state.daysOff,
      reason: this.state.reason,
      additionalInfo: this.state.additionalInfo,
      employeeId: this.state.employeeId,
      status: this.state.status
    }
    console.log(leave.date)
    request(leave).then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row >
            <Col md={8} mdOffset={2}>
              <Card
                title="Request a Leave"
                content={
                  <form noValidate onSubmit={this.onSubmit}>
                    <Row>
                      <Col md={6}>
                      <ControlLabel>Select Date</ControlLabel>
                      <br></br>
                        <Datepicker selected={this.state.date} onChange={this.onChangeDate} className="form-control"/>
                      </Col>
                      <Col md={4}>
                        <ControlLabel>Days</ControlLabel>
                        <input
                          type="number"
                          className="form-control"
                          name="daysOff"
                          placeholder="Days Requested"
                          value={this.state.daysOff}
                          onChange={this.onChange}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlLabel>Reason</ControlLabel>
                        <Select
                        placeholder="Select reason"
                        onChange={this.onChangeSelect}
                        options={options}
                      />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>More</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Detailed reason for requesting a leave"
                            name="additionalInfo"
                            value={this.state.additionalInfo}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Request
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
