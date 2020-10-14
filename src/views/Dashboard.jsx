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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { request } from "../components/UserFunctions/UserFunctions.js"
import { format } from 'date-fns'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
const jwtDecode = require('jwt-decode');


toast.configure()

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blocking: false,
      date: new Date(),
      name: '',
      daysOff: '',
      daysOffError: '',
      reason: '',
      reasonError: '',
      additionalInfo: '',
      additionalInfoError: '',
      employeeId: '',
      status: 'PENDING',
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.toggleBlocking = this.toggleBlocking.bind(this)
  }
  toggleBlocking() {
    this.setState({blocking: !this.state.blocking});
  }
  onChangeDate(e) {
    this.setState({ date: e })
  }
  componentDidMount() {
    const token = localStorage.getItem('usertoken')
    var decoded = jwtDecode(token)
    this.setState({ name: decoded.name })
    this.setState({ employeeId: decoded._id })
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangeSelect(e) {
    this.setState({ reason: e.value })
  }
  validate = () => {
    let daysOffError = '';
    let reasonError = '';
    let additionalInfoError = '';

    if (!this.state.daysOff) {
      daysOffError = 'Number of days off must be selected';
    }
    else {
      daysOffError = '';
      this.setState({ daysOffError });
    }
    if (!this.state.reason) {
      reasonError = "Reason must be selected";
    } else {
      reasonError = '';
      this.setState({ reasonError })
    }
    if (!this.state.additionalInfo) {
      additionalInfoError = "Additional info field cannot be blank";
    } else {
      additionalInfoError = '';
      this.setState({ additionalInfoError })
    }
    if (daysOffError || additionalInfoError || reasonError) {
      this.setState({ daysOffError, additionalInfoError, reasonError })
      return false
    }

    return true;
  }
  onSubmit(e) {
    e.preventDefault()
    const isValid = this.validate()
    console.log(isValid)
    if (isValid) {
      const leave = {
        date: format(this.state.date, 'dd/MM/yyyy'),
        name: this.state.name,
        daysOff: this.state.daysOff,
        reason: this.state.reason,
        additionalInfo: this.state.additionalInfo,
        employeeId: this.state.employeeId,
        status: this.state.status
      }
      request(leave).then(res => {
        if (res.status === 'Request Sent!') {
          this.toggleBlocking()
          window.setTimeout(function () { window.location = "" }, 2000)
          toast.success(res.status, {
            autoClose: 2000,
            position: "top-center",
          })
        } else if (res.error === 'Request on this date already exists') {
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
          <Row >
            <Col md={8} mdOffset={2}>
            <BlockUi tag="div" blocking={this.state.blocking}>
              <Card
                title="Request a Leave"
                content={
                  <form noValidate onSubmit={this.onSubmit}>
                    <Row>
                      <Col md={6}>
                        <ControlLabel>Select Date</ControlLabel>
                        <br></br>
                        <Datepicker id="date" selected={this.state.date} onChange={this.onChangeDate} className="form-control" />
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
                          required
                        />
                        <div style={{ color: "red" }}>{this.state.daysOffError}</div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <ControlLabel>Reason</ControlLabel>
                        <Select
                          name="reason"
                          placeholder="Select reason"
                          onChange={this.onChangeSelect}
                          options={[
                            { value: 'Sick', label: 'Sick Leave' },
                            { value: 'Vacation', label: 'Vacation' },
                            { value: 'Hometime', label: 'Hometime' },
                            { value: 'Other', label: 'Other' },
                          ]}
                          required
                        />
                        <div id="reasonError" style={{ color: "red" }}>{this.state.reasonError}</div>
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
                            required
                          />
                          <div style={{ color: "red" }}>{this.state.additionalInfoError}</div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button name="request" bsStyle="info" pullRight fill type="submit">
                      Request
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

export default Dashboard;
