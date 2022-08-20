import React, { useState, useEffect } from 'react';
import Navbar from "../../components/partials/NavbarAdmin"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { API } from "../../config/API"
import "../../assets/css/Main.css"
import Rp from "rupiah-format"
import "../../assets/css/Auth.css"
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Delete from "../../components/modal/DeleteData"

const MainAdmin = () => {
    const ttl = "Home Admin"
    document.title = ttl 

    const [deleteOne, setDeleteOne] = useState(null)
    const [confirmDelete,setConfirmDelete] = useState(null)

    const [message, setMessage] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const moving = useNavigate()

    const { id } = useParams()
    console.log(id);

        //   GET PRODUCTS
    let {data: products, refetch} = useQuery('productsCache', async () => {
        const response = await API.get('/products')
        return response.data.products
      })
          console.log(products);

    // DELETE 
    const handleDelete = (id) => {
        setDeleteOne(id);
        handleShow();
      };
    
    // UPDATE PRODUCT
    const editProduct = (id) => {
        moving('/update-product/' + id)
    } 

    //   MUTATE DELETE
    const deleteById = useMutation(async (id) => {
        try {
          const response = await API.delete(`/product/${id}`);
          console.log(response);

          refetch()
        } catch (error) {
          console.log(error);
        }
      });
    
    //  LIFECYCLE DELETE
    useEffect(() => {
        if (confirmDelete) {
          // Close modal confirm delete data
          handleClose();
          // execute delete data by id function
          deleteById.mutate(deleteOne);
          setConfirmDelete(null);
        }
      }, [confirmDelete]);

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
                <Col className="mapping-card ms-5 mb-5" >
                    <Card id="card-main-admin" key={index}>
                        <div className="img-drink">
                            <Card.Img id="per-img-product" src={item?.image} variant="top" />
                        </div>
                        <div className="name-drink ms-2 mt-3">
                            <p>{item?.title}</p>
                        </div>
                        <div className="price-drink ms-2">
                            <p>{Rp.convert(item?.price)}</p>
                        </div>
                        <div className="btn-edit-delete mb-2">
                            <Button onClick={() => {
                                editProduct(item.id)
                            }} 
                            className="btn-list-products ms-2 me-2" variant="primary">Edit</Button>
                            <Button onClick={() => {
                              handleDelete(item.id);
                            }} className="btn-list-products" variant="danger">Delete</Button>
                        </div>
                        <Delete
                            setConfirmDelete={setConfirmDelete}
                            show={show}
                            handleClose={handleClose}
                            />
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