import React, {useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

const ConfirmationModal = React.forwardRef((props, ref) => {
  // console.log(">> ", props);
  const {text, getconfirm} = props
  // Handle form submission
  const handleSubmit = async () => {
    getconfirm(true);    
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        props.onHide();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [props]);


  return (
    // backdrop="static"
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter"
      keyboard={false} size="lg" ref={ref}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <i className="bi bi-exclamation-triangle-fill"></i> Confirmation
          <p className='subText'>Confirm the below given statement</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <form className="space-y-4">
          <Row>
            <Col xs={12} md={12} lg={12} className='commLeftRightPadding text-center mt-4'>
              <h3>{text}</h3>
            </Col>
          </Row>

          <Row className='justify-end'>
            <Col xs={4} md={3} lg={3} className='commLeftRightPadding'>
              <button type="button" onClick={props.onHide} className="btn btn-primary mt-4 w-full justify-center rounded-md">Cancel</button>
            </Col>
            <Col xs={6} md={3} lg={3} className='commLeftRightPadding'>
              <button type="button" onClick={handleSubmit} className="btn btn-danger mt-4 w-full justify-center rounded-md"><i className="bi bi-trash3"></i> Delete</button>
            </Col>
            
          </Row>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default ConfirmationModal;