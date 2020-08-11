import React, { Component } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { status } from "components/UserFunctions/UserFunctions.js"

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        };
        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onClick(e) {
        this.setState({ status: e.target.value})
        this.onChange(e)
    }
    onChange(){
        console.log(this.state.status)
        const update = {
            _id: this.props.value,
            status: this.state.status
        }
        status(update).then(res => {
            
        })
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
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
                        <Col mdOffset={2} md={3}>
                            <Button bsStyle="success" fill  value= "APPROVED"
                                onClick={this.onClick}>Approve</Button>
                        </Col>
                        <Col mdOffset={2} md={3}>
                            <Button bsStyle="danger" fill value= "DENIED" onClick={this.onClick}>Deny</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalForm;