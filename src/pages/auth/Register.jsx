import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../assets/css/Auth.css"
import { Form } from "react-bootstrap"

const Register = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button id="register-btn" className="mt-5 ms-3" onClick={handleShow}>
        Register
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="header-login mb-4">
                <p className='mt-4 ms-3'>Register</p>
            </div>
            <div className="email-input ms-3">
                <Form.Control
                    type="text"
                    id="emailInput"
                    name="email"
                    placeholder='Email'
                />
            </div>
            <div className="password-input ms-3 mt-3">
                <Form.Control
                    type="text"
                    id="passwordInput"
                    name="password"
                    placeholder='Password'
                />
            </div>
            <div className="fullname-input ms-3 mt-3">
                <Form.Control
                    type="text"
                    id="fullnameInput"
                    name="fullname"
                    placeholder='Full Name'
                />
            </div>
            <div className="btn-login ms-3">
                <button type='submit'>Register</button>
            </div>
            <div className="footer mt-3">
                <p className='ms-2'>
                    Already have an account ? Click <b>Here</b>
                </p>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register