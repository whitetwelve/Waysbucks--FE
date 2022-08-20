import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap"
import "../../assets/css/AddProduct.css"
import IconUpload from "../../assets/img/ikon-upload.png"
import NoImg from "../../assets/img/no-photo.jpg"
import NavbarAdmin from '../../components/partials/NavbarAdmin'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom';
import { API } from "../../config/API"
import Rp from "rupiah-format"


const UpdateDrink = () => {
    const title = "Update Product"
    document.title = title

    const [message , setMessage] = useState(null)
    const [preview, setPreview] = useState(null)

    const { id } = useParams()
    const moving = useNavigate()

    const [updateProduct, setUpdateProduct] = useState({
        title : "",
        price : "",
        image : ""
    })
    const [product, setProduct] = useState({});

    // FETCH DATA PRODUCT
    const { data : productData, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id)
        return response.data.product
    })
    
    useEffect(() => {
        if(productData){
            setPreview(productData?.image)
            setUpdateProduct({
                ...updateProduct,
                title : productData?.title,
                price : productData?.price,
            })
            setProduct(productData)
        }
    },[productData])

    const handleOnChange = (e) => {
        setUpdateProduct(({
            ...updateProduct,
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
        if (updateProduct?.image) {
            formData.set('image', updateProduct?.image[0], updateProduct?.image[0]?.name);
          }
              formData.set('title', updateProduct.title);
              formData.set('price', updateProduct.price);
        
              // Insert product data
              const response = await API.patch(`/product/${id}`, formData, config);
              console.log(response);
        
          alert('Produk berhasil diupdate!')
          moving('/main-admin')
            } catch (error) {
              console.log(error);
            }
          });
          console.log(updateProduct);
          console.log(product);
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
                    {preview && (
                        <Col className="ms-4 mt-5">
                            <div className="img-detail-product ms-3 mt-3 mb-5">
                                <img src={preview || NoImg} />
                            </div>
                        </Col>
                        )}
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <Form.Control name="title" onChange={handleOnChange} autoComplete="off"
                                value={updateProduct?.title} className="formInputProduct" type="text" placeholder="Name Product" />
                        </Form.Group>
                        <Form.Group className="mb-2 mt-4" controlId="formInputProduct">
                            <Form.Control name="price" onChange={handleOnChange} autoComplete="off" 
                                value={Rp.convert(updateProduct?.price)} className="formInputProduct mt-4" type="text" placeholder="Price" />
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
                            {/* <Form.Control className="formInputProduct" name="image" 
                                value={ updateProduct?.image} type="text" placeholder="Photo Product" /> */}
                        </Form.Group>
                        <div className="btn-submit-prdct ms-5">
                            <button type='submit'>Update Product</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdateDrink