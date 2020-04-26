import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';

class ModalDeleteQ extends Component {
constructor(props){
    super(props);
}

    render() {
        return (
            <>
     <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>Do you realy want to delete this object?</p></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
           onClick={this.props.onHide}
          >
            Yes
          </Button>
          <Button variant="primary" 
        onClick={this.props.onHide}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
        );
    }
}

export default ModalDeleteQ;