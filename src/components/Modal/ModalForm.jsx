import React, { Component } from "react";
import {
    Modal,
    Row,
    Col,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";
import Select from 'react-select'
import { updateUser } from "components/UserFunctions/UserFunctions.js"

const options = [
    { value: 'user', label: 'Employee' },
    { value: 'hr', label: 'Human Resourses' }
]
class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            jobDescription: '',
            username: '',
            password: '',
            daysAvailable: '',
            typeOfUser: ''
        };
        this.onChange = this.onChange.bind(this)
        this.onChangeSelect = this.onChangeSelect.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.props.data._id)
    }

    onChangeSelect(e) {
        this.setState({ typeOfUser: e.value })
        //  console.log(this.state.name)
        //  userDataById(user).then(res => {
        //      console.log(res.data)
        //  })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({name: nextProps.data.name})
        this.setState({username: nextProps.data.username})
        this.setState({password: nextProps.data.password})
        this.setState({jobDescription: nextProps.data.jobDescription})
        this.setState({daysAvailable: nextProps.data.daysAvailable})
        this.setState({typeOfUser: nextProps.data.typeOfUser})
    }

    onSubmit(e) {
        e.preventDefault()
        const user = {
            _id: this.props.data._id,
            name: this.state.name,
            jobDescription: this.state.jobDescription,
            username: this.state.username,
            password: this.state.password,
            daysAvailable: this.state.daysAvailable,
            typeOfUser: this.state.typeOfUser,
        }
        updateUser(user).then(res => {
            console.log(res)
            window.location.reload(false)
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
                                <ControlLabel>Password</ControlLabel>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
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
                        <ControlLabel>Job description</ControlLabel>
                        <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            name="jobDescription"
                            placeholder="Job Decription"
                            value={this.state.jobDescription}
                            onChange={this.onChange}
                        />
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
            </Modal>
        )
    }
}

export default ModalForm;