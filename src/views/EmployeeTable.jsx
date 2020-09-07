import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Card from "components/Card/Card.jsx";

class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedRow: '',
      selectedEmployee: ''
    }
    this.onChange = this.onChange.bind(this)
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
                        name: 'Employee Username',
                        selector: 'username',
                        sortable: true,
                      },
                      {
                        name: 'Job Title',
                        selector: 'jobTitle',
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
                      }
                    ]}
                    data={this.state.employees}
                    // selectableRows
                    // expandableRows
                    // expandableRowsComponent={<Table id={this.state.selectedRow}></Table>}
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
