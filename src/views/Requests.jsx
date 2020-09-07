import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import ModalActionBox from "components/Modal/ModalActionBox"
import Card from "components/Card/Card.jsx";
import { requestDataById, deleteRequest } from "../components/UserFunctions/UserFunctions.js"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const jwtDecode = require('jwt-decode');
toast.configure()
class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
        requests: [],
        addModalShow: false,
        selectedRow:'',
        daysOff: '',
        employeeId: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeDelete = this.onChangeDelete.bind(this)
  }
  onChange(e){
    this.setState({selectedRow: e.target.id})
    this.setState({daysOff: e.target.value})
    this.setState({employeeId: e.target.name})
    this.setState({addModalShow: true})
  }
  onChangeDelete(e) {
    deleteRequest(e.target.id).then(res =>{
      toast.success(res, {
        autoClose: 2000
    })
    window.setTimeout(function () { window.location = "" }, 2000)
  })
  }


  async componentDidMount(){
    const token = localStorage.getItem('usertoken')
        var decoded = jwtDecode(token)
        const employeeId = decoded._id
        console.log(decoded._id)
        requestDataById(employeeId).then(res => {
            this.setState({ requests: res })
        })
  }
  render() {
    let addModalClose =() => this.setState({addModalShow:false})
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <DataTable
                 // onRowSelected={this.onChangeSelectedRow}
                    pagination
                    title="Leave Requests"
                    columns={[
                      {
                        name: 'Employee Name',
                        selector: 'name',
                        sortable: true,
                      },
                      {
                        name: 'Reason',
                        selector: 'reason',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Additional Info',
                        selector: 'additionalInfo',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Date',
                        selector: 'date',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Status',
                        selector: 'status',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Days Off',
                        selector: 'daysOff',
                        sortable: true,
                        right: true,
                      },
                    ]}
                    data={this.state.requests}
                  />
                }
              />
            </Col>
            <ModalActionBox employeeId={this.state.employeeId} value={this.state.daysOff} id={this.state.selectedRow} show={this.state.addModalShow} onHide={addModalClose} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Requests;
