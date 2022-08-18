import React, { useState, useEffect } from 'react';
import Navbar from "../../components/partials/NavbarAdmin"
import { Container, Row, Col, Card } from "react-bootstrap"
import { API } from "../../config/API"
import "../../assets/css/Main.css"

const MainAdmin = () => {
    const ttl = "Home Admin"
    document.title = ttl 

    const [products, setProducts] = useState([])
    
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
        <Container>
            <Navbar/>
            <div className="title-products-admin">
                List Products
            </div>
            <Row>
                <Col>
                    <Card>
                        Card.bod
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default MainAdmin