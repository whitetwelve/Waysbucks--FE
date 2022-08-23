import React, { useState, useContext } from 'react';
import "../../assets/css/Profile.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import DummyProductTransaction from "../../Dummies/TransactionCard"
import Logo from "../../assets/img/logo-waysbook.png"
import Bc from "../../assets/img/barcode.png"
import Rp from "rupiah-format"
import NavbarUser from '../../components/partials/NavbarUser';
import Moment from "moment"
import { UserContext } from '../../context/user-context';
import Blank from "../../assets/img/blank-profile.png"
import { useNavigate } from 'react-router-dom';
import { API } from "../../config/API"
import { useEffect } from 'react';

const Profile = () => {

    const title = "Profile"
    document.title = title
    
    const [state,_] = useContext(UserContext)
    console.log(state);
    const idx = state.user.id
    console.log(idx);
    const moving = useNavigate()
    const { email, fullname, image, post_code, address } = state.user

    const [data, setData] = useState({})
    const [DummyProduct] = useState(DummyProductTransaction)
    const [transData, setTransData] = useState([])
    let total = 0;

    DummyProduct.forEach((item) => {
        total += item?.price
    })

    // GET PROFILE DATA
    const getProfile = async () => {
        const response = await API.get('/user/' + idx)
        setData(response?.data?.users)
    } 

    // GET CART DATA
    const getTrans = async () => {
        const response = await API.get('/carts')
        setTransData(response?.data?.carts)
    } 
    console.log(transData);
    useEffect(() => {
        getProfile()
        getTrans()
    },[])

    const movingToEditProfile = () => {
        moving('/edit-profile/' + idx)
    }
    const addCart = localStorage.getItem("Tambah")
    return (
        <Container>
            <NavbarUser plusOne={addCart}/>
            <Row>
                <div className="header-title-profile mt-5">
                    <p className="py-3 fw-bolder">My Profile</p>
                </div>
                <Col>
                    <div className="img-profile mt-4 me-3">
                        <img className="rounded" src={ data.image || Blank } />
                    </div>
                </Col>
                <Col>
                    <div className="profile-data mt-5">
                        <div className="parents-profile-data">
                            <p>Full Name</p>
                        </div>
                        <div className="childs-profile-data mb-4">
                            <p>{data?.fullname}</p>
                        </div>
                        <div className="parents-profile-data mt-5">
                            <p>Email</p>
                        </div>
                        <div className="childs-profile-data">
                            <p>{data?.email}</p>
                        </div>
                        <div className="parents-profile-data mt-5">
                            <p>Address</p>
                        </div>
                        <div className="childs-profile-data">
                            <p>{data?.address}</p>
                        </div>
                        <div className="parents-profile-data mt-5">
                            <p>Post Code</p>
                        </div>
                        <div className="childs-profile-data">
                            <p>{data?.post_code}</p>
                        </div>
                    </div>
                    <div className="btn-edit-profile mt-4">
                        <Button className="mt-4" variant="danger" type="submit"
                            onClick={movingToEditProfile}>
                            Edit Profile
                        </Button>
                    </div>
                </Col>
                <Col >
                    <div className="title-transaction">
                        <p>My Transaction</p>
                    </div>
                        <Card className="card-transaction mb-5">
                            {transData.map((item,index) => (
                                <div className="left-side-card d-flex" key={index}>
                                    <img className="rounded py-3 ms-3 me-3" src={`http://localhost:5000/uploads/` + item?.product?.image}/>
                                    <div className="datas-transaction mt-4 ">
                                        <div className="title-names-transaction">
                                            <p>{item?.product?.title}</p>
                                        </div>
                                        <div className="date-transaction">
                                            <p>
                                            {Moment(item?.created_at).format('dddd')}  
                                                <b className='times-new'>&nbsp;{Moment(item?.created_at).format('MMMM Do YYYY')}</b>
                                            </p>
                                        </div>
                                        <div className="toping-transaction">
                                            <div className="just-toping">
                                                Toping
                                                &nbsp; : <b className="times-new" >
                                                    {item?.toping?.index?.title}
                                                </b>
                                            </div>
                                        </div>
                                        <div className="price-transaction mt-2">
                                            <b className='times-new mt-2'>Price : {Rp.convert(item?.subamount)}</b>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="right-side-card position-absolute">
                                <div className="logo-transaction">
                                    <img className="position-absolute" src={Logo} />    
                                </div>
                                <div className="barcode-transaction">
                                    <img className="position-absolute" src={Bc} />
                                </div> 
                                <div className="button-transaction">
                                    <button className="position-absolute">
                                        .
                                    </button>
                                    <b className='fw-bold position-absolute'>On The Wayt</b>
                                </div>
                                <div className="sub-total-transaction">
                                    <p className='position-absolute'>Sub Total : {Rp.convert(50000)} </p>
                                </div>
                            </div>                             
                        </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile

