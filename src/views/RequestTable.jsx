import React, { Component } from "react";
import { Grid, Row, Col, Tab,Tabs } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Button from 'components/CustomButton/CustomButton'
import ModalActionBox from "components/Modal/ModalActionBox"
import ModalUserInfo from "components/Modal/ModalUserInfo"
import Card from "components/Card/Card.jsx";
import { requestData, userDataById } from "components/UserFunctions/UserFunctions";


class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        requests: [],
        addModalShow: false,
        addModalUserShow: false,
        selectedRow:'',
        selectedUser: '',
        daysOff: '',
        employeeId: '',
        status: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeUser = this.onChangeUser.bind(this)
    this.onClick = this.onClick.bind(this)
    this.columns = this.columns.bind(this)
   // this.onChangeSelectedRow = this.onChangeSelectedRow.bind(this)
  }
  onChange(e){
    this.setState({selectedRow: e.target.id})
    this.setState({daysOff: e.target.value})
    this.setState({employeeId: e.target.name})
    this.setState({addModalShow: true})
  }
  onChangeUser(e){
    userDataById(e.target.name).then(res => {
          this.setState({selectedUser: res})
   })
    this.setState({addModalUserShow: true})
  }
 // onChangeSelectedRow(e){
   // this.setState({selectedRow: e.selectedRows})
 // }
 onClick(key){
   this.setState({status: key})
   const data={
     status : key,
     finalize : 0
   }
   if(key==="APPROVED"|| key==="DENIED"){
     data.finalize=1
   }
   requestData(data).then(res =>{
     this.setState({requests: res})
   })
 }
  async componentDidMount(){
    const status='PENDING'
    const data={
      status:'PENDING',
      finalize: 0
    }
    this.setState({status: status})
    requestData(data).then(res => {
    this.setState({ requests: res })
  })
}
columns(){
  if(this.state.status==="PENDING"){
    return [
      {
        name: 'Employee Name',
        cell: row => <Button  name={row.employeeId} onClick={this.onChangeUser}>{row.name}</Button>,
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
      {
        name: 'Action',
        selector: '_id',
        cell: row => <Button bsStyle="info" fill name={row.employeeId} value={row.daysOff} id={row._id} onClick={this.onChange}>Edit</Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      }
    ]
  }
  else{
    return [
      {
        name: 'Employee Name',
        cell: row => <Button name={row.employeeId} onClick={this.onChangeUser}>{row.name}</Button>,
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
    ]
  }
}
  render() {
    let addModalClose =() => this.setState({addModalShow:false})
    let addModalUserClose =() => this.setState({addModalUserShow:false})
    let columns = this.columns()
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
            <Tabs onSelect={this.onClick} defaultActiveKey="PENDING" id="uncontrolled-tab-example">
  <Tab eventKey="PENDING" title="Active">
  </Tab>
  <Tab eventKey="APPROVED" title="Approved">
  </Tab>
  <Tab eventKey="DENIED" title="Denied">
  </Tab>
</Tabs>
              <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                  <DataTable
                 // onRowSelected={this.onChangeSelectedRow}
                    pagination
                    title="Leave Requests"
                    columns={columns}
                    data={this.state.requests}
                  />
                  </div>
                }
              />
            </Col>
            <ModalActionBox status={this.state.status} employeeid={this.state.employeeId} value={this.state.daysOff} id={this.state.selectedRow} show={this.state.addModalShow} onHide={addModalClose} />
            <ModalUserInfo selectedUser={this.state.selectedUser} show={this.state.addModalUserShow} onHide={addModalUserClose} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RequestTable;
