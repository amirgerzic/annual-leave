import React, { Component } from "react";
import { Grid, Row, Col, Tab, Tabs } from "react-bootstrap";
import Button from 'components/CustomButton/CustomButton'
import DataTable from 'react-data-table-component';
import ModalActionBox from "components/Modal/ModalActionBox"
import Card from "components/Card/Card.jsx";
import { requestDataById, deleteRequest } from "../components/UserFunctions/UserFunctions.js"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

const jwtDecode = require('jwt-decode');
toast.configure()
class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocking: false,
      requests: [],
      addModalShow: false,
      selectedRow: '',
      daysOff: '',
      employeeId: '',
      status: ''
    }
    this.onChangeDelete = this.onChangeDelete.bind(this)
    this.onClick = this.onClick.bind(this)
    this.columns = this.columns.bind(this)
    this.toggleBlocking = this.toggleBlocking.bind(this)
  }
  toggleBlocking() {
    this.setState({ blocking: !this.state.blocking });
  }
  onChangeDelete(e) {
    deleteRequest(e.target.id).then(res => {
      this.toggleBlocking()
      toast.success(res, {
        autoClose: 2000,
        position: "top-center",
      })
      window.setTimeout(function () { window.location = "" }, 2000)
    })
  }
  onClick(key) {
    this.setState({ status: key })
    console.log(this.state.employeeId)
    const data = {
      status: key,
      employeeId: this.state.employeeId
    }
    requestDataById(data).then(res => {
      this.setState({ requests: res })
    })
  }

  async componentDidMount() {
    const token = localStorage.getItem('usertoken')
    var decoded = jwtDecode(token)
    const employeeId = decoded._id
    console.log(employeeId)
    const status = 'PENDING'
    this.setState({ status: status })
    this.setState({ employeeId: decoded._id })
    const data = {
      employeeId: employeeId,
      status: "PENDING"
    }
    console.log(data)
    requestDataById(data).then(res => {
      this.setState({ requests: res })
    })
  }
  columns() {
    if (this.state.status === "PENDING") {
      return [
        {
          name: 'Reason',
          selector: 'reason',
          sortable: true,
        },
        {
          name: 'Additional Info',
          selector: 'additionalInfo',
          sortable: true,
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
          name: 'Delete',
          selector: '_id',
          cell: row => <Button bsStyle="danger" fill id={row._id} onClick={this.onChangeDelete}>Delete</Button>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        }
      ]
    }
    else {
      return [
        {
          name: 'Reason',
          selector: 'reason',
          sortable: true,

        },
        {
          name: 'Additional Info',
          selector: 'additionalInfo',
          sortable: true,

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
    let addModalClose = () => this.setState({ addModalShow: false })
    let columns = this.columns()
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Tabs onSelect={this.onClick} defaultActiveKey="PENDING" id="uncontrolled-tab-example">
                <Tab eventKey="PENDING" title="Pending">
                </Tab>
                <Tab eventKey="APPROVED" title="Approved">
                </Tab>
                <Tab eventKey="DENIED" title="Denied">
                </Tab>
              </Tabs>
              <BlockUi tag="div" blocking={this.state.blocking}>
              <Card
                ctTableFullWidth
                ctTableResponsive
                content={
                  <DataTable
                    // onRowSelected={this.onChangeSelectedRow}
                    pagination
                    title="Leave Requests"
                    columns={columns}
                    data={this.state.requests}
                  />
                }
              />
              </BlockUi>
            </Col>
            <ModalActionBox employeeId={this.state.employeeId} value={this.state.daysOff} id={this.state.selectedRow} show={this.state.addModalShow} onHide={addModalClose} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Requests;
