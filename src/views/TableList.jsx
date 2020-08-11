import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Button from 'components/CustomButton/CustomButton'
import ModalActionBox from "components/Modal/ModalActionBox"
import Card from "components/Card/Card.jsx";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        requests: [],
        addModalShow: false
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(){
    this.setState({addModalShow: true})
    
  }

  async componentDidMount(){
    const url = "http://localhost:4000/requests/requestData"
    const response = await fetch(url)
    const data = await response.json()
    this.setState({requests: data})
    console.log(this.state.requests[0]._id)
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
                    selectableRows
                    pagination
                    title="Leave Requests"
                    columns={[
                      {
                        name: 'Request ID',
                        selector: '_id',
                        sortable: true,
                      },
                      {
                        name: 'Employee ID',
                        selector: 'employeeId',
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
                        name: 'Action',
                        selector: 'action',
                        cell: () => <Button value={this.state.requests[0]._id}bsStyle="info" onClick={this.onChange}>Action</Button>,
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
            <ModalActionBox data={this.state.requests[0]} show={this.state.addModalShow} onHide={addModalClose} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
