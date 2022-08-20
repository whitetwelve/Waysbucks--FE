import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap"
import "../../assets/css/AddProduct.css"
import Navbar from "../../components/partials/NavbarUser"
import { useQuery, useMutation } from 'react-query';
import { API } from '../../config/API';
import { UserContext } from '../../context/user-context';
import IconUpload from "../../assets/img/ikon-upload.png"
import NoImg from "../../assets/img/blank-profile.png"
import { useNavigate, useParams } from 'react-router-dom';


const EditProfile = () => {

    const ttl = "Edit Profile"
    document.title = ttl

    const [state,_] = useContext(UserContext)
    const [preview, setPreview] = useState(null)
    const id = state.user.id
    const moving = useNavigate()
    console.log(state.user.id);
    const [fetchProfile, setFetchProfile] = useState({
        fullname : "",
        email : "",
        image : ""
    })
    const [updateProfile, setUpdateProfile] = useState({
        fullname : "",
        email : "",
        image : ""
    })

    const getProfiles = async () => {
        const response = await API.get(`/user/${id}`)
        setFetchProfile(response?.data?.users)
    }
     
    useEffect(() => {
        setPreview(fetchProfile?.image)
        getProfiles()
    },[])

    const handleOnChange = (e) => {
        setUpdateProfile({
            ...updateProfile,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
        if(e.target.type === 'file'){
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }
    
    console.log(preview);
    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            // Configuration
            const config = {
              headers: {
                'Content-type': 'multipart/form-data',
              },
            };
            const data = new FormData()
            
            if (updateProfile?.image) {
                data.set("image", updateProfile.image[0],updateProfile.image[0].name);
              }
            data.set("fullname", updateProfile.fullname)
            data.set("email", updateProfile.email)
            console.log(updateProfile.image);
            const response = await API.patch(`/user/${id}`, data, config);
            console.log(response)
            alert('Success update!')
            // moving("/profile")
        } catch (error) {
            console.log(error);
        }
    })
    console.log(fetchProfile);
    return (
        <Container>
        <Navbar/>
        <Row className="ms-5">
            <Col id="left-side-form" className="mt-4">
                <div className="header-title mt-5">
                    <p className="title-edit-profile mb-5">
                        Update Profile
                    </p>
                </div>
                <Form onSubmit={(e) => handleOnSubmit.mutate(e)} >
                    <Form.Group className="mb-4" controlId="formInputProduct">
                        <Form.Control name="fullname" autoComplete="off" className="formInputProduct" type="text" placeholder="Your Name" onChange={handleOnChange}
                        value={fetchProfile?.fullname}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2 mt-4" controlId="formInputProduct">
                        <Form.Control name="email" autoComplete="off" className="formInputProduct mt-4" 
                        value={fetchProfile.email} type="text" placeholder="Your Email" onChange={handleOnChange}
                        />
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
                        <Form.Control name="image" className="formInputProduct" type="text" placeholder="Your Photo"
                        value={fetchProfile?.image} onChange={handleOnChange}/>
                    </Form.Group>
                    <div className="btn-submit-prdct ms-5">
                        <button type='submit'>Edit Profile</button>
                    </div>
                </Form>
            </Col>
            <Col className="ms-4 mt-5">
            {preview && (
                <div className="img-detail-product ms-3 mt-3 mb-5">
                    <img src={ preview } />
                </div>
            )}
            </Col>
        </Row>
    </Container>

    )
}

export default EditProfile