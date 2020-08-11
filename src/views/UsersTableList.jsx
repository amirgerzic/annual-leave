import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Card from "components/Card/Card.jsx";

const columns = [
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
    name: 'Days Available',
    selector: 'daysAvailable',
    sortable: true,
    right: true,
  },
];
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        requests: []
    }
  }

  async componentDidMount(){
    const url = "http://localhost:4000/users/userData"
    const response = await fetch(url)
    const data = await response.json()
    this.setState({requests: data})
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
                    title="Employee List"
                    columns={columns}
                    data={this.state.requests}
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

export default TableList;
