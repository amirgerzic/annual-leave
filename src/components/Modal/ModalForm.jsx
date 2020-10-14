import React, { Component } from "react";
import {
    Modal,
    Row,
    Col,
    ControlLabel
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";
import Select from 'react-select'
import { updateUser } from "components/UserFunctions/UserFunctions.js"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

toast.configure()
const options = [
    { value: 'user', label: 'Employee' },
    { value: 'hr', label: 'Human Resourses' }
]
class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocking: false,
            name: '',
            jobTitle: '',
            department: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            daysAvailable: '',
            typeOfUser: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.toggleBlocking = this.toggleBlocking.bind(this)
    }
    toggleBlocking() {
        this.setState({blocking: !this.state.blocking});
      }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onChangeSelect(e) {
        this.setState({ typeOfUser: e.value })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ name: nextProps.data.name })
        this.setState({ username: nextProps.data.username })
        this.setState({ password: nextProps.data.password })
        this.setState({ jobTitle: nextProps.data.jobTitle })
        this.setState({ department: nextProps.data.department })
        this.setState({ email: nextProps.data.email })
        this.setState({ phone: nextProps.data.phone})
        this.setState({ daysAvailable: nextProps.data.daysAvailable })
        this.setState({ typeOfUser: nextProps.data.typeOfUser })
    }

    onSubmit(e) {
        e.preventDefault()
        const user = {
            _id: this.props.data._id,
            name: this.state.name,
            jobTitle: this.state.jobTitle,
            department: this.state.department,
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
            password: this.state.password,
            daysAvailable: this.state.daysAvailable,
            typeOfUser: this.state.typeOfUser,
        }
        this.toggleBlocking()
        updateUser(user).then(res => {
            if (res.status === "Account Updated!") {
                toast.success(res.status, {
                    autoClose: 2000,
                    position: "top-center",
                })
                window.setTimeout(function () { window.location = "" }, 2000)
            }
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
                <BlockUi tag="div" blocking={this.state.blocking}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Update Request
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form noValidate onSubmit={this.onSubmit}>

                        <Row>
                            <Col md={6}>
                                <ControlLabel>Username</ControlLabel>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                            </Col>
                            <Col md={6}>
                                <ControlLabel>New Password</ControlLabel>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                        <ControlLabel>Name</ControlLabel>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Full Name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        <Row>
                            <Col md={6}>
                                <ControlLabel>Email</ControlLabel>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </Col>
                            <Col md={6}>
                                <ControlLabel>Phone Number</ControlLabel>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    placeholder="phone"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <ControlLabel>Job TItle</ControlLabel>
                                <input
                                    className="form-control"
                                    name="jobTitle"
                                    placeholder="Job Title"
                                    value={this.state.jobTitle}
                                    onChange={this.onChange}
                                />
                            </Col>
                        </Row>
                        <Col >
                            <ControlLabel>Department</ControlLabel>
                            <input
                                className="form-control"
                                name="department"
                                placeholder="Department"
                                value={this.state.department}
                                onChange={this.onChange}
                            />
                        </Col>
                        <Row>
                            <Col md={6}>
                                <ControlLabel>Days</ControlLabel>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="daysAvailable"
                                    placeholder="Days Available"
                                    value={this.state.daysAvailable}
                                    onChange={this.onChange}
                                />
                            </Col>
                            <Col md={6}>
                                <ControlLabel>Type</ControlLabel>
                                <Select
                                    placeholder={this.state.typeOfUser}
                                    onChange={this.onChangeSelect}
                                    options={options}
                                />
                            </Col>
                        </Row>
                        <br></br>
                        <Button bsStyle="info" pullRight fill type="submit">
                            Update
                    </Button>
                        <div className="clearfix" />
                    </form>
                </Modal.Body>
                </BlockUi>
            </Modal>
        )
    }
}

export default ModalForm;