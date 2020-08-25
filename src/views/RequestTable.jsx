import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Button from 'components/CustomButton/CustomButton'
import ModalActionBox from "components/Modal/ModalActionBox"
import Card from "components/Card/Card.jsx";


class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        requests: [],
        addModalShow: false,
        selectedRow:'',
        daysOff: '',
        employeeId: '',
    }
    this.onChange = this.onChange.bind(this)
   // this.onChangeSelectedRow = this.onChangeSelectedRow.bind(this)
  }
  onChange(e){
    this.setState({selectedRow: e.target.id})
    this.setState({daysOff: e.target.value})
    this.setState({employeeId: e.target.name})
    this.setState({addModalShow: true})
  }
 // onChangeSelectedRow(e){
   // console.log('state', e.selectedRows);
   // this.setState({selectedRow: e.selectedRows})
 // }


  async componentDidMount(){
    const url = "http://localhost:4000/requests/requestData"
    const response = await fetch(url)
    const data = await response.json()
    this.setState({requests: data})
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
                      {
                        name: 'Action',
                        selector: '_id',
                        cell: row => <Button bsStyle="info" name={row.employeeId} value={row.daysOff} id={row._id} onClick={this.onChange}>Action</Button>,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                      },
                    ]}
                    data={this.state.requests}
                  />
                }
              />
            </Col>
            <ModalActionBox status={this.state.status} employeeId={this.state.employeeId} value={this.state.daysOff} id={this.state.selectedRow} show={this.state.addModalShow} onHide={addModalClose} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RequestTable;
