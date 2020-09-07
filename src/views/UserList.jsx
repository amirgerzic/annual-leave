import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Button from 'components/CustomButton/CustomButton'
import { Card } from "components/Card/Card.jsx";
import ModalForm from "components/Modal/ModalForm.jsx";
import { deleteUser } from "components/UserFunctions/UserFunctions.js"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalShow: false,
      selectedRow: '',
      employees: [],
      selectedEmployee: [],
      name: '',
      username: '',
      password: '',
      jobTitle: '',
      daysAvailable: '',
      typeOfUser: ''
    };
    this.onChange = this.onChange.bind(this)
    this.onChangeDelete = this.onChangeDelete.bind(this)
    this.onChangeModal = this.onChangeModal.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
  }

  onChangeModal(e) {
    this.setState({ selectedRow: e.target.id })
    this.setState({ addModalShow: true })
    this.setState({
      selectedEmployee: this.state.employees.find((data) => data._id === e.target.id)
    })
  }
  onChangeDelete(e) {
    deleteUser(e.target.id).then(res =>{
      toast.success(res, {
        autoClose: 2000
    })
    window.setTimeout(function () { window.location = "" }, 2000)
    })
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangeSelect(e) {
    this.setState({ typeOfUser: e.value })
  }
  async componentDidMount() {
    const url = "/users/userDataAll"
    const response = await fetch(url)
    const data = await response.json()
    this.setState({ employees: data })
  }

  render() {
    let addModalClose = () => this.setState({ addModalShow: false })
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
                    title="List of Employees"
                    columns={[
                      {
                        name: 'Employee Name',
                        selector: 'name',
                        sortable: true,
                      },
                      {
                        name: 'Username',
                        selector: 'username',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Job Title',
                        selector: 'jobTitle',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Type of User',
                        selector: 'typeOfUser',
                        sortable: true,
                        right: true,
                      },
                      {
                        name: 'Action',
                        selector: '_id',
                        cell: row => <Button bsStyle="info" id={row._id} onClick={this.onChangeModal}>Edit</Button>,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                      },
                      {
                        name: 'Delete',
                        selector: '_id',
                        cell: row => <Button bsStyle="danger" id={row._id} onClick={this.onChangeDelete}>Delete</Button>,
                        ignoreRowClick: true,
                        button: true,
                      },
                    ]}
                    data={this.state.employees}
                  />
                }
              />
            </Col>
            <ModalForm data={this.state.selectedEmployee} show={this.state.addModalShow} onHide={addModalClose}></ModalForm>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserList;
