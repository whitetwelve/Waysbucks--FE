import React, { useState } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap"
import "../../assets/css/AddProduct.css"
import IconUpload from "../../assets/img/ikon-upload.png"
import NoImg from "../../assets/img/no-photo.jpg"
import NavbarAdmin from '../../components/partials/NavbarAdmin'

const AddDrink = () => {
    const title = "Add Drink"
    document.title = title

    const [preview, setPreview] = useState(null)
    const [addProduct, setAddProduct] = useState({
        name : "",
        price : "",
        image : ""
    })

    const handleOnChange = (e) => {
        setAddProduct(({
            ...addProduct,
            [e.target.name]:e.target.type === 'file' ? e.target.files : e.target.value
          }))

          if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
          }
        };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        
        alert('Data added sucesfully!')
    }
    console.log(addProduct);
    return (
        <Container>
            <NavbarAdmin/>
            <Row className="ms-5">
                <Col id="left-side-form" className="mt-4">
                    <div className="header-title mt-5">
                        <p className="title-add-product mb-5">
                            Product
                        </p>
                    </div>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <Form.Control name="name" onChange={handleOnChange} autoComplete="off" className="formInputProduct" type="text" placeholder="Name Product" />
                        </Form.Group>
                        <Form.Group className="mb-2 mt-4" controlId="formInputProduct">
                            <Form.Control name="price" onChange={handleOnChange} autoComplete="off" className="formInputProduct mt-4" type="text" placeholder="Price" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <input
                            type="file"
                            id="upload"
                            name="image"
                            onChange={handleOnChange}
                            hidden
                            />
                            <label for="upload" className="label-file-add-product">
                                <img className="position-absolute" src={IconUpload}/>
                            </label>
                            <Form.Control className="formInputProduct" value={preview} type="text" placeholder="Photo Product" />
                        </Form.Group>
                        <div className="btn-submit-prdct ms-5">
                            <button type='submit'>Add Product</button>
                        </div>
                    </Form>
                </Col>
                <Col className="ms-4 mt-5">
                    <div className="img-detail-product ms-3 mt-3 mb-5">
                        <img src={preview || NoImg} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AddDrink