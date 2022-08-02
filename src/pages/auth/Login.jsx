import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../assets/css/Auth.css"
import { Form } from "react-bootstrap"

const Login = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button id="login-btn" className="mt-4" onClick={handleShow}>
        Login
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="header-login mb-4">
                <p className='mt-4 ms-3'>Login</p>
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
            <div className="btn-login ms-3">
                <button type='submit'>Login</button>
            </div>
            <div className="footer mt-3">
                <p className='ms-2'>
                    Don't have account ? Click <b>Here</b>
                </p>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login