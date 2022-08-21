import React, { useState } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap"
import "../../assets/css/AddProduct.css"
import IconUpload from "../../assets/img/ikon-upload.png"
import NoImg from "../../assets/img/no-photo.jpg"
import NavbarAdmin from '../../components/partials/NavbarAdmin'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { API } from "../../config/API"

const AddDrink = () => {
    const title = "Add Product"
    document.title = title

    const moving = useNavigate()
    const [message , setMessage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [addProduct, setAddProduct] = useState({
        title : "",
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

        const handleOnSubmit = useMutation(async (e) => {
            try {
              e.preventDefault();
        
              // Configuration
              const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              };
        
        // Store data with FormData as object
        const formData = new FormData();
              formData.set('image', addProduct.image[0], addProduct.image[0].name);
              formData.set('title', addProduct.title);
              formData.set('price', addProduct.price);
        
              // Insert product data
              const response = await API.post('/product', formData, config);
              console.log(response);
        
          alert('Produk berhasil ditambahkan!')
            } catch (error) {
              console.log(error);
            }
          });
          console.log(preview);
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
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <Form.Control name="title" onChange={handleOnChange} autoComplete="off" className="formInputProduct" type="text" placeholder="Name Product" />
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
                            <Form.Control className="formInputProduct" value={addProduct?.image[0]?.name} type="text" placeholder="Photo Product" />
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