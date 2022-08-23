import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import { useParams,useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import Navbar from "../../components/partials/NavbarAdmin"
import { API } from '../../config/API';
import DeleteData from '../../components/modal/DeleteData';
import "../../assets/css/Auth.css"

const ListTopping = () => {

    const judul = "List Topping"
    document.title = judul

    const [deleteOne, setDeleteOne] = useState(null)
    const [confirmDelete,setConfirmDelete] = useState(null)

    const [toppings, setToppings] = useState([])

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const moving = useNavigate()

    const { id } = useParams()

        //   GET TOPINGS
        const getToppings = async () => {
            const response = await API.get('/topings')
            setToppings(response?.data?.users)
        }

        // DELETE TOPING
        const handleDeleteToping = (id) => {
            console.log(id);
            setDeleteOne(id);
            handleShow();
          };
        
        // UPDATE TOPPING
    const editTopping = (id) => {
        moving('/update-toping/' + id)
    } 

        //   MUTATE DELETE TOPING
        const deleteTopingId = useMutation(async (id) => {
            try {
              const response = await API.delete(`/toping/${id}`);
               console.log(response);       
            
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
              deleteTopingId.mutate(deleteOne);
              setConfirmDelete(null);
            }
          }, [confirmDelete]);
        
          useEffect(() => {
            getToppings()
          },[toppings])
          console.log(toppings);
    return (
        <Container>
            <Navbar/>
        <div className="title-table mb-4 mt-4">
            List Toppings
        </div>
            <Table striped bordered hover className='mb-5'>
            <thead>
                <tr>
                    <th scope="col" class="bg-secondary bg-opacity-10">ID</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Title</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Price</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Image</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Action</th>
                </tr>
            </thead>
            <tbody>
            {toppings.map((data, idx) => (
            <tr key={idx}>
                <th scope="row">{data?.id}</th>
                <td>{data.title}</td>
                <td>{data.price}</td>
                <td className='img-topping'>
                    <img id="upload-toping" className='rounded-circle' src={data?.image} />
                </td>
                <td className="btn-toppings">
                    <Button onClick={ () => 
                        editTopping(data?.id)}
                        className="buttons" variant ="success">Edit</Button>
                    <Button onClick={() => {
                              handleDeleteToping(data.id);
                            }}
                        className="buttons" variant ="danger">Delete</Button>
                </td>
            </tr>
            ))}
            <DeleteData
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}/>
            </tbody>
            </Table>
    </Container>
    )
}

export default ListTopping