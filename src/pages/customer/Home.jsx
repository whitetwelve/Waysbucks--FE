import React, { useState } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../../assets/css/Main.css"
import Background from '../../components/background'
import MainBg from "../../assets/img/background-main.png"
import DummyData from "../../DummyData/Drink"
import Rp from "rupiah-format"
import NavbarUser from '../../components/partials/NavbarUser'


const Home = ({show}) => {

    const title ="Home"
    document.title = title
    const [drinks] = useState(DummyData)
    console.log(drinks);
    const moving = useNavigate()

    const moveToDetailDrink = (id) => {
        moving('/detail-drink/' + id)
    }

    const addCart = localStorage.getItem("Tambah")
  return (
    <>
        <Container>
            <NavbarUser plusOne={addCart}/>
            <Row>
                <Col>
                    <div className="card-item">
                        <Card id="card-home" className="mt-5">
                            <div className="title-card mt-5 ms-1">
                                <p className="mt-3 ms-5">
                                    WAYSBUCK
                                </p>
                            </div>
                            <div className="content-card ms-3 mt-1 ">
                                <p className="ms-5">
                                Things are changing, but we're still here for you
                                </p>
                            </div>
                            <div className="footer-card ms-5 mt-3">
                                <p className='ms-3'>
                                We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. <b>Waysbucks</b> Drivers is also available
                                <br/><br/>Let's Order...
                                </p>
                            </div>
                                <Background/>
                                <img id="img-main-bg" className="ms-3" src={MainBg} />
                            </Card>
                        </div>
                    </Col>
            </Row>
        </Container>


                    {/* FOOTER CONTENT */}

        <Container className="ms-5" >
            <Row className="ms-5">
                <div className="footer-title mt-5">
                    <p className="ms-5 mb-5">
                        Let's Order
                    </p>
                </div>
                {drinks.map((item, index) => (
                    <Col className="mapping-card ms-5 mb-5" key={index}>
                        <Card className="card-drink" >
                            <div className="img-drink">
                                <Card.Img id="per-img-product" variant="top" src={item?.img} onClick={() => moveToDetailDrink(item?.id)}/>
                            </div>
                            <div className="name-drink ms-2 mt-3">
                                <p>{item?.name}</p>
                            </div>
                            <div className="price-drink ms-2">
                                <p>{Rp.convert(item?.price)}</p>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
                        {/* END FOOTER CONTENT */}
        </>
  )
}

export default Home