import React, { Component } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { status, daysAvailable } from "components/UserFunctions/UserFunctions.js"

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        console.log(this.props.value)
        console.log(this.props.status)
        const update = {
            _id: this.props.id,
            status: e.target.value
        }
        const data = {
            _id: this.props.employeeId,
            daysOff: this.props.value,
            status: e.target.value
        }
        status(update).then(res => {
            console.log(res)
            if (res === "Request Updated") {
                daysAvailable(data).then(res => {

                })
            }
        })
    }
    render() {
        return (
            <Modal
                {...this.props}
                bsSize="sm"
                backdrop="static"
                keyboard={false}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Update Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <Button bsStyle="success" fill value="APPROVED"
                                onClick={this.onChange}>Approve</Button>
                            <Button bsStyle="danger" fill pullRight value="DENIED" onClick={this.onChange}>Deny</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalForm;