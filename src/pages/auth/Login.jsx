import React, { useState, useContext } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import "../../assets/css/Auth.css"
import { Form } from "react-bootstrap"
import { UserContext } from '../../context/user-context';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from "../../config/API"

const Login = ({ show , handleClose, switchRegister }) => {
    
    const moving = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null)
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

    const handleOnSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
      
          // CONFIG TYPE DATA
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
      
          // CONVERT DATA TO STRING
          const body = JSON.stringify(getData);
          console.log(getData);
          // INPUT DATA
          const response = await API.post('/login', body, config);
          const { status, fullname } = response.data.users
          console.log(response.data.users);
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.users
          })
          
          if(status == 'customer'){
            alert(`Welcome ${fullname} !`)
            moving('/')
          } else if(status == 'admin'){ 
            alert(`Welcome ${fullname} !`)
            moving('/transaction')
          } else {
            alert("Ga bisa login ya ?")
          }
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-3">
              {error.response.data.message}
            </Alert>
          )
          console.error(error);
          setMessage(alert)
        }
      })

  return (
    <>
    {/* MODAL 2ND--- */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
            <div className="header-login mb-4">
                <p className='mt-4 ms-3'>Login</p>
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