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

const options = [
  { value: 'sick', label: 'Sick Leave' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'hometime', label: 'Hometime' },
  { value: 'other', label: 'Other' },
]
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      addModalShow: false
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ date: e })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row >
            <Col md={6} mdOffset={3}>
              <Card
                title="Request a Leave"
                content={
                  <form noValidate onSubmit={this.onSubmit}>
                    <Row>
                      <Col md={12}>
                        <Datepicker selected={this.state.date} onChange={this.onChange} className="form-control"/>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
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
