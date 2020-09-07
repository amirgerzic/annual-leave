import React, { Component } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";
import Checkbox from 'components/CustomCheckbox/CustomCheckbox';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { status, daysAvailable } from "components/UserFunctions/UserFunctions.js"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finalize: 0
        };
        this.onChange = this.onChange.bind(this)
        this.onFinalize = this.onFinalize.bind(this)
    }
    onFinalize(e){
        this.setState({finalize: e.target.value})
    }
    onChange(e) {
        const update = {
            _id: this.props.id,
            status: e.target.value,
            finalize: this.state.finalize
        }
        const data = {
            _id: this.props.employeeid,
            daysOff: this.props.value,
            status: e.target.value
        }
        status(update).then(res => {
            if (res === "Request Updated") {
                toast.success(res, {
                    autoClose: 2000
                })
                daysAvailable(data).then(res => {
                })
                window.setTimeout(function () { window.location = "" }, 2000)
            } else if(res ==="Request Finalized"){
                toast.success(res, {
                    autoClose: 2000
                })
                window.setTimeout(function () { window.location = "" }, 2000)
            }
            else{
                toast.warn(res, {
                    autoClose:2000
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
                        <Col mdOffset={2} md={8} className="justify-content-md-center">
                            <Button bsStyle="success" fill value="APPROVED"
                                onClick={this.onChange}>Approve</Button>
                            <Button bsStyle="danger" fill pullRight value="DENIED" onClick={this.onChange}>Deny</Button>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col mdOffset={2} md={8} className="justify-content-md-center">
                            <Checkbox
                                number="1"
                                value="1"
                                onClick={this.onFinalize}
                                label=" Finalize status"
                            /></Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalForm;