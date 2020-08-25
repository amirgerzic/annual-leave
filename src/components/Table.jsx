import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import Button from 'components/CustomButton/CustomButton'
import ModalActionBox from "components/Modal/ModalActionBox"
import { requestDataById } from "../components/UserFunctions/UserFunctions.js"


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            addModalShow: false,
            selectedRow: '',
            daysOff: '',
            employeeId: ''
        }
        this.onChange = this.onChange.bind(this)
        // this.onChangeSelectedRow = this.onChangeSelectedRow.bind(this)
    }
    onChange(e) {
        this.setState({ selectedRow: e.target.id })
        this.setState({daysOff: e.target.value})
        this.setState({employeeId: e.target.name})
        this.setState({ addModalShow: true })
    }
    // onChangeSelectedRow(e){
    // console.log('state', e.selectedRows);
    // this.setState({selectedRow: e.selectedRows})
    // }


    async componentDidMount() {
        const employeeId = this.props.id

            requestDataById(employeeId).then(res => {
                this.setState({ requests: res })
            })
    }
    render() {
        let addModalClose = () => this.setState({ addModalShow: false })
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <DataTable
                                columns={[
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
                                    },
                                    {
                                        name: 'Status',
                                        selector: 'status',
                                        sortable: true,
                                    },
                                    {
                                        name: 'Days Off',
                                        selector: 'daysOff',
                                        sortable: true,
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
                                noHeader
                                data={this.state.requests}
                            />
                        </Col>
                        <ModalActionBox employeeId={this.state.employeeId} value={this.state.daysOff}  id={this.state.selectedRow} show={this.state.addModalShow} onHide={addModalClose} />
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Table;