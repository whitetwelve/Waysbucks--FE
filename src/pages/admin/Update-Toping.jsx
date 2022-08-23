import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/partials/NavbarAdmin';
import { useQuery, useMutation } from 'react-query';
import { Container, Row, Col, Form } from "react-bootstrap"
import { API } from '../../config/API';
import { useNavigate, useParams  } from 'react-router-dom';
import IconUpload from "../../assets/img/ikon-upload.png"
import NoImg from "../../assets/img/no-photo.jpg"

const UpdateToping = () => {
    const title = "Update Product"
    document.title = title

    const [preview, setPreview] = useState(null)

    const { id } = useParams()
    const moving = useNavigate()
    
    const [product, setProduct] = useState({})
    const [data, setData] = useState({
        title : "",
        price : "",
        image : ""
    })

    const { data : toppingData, refetch } = useQuery('toppingCache', async () => {
        const response = await API.get('/toping/' + id)
        return response.data.users
    })
    console.log(toppingData);
    useEffect(() => {
      if(toppingData){
      setPreview(toppingData?.image)
      setData({
        ...data,
        title : toppingData?.title,
        price : toppingData?.price
  })
}
    },[toppingData])
    console.log(data);
    console.log(preview);
          // Handle change data on form
          const handleChange = (e) => {
            setData({
              ...data,
              [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
              });
              // Create image url for preview
            if (e.target.type === 'file') {
              let url = URL.createObjectURL(e.target.files[0]);
              setPreview(url);
            }
          }
      
        const handleOnSubmit = useMutation(async (e) => {
          try {
            e.preventDefault();
        
            // Store data with FormData as object
              const formData = new FormData();
              if(data?.image){
                formData.set("image", data?.image[0], data?.image[0]?.name);
              }
              formData.set('title', data?.title);
              formData.set('price', data?.price);
            
           // Configuration
            const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              };
    
            // Insert product data
            const response = await API.patch(`/toping/${id}`,formData,config);    
            console.log(response.data);
            moving('/toppings');
          } catch (error) {
            console.log(error);
          }
        });
    return (
        <Container>
            <NavbarAdmin/>
            <Row className="ms-5">
                <Col id="left-side-form" className="mt-4">
                    <div className="header-title mt-5">
                        <p className="title-add-product mb-5">
                            Topping
                        </p>
                    </div>
                    <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <Form.Control name="title" value={data?.title} autoComplete="off" className="formInputProduct" type="text" placeholder="Name Topping" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-2 mt-4" controlId="formInputProduct">
                            <Form.Control name="price" value={data?.price} onChange={handleChange} autoComplete="off" className="formInputProduct mt-4" type="text" placeholder="Price"/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formInputProduct">
                            <input
                            type="file"
                            id="upload"
                            name="image"
                            onChange={handleChange}
                            hidden
                            />
                            <label for="upload" className="label-file-add-product">
                                <img className="position-absolute" src={IconUpload}/>
                            </label>
                            <Form.Control value={ preview } className="formInputProduct" type="text" placeholder="Photo Topping"/>
                        </Form.Group>
                        <div className="btn-submit-prdct ms-5">
                            <button type='submit'>Update Topping</button>
                        </div>
                    </Form>
                </Col>
                <Col className="ms-4 mt-5">
                    <div className="img-detail-product ms-3 mt-3 mb-5">
                        <img src={ preview || NoImg } />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default UpdateToping