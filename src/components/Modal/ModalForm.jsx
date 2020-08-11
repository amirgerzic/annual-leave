import React, { Component } from "react";
import { Modal, ControlLabel } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";
import { Form, TextArea, Select } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { request } from "../UserFunctions/UserFunctions.js"

const options = [
    { key: '1', value: 'sick', text: 'Sick Leave' },
    { key: '2', value: 'vacation', text: 'Vacation' },
    { key: '4', value: 'hometime', text: 'Hometime' },
    { key: '3', value: 'other', text: 'Other' },
]
class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: '',
            additionalInfo: '',
        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const leave = {
            reason: this.state.reason,
            additionalInfo: this.state.additionalInfo
        }
        request(leave).then(res => {
            console.log(res.error)
          })
    }
    render() {

        return (
            <Modal
                {...this.props}
                size="lg"
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Request a Leave
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit}>
                        <ControlLabel>Reason</ControlLabel>
                        <br></br>
                        <Select
                        onChange={this.onChange} placeholder='Select Reason for leave' options={options} />
                        <br></br>
                        <br></br>
                        <ControlLabel>Additional Info</ControlLabel>
                        <TextArea
                        onChange={this.onChange} placeholder='Tell us more' />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" fill type="submit" onClick={this.props.onHide}>Request</Button>
                    <Button bsStyle="danger" fill onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalForm;