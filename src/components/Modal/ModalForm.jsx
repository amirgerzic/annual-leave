import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton";

class ModalForm extends Component {
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
          Request
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" fill onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        )
    }
}

export default ModalForm;