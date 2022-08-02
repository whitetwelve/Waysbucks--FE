import React, { useState } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap"
import "../../assets/css/AddProduct.css"
import IconUpload from "../../assets/img/ikon-upload.png"


const AddDrink = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col id="left-side-form" className="mt-5">
                    <div className="header-title mt-5">
                        <p className="title-add-product mb-5">
                            Product
                        </p>
                    </div>
                    <Form >
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <Form.Control className="formInputProduct" type="text" placeholder="Name Product" />
                        </Form.Group>
                        <Form.Group className="mb-2 mt-4" controlId="formInputProduct">
                            <Form.Control className="formInputProduct mt-4" type="text" placeholder="Price" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <input
                            type="file"
                            id="upload"
                            name="image"
                            hidden
                            />
                            <label for="upload" className="label-file-add-product">
                                <img className="position-absolute" src={IconUpload}/>
                            </label>
                            <Form.Control className="formInputProduct" type="text" placeholder="Photo Product" />
                        </Form.Group>
                        <div className="btn-submit-prdct ms-5">
                            <button type='submit'>Add Product</button>
                        </div>
                    </Form>
                </Col>
                <Col className="ms-4 mt-5">
                    <div className="img-detail-product ms-3 mt-5 mb-5">
                        <img src="https://images.unsplash.com/photo-1499638673689-79a0b5115d87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AddDrink