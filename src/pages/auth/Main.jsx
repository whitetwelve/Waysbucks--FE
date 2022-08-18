import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"
import "../../assets/css/Main.css"
import Background from '../../components/bg/background'
import MainBg from "../../assets/img/background-main.png"
import Login from './Login'
import Register from "./Register"
import Logo from "../../assets/img/logo-waysbook.png"
import DummyData from "../../Dummies/Drink"
import Rp from "rupiah-format"
import { API } from "../../config/API"

function Main() {

    const title = "Authentication"
    document.title = title

    const [products, setProducts] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const handleCloseLogin = () => setShowLogin(false)
    const handleCloseRegister = () => setShowRegister(false)
    

    function switchRegister() {
        handleCloseLogin();
    
        setShowRegister(true);
      }
    
    function switchLogin() {
        handleCloseRegister();
    
        setShowLogin(true);
      }

    //   GET PRODUCTS
    const getProducts = async () => {
        const response = await API.get('/products')
        setProducts(response.data.products)
    }

    useEffect(() => {
        getProducts()
    },[])
    console.log(products);
  return (
    <>
        <div className="for-auth-btn">
            <button id="login-btn" className="mt-4"
                onClick={() => setShowLogin(true)} type="submit">
                Login
            </button>
            <button id="register-btn" className="mt-4 ms-3"
                onClick={() => setShowRegister(true)}>
                Register
            </button>
        </div>
        <Container>
                <Login  
                        show={showLogin}
                        handleClose={handleCloseLogin}
                        switchRegister={switchRegister}/>
                <Register   
                        show={showRegister}
                        handleClose={handleCloseRegister}
                        switchLogin={switchLogin}/>
            <div className="logo-waysbook">
                <img src={Logo} id="logo"/>
            </div>
            <Row>
                <Col className="mt-5">
                    <div className="card-item mt-2">
                        <Card id="card-home" className="mt-5">
                            <div className="title-card mt-5 ms-1">
                                <p className="mt-3 ms-5">
                                    WAYSBUCK
                                </p>
                            </div>
                            <div className="content-card ms-3 mt-1 ">
                                <p className="ms-5">
                                Things are changing, but we're still here for you
                                </p>
                            </div>
                            <div className="footer-card ms-5 mt-3">
                                <p className='ms-3'>
                                We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. <b>Waysbucks</b> Drivers is also available
                                <br/><br/>Let's Order...
                                </p>
                                
                            </div>
                                <Background/>
                                <img id="img-main-bg" className="ms-3" src={MainBg} />
                            </Card>
                        </div>
                    </Col>
            </Row>
        </Container>
        
                    {/* FOOTER CONTENT */}

        <Container className="ms-5" >
            <Row className="ms-5">
                <div className="footer-title mt-5">
                    <p className="ms-5 mb-5">
                        Let's Order
                    </p>
                </div>
                {products?.map((item, index) => (
                    <Col className="mapping-card ms-5 mb-5" key={index}>
                        <Card className="card-drink" onClick={() => {
                            setShowLogin(true)
                        }}>
                            <div className="img-drink">
                                <Card.Img id="per-img-product" variant="top" src={item?.image}/>
                            </div>
                            <div className="name-drink ms-2 mt-3">
                                <p>{item?.title}</p>
                            </div>
                            <div className="price-drink ms-2">
                                <p>{Rp.convert(item?.price)}</p>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
                        {/* END FOOTER CONTENT */}
        </>
  )
}

export default Main