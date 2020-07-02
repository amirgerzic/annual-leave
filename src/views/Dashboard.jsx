import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ModalForm from "components/Modal/ModalForm"

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
    date: new Date(),
    addModalShow: false
  }
  this.onChange = this.onChange.bind(this)
  }
  
  onChange(date){
    this.setState({ date })
    this.setState({addModalShow: true})
    console.log(date)
  }


  render() {
    let addModalClose =() => this.setState({addModalShow:false})
    return (
      <div className="content">
        <Grid fluid>
          <Row >
            <Col md={6} mdOffset={3}>
           <Calendar 
          onChange={this.onChange}
          value={this.state.date}
        />
<ModalForm show={this.state.addModalShow} onHide={addModalClose} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
