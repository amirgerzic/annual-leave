import React, { Component } from "react";
import {
    Modal,
    Row,
    Col,
    ControlLabel
} from "react-bootstrap";

class ModalUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            jobTitle: '',
            department: '',
            email: '',
            phone: '',
            username: '',
            daysAvailable: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ name: nextProps.selectedUser.name })
        this.setState({ username: nextProps.selectedUser.username })
        this.setState({ jobTitle: nextProps.selectedUser.jobTitle })
        this.setState({ department: nextProps.selectedUser.department })
        this.setState({ email: nextProps.selectedUser.email })
        this.setState({ phone: nextProps.selectedUser.phone })
        this.setState({ daysAvailable: nextProps.selectedUser.daysAvailable })
    }
    render() {

        return (
            <Modal
                {...this.props}
                size="sm"
                keyboard={false}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Employee Info
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form noValidate onSubmit={this.onSubmit}>

                        <Row>
                            <Col md={6}>
                                <ControlLabel>Name:</ControlLabel>
                                <div>
                                    <p>
                                        {this.state.name}
                                    </p>
                                </div>
                            </Col>
                            <Col md={6}>
                            <ControlLabel>Username:</ControlLabel>
                        <div>
                            <p>
                                {this.state.username}
                            </p>
                        </div>
                            </Col>
                        </Row>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col md={6}>
                                <ControlLabel>Email:</ControlLabel>
                                <div>
                            <p>
                                {this.state.email}
                            </p>
                        </div>
                            </Col>
                            <Col md={6}>
                                <ControlLabel>Phone Number:</ControlLabel>
                                <div>
                            <p>
                                {this.state.phone}
                            </p>
                        </div>
                            </Col>
                        </Row>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col md={6}>
                                <ControlLabel>Job TItle:</ControlLabel>
                                <div>
                            <p>
                                {this.state.jobTitle}
                            </p>
                        </div>
                            </Col>
                            <Col md={6}>
                            <ControlLabel>Department:</ControlLabel>
                            <div>
                            <p>
                                {this.state.department}
                            </p>
                        </div>
                        </Col>
                        </Row>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col md={6}>
                                <ControlLabel>Days Available:</ControlLabel>
                                <div>
                            <p>
                                {this.state.daysAvailable}
                            </p>
                        </div>
                            </Col>
                        </Row>
                        <br></br>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ModalUserInfo;