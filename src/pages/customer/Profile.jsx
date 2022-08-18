import React, { useState, useContext } from 'react';
import "../../assets/css/Profile.css"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import DummyProductTransaction from "../../Dummies/TransactionCard"
import Logo from "../../assets/img/logo-waysbook.png"
import Bc from "../../assets/img/barcode.png"
import Rp from "rupiah-format"
import NavbarUser from '../../components/partials/NavbarUser';
import DummyProfile from "../../Dummies/Profile"
import Moment from "moment"
import { UserContext } from '../../context/user-context';
import Blank from "../../assets/img/blank-profile.png"
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const title = "Profile"
    document.title = title
    
    const [profileDummy] = useState(DummyProfile)
    const [state,_] = useContext(UserContext)
    
    const moving = useNavigate()
    const { email, fullname, image } = state.user
    const [DummyProduct] = useState(DummyProductTransaction)
    console.log(DummyProduct);

    let total = 0;

    DummyProduct.forEach((item) => {
        total += item?.price
    })

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
                        <img className="rounded" src={ state.user.image ? `http://localhost:5000/uploads/` + image : Blank } />
                    </div>
                </Col>
                <Col>
                    <div className="profile-data mt-5">
                        <div className="parents-profile-data">
                            <p>Full Name</p>
                        </div>
                        <div className="childs-profile-data mb-4">
                            <p>{fullname}</p>
                        </div>
                        <div className="parents-profile-data mt-5">
                            <p>Email</p>
                        </div>
                        <div className="childs-profile-data">
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className="btn-edit-profile mt-4">
                        <Button className="mt-4" variant="danger" type="submit"
                            onClick={() => moving('/')}>
                            Edit Profile
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div className="title-transaction">
                        <p>My Transaction</p>
                    </div>
                        <Card className="card-transaction mb-5">
                            {DummyProduct.map((item,index) => (
                                <div className="left-side-card d-flex" key={index}>
                                    <img className="rounded py-3 ms-3 me-3" src={item?.image}/>
                                    <div className="datas-transaction mt-4 ">
                                        <div className="title-names-transaction">
                                            <p>{item?.name}</p>
                                        </div>
                                        <div className="date-transaction">
                                            <p>
                                                {item?.day}, 
                                                <b className='times-new'>&nbsp;{Moment(item?.date).format('MMMM Do YYYY')}</b>
                                            </p>
                                        </div>
                                        <div className="toping-transaction">
                                            <div className="just-toping">
                                                Toping
                                                &nbsp; : <b className="times-new">
                                                    {item?.toping}
                                                </b>
                                            </div>
                                        </div>
                                        <div className="price-transaction mt-2">
                                            <b className='times-new mt-2'>Price : {Rp.convert(item?.price)}</b>
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
                                    <p className='position-absolute'>Sub Total : {Rp.convert(total)} </p>
                                </div>
                            </div>                             
                        </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile

