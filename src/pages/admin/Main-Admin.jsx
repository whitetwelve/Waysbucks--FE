import React, { useState, useEffect } from 'react';
import Navbar from "../../components/partials/NavbarAdmin"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { API } from "../../config/API"
import "../../assets/css/Main.css"
import Rp from "rupiah-format"
import "../../assets/css/Auth.css"

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
        <>
              {/* LIST PRODUCTS */}
      <Container className="ms-5" >
        <Navbar/>
        <Row className="ms-5">
            <div className="footer-title mt-5">
                <p className="ms-5 mb-5">
                    List Products
                </p>
            </div>
            {products?.map((item, index) => (
                <Col className="mapping-card ms-5 mb-5" key={index}>
                    <Card id="card-main-admin">
                        <div className="img-drink">
                            <Card.Img id="per-img-product" variant="top" src={item?.image}/>
                        </div>
                        <div className="name-drink ms-2 mt-3">
                            <p>{item?.title}</p>
                        </div>
                        <div className="price-drink ms-2">
                            <p>{Rp.convert(item?.price)}</p>
                        </div>
                        <div className="btn-edit-delete mb-2">
                            <Button className="btn-list-products ms-2 me-2" variant="primary">Edit</Button>
                            <Button className="btn-list-products" variant="danger">Delete</Button>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
        {/* END LIST PRODUCTS */}
</>
    )
}

export default MainAdmin