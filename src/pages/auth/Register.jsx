import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../assets/css/Auth.css"
import { Form } from "react-bootstrap"
import { UserContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';

const Register = ({ show, handleClose, switchLogin }) => {

    const [ state, dispatch ] = useContext(UserContext)
    console.log(state);
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

    const forHandleSubmit = (e) => {
        e.preventDefault()
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value
        const fullname = document.getElementById('fullnameInput').value

        dispatch({
            type:'REGISTER_SUCCESS',
            payload: {
                email,
                password,
                fullname
            }
        })

        if(state.isRegister == true) {
            moving(show)
            alert('Register Success!')
        } else {
            alert('Register Success!')
        }
    }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="header-login mb-4">
                <p className='mt-4 ms-3'>Register</p>
            </div>
        <Form onSubmit={ forHandleSubmit }>
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