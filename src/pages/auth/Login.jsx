import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../assets/css/Auth.css"
import { Form } from "react-bootstrap"
import { UserContext } from '../../context/user-context';


const Login = ({ show , handleClose, switchRegister }) => {
    
    const [state, dispatch] = useContext(UserContext)
    console.log(state);
    const [getData, setGetData] = useState({
        email : "",
        password : "",
    })


    const forChangeInput = (e) => {
        setGetData({
            ...getData,
            [e.target.name] : e.target.value     
        })
    }

    const forHandleSubmit = (e) => {
        e.preventDefault()
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value

        dispatch({
            type:'LOGIN_SUCCESS',
            payload: {
                email,
                password,
            }
        })

        if(state.user.email !== "fuad@mail.com" || "inggil@mail.com" || "admin@mail.com") {
            alert('Masukkan alamat email dengan benar')
        }
    }

  return (
    <>
    {/* MODAL 2ND--- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="header-login mb-4">
                <p className='mt-4 ms-3'>Login</p>
            </div>
            <Form onSubmit={forHandleSubmit}>
                <div className="email-input ms-3">
                    <Form.Control
                        type="text"
                        id="emailInput"
                        name="email"
                        placeholder='Email'
                        autoComplete='off'
                        onChange={forChangeInput}
                    />
                </div>
                <div className="password-input ms-3 mt-3">
                    <Form.Control
                        type="password"
                        id="passwordInput"
                        name="password"
                        placeholder='Password'
                        autoComplete='off'
                        onChange={forChangeInput}
                    />
                </div>
                <div className="btn-login ms-3">
                    <button type='submit'>Login</button>
                </div>
            </Form>
            <div className="footer mt-3">
                <p className='ms-2'>
                    Don't have account ? Click <b onClick={switchRegister}>Here</b>
                </p>
            </div>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default Login