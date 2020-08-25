import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Card from "components/Card/Card.jsx";
import Table from "components/Table.jsx"
import Button from 'components/CustomButton/CustomButton'

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedRow: '',
      selectedEmployee: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeSelectedRow = this.onChangeSelectedRow.bind(this)
  }
 onChangeSelectedRow(e){
   console.log('selected')
   console.log(e.selectedRows._id)
   console.log(e.selectedRows)
    this.setState({selectedEmployee: e.selectedRows})
  }
  onChange(e) {
    this.setState({ selectedRow: e.target.id })
    console.log(e.target.id)
  }
  async componentDidMount() {
    const url = "/users/userData"
    const response = await fetch(url)
    const data = await response.json()
    this.setState({ employees: data })
  }
  render() {

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
                    striped
                    title="List of Employees"
                    columns={[
                      {
                        name: 'Employee Name',
                        selector: 'name',
                        sortable: true,
                      },
                      {
                        name: 'Job Desc',
                        selector: 'jobDescription',
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
                        name: 'Days Available',
                        selector: 'daysAvailable',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Days Used',
                        selector: 'daysUsed',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Edit',
                        selector: '_id',
                        id: '_id',
                        cell: row => <Button bsStyle="info" id={row._id} onClick={this.onChange}>Edit</Button>,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                      }
                    ]}
                    data={this.state.employees}
                    onSelectedRowsChange={this.onChangeSelectedRow}
                    selectableRows
                    expandableRows
                    expandableRowsComponent={<Table id={this.state.selectedRow}></Table>}
                  />
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EmployeeTable;
