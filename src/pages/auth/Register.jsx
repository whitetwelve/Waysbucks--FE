import React, { useState, useContext } from 'react';
import "../../assets/css/Auth.css"
import { Form, Modal, Alert } from "react-bootstrap"
import { UserContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from "react-query"
import { API } from "../../config/API"

const Register = ({ show, handleClose, switchLogin }) => {

    const [ state, dispatch ] = useContext(UserContext)
    const [message, setMessage] = useState(null)
    const [ getData, setGetData ] = useState({
        email : "",
        password : "",
        fullname : ""
    })

    const moving = useNavigate()

    const forChangeInput = (e) => {
        setGetData({
            ...getData,
            [e.target.name] : e.target.value     
        })
        console.log(e.target.value);
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
      
          // Configuration Content-type
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
      
          // Data body
          const body = JSON.stringify(getData);
          
          // Insert data user to database
          const response = await API.post('/register', body, config);
          
          const alert = (
            <Alert variant="success" className='py-3'>
              Regist akun berhasil!
            </Alert>
          )
          setMessage(alert)
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="as">
             {error.message}
            </Alert>
          );
          setMessage(alert);
          console.log(error);
        }
      });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="header-login mb-4">
                <p className='mt-4 ms-3'>Register</p>
            </div>
            {message}
        <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
            <div className="email-input ms-3">
                <Form.Control
                    type="text"
                    id="emailInput"
                    name="email"
                    placeholder='Email'
                    autoComplete='off'
                    onChange={ forChangeInput }
                />
            </div>
            <div className="password-input ms-3 mt-3">
                <Form.Control
                    type="password"
                    id="passwordInput"
                    name="password"
                    placeholder='Password'
                    autoComplete='off'
                    onChange={ forChangeInput }
                />
            </div>
            <div className="fullname-input ms-3 mt-3">
                <Form.Control
                    type="text"
                    id="fullnameInput"
                    name="fullname"
                    placeholder='Full Name'
                    autoComplete='off'
                    onChange={ forChangeInput }
                />
            </div>
            <div className="btn-login ms-3">
                <button type='submit'>Register</button>
            </div>
        </Form>
            <div className="footer mt-3">
                <p className='ms-2'>
                    Already have an account ? Click <b onClick={switchLogin}>Here</b>
                </p>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register