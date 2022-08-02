import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap"
import Example from "../../assets/img/drink1.png"
import exToping from "../../assets/img/topping1.png"
import "../../assets/css/AddTopping.css"
import DummyTopping from "../../DummyData/Topping"
import { useParams } from 'react-router-dom';
import DummyDrinks from "../../DummyData/Drink"

const AddTopping = () => {
    const title = ' Detail Product '
    document.title = title 

    const id = useParams()
    console.log(id);
    const [topping] = useState(DummyTopping)

    const [drinksDummy] = useState(DummyDrinks)

    return (
        <Container>
            <Row className="mt-5">
                <Col className="detail-drink mt-5">
                    <img id="detail-img-drink" className='mt-4' src={Example}/>
                </Col>
                <Col id="right-side-addtpg" className="mt-5">
                    <div className="title-detail-product">
                        <p className="mt-4">Ice Coffee Palm Sugar</p>
                    </div>
                    <div className="price-drink">
                        <p className="mt-2">27.000</p>
                    </div>
                    <div className="toping-add mt-5">
                        <p className='mt-2 ms-3'>Toping</p>
                    </div>

                    {/* MAPPING */}
                    <Row>
                    {topping.map((item, index) => (
                        <div key={index} className="topping-datas ms-4 col">
                            <div className="img-data-toping mt-3">
                                <img className="mb-3" src={item?.img} />
                                <p className="mb-5">{item?.name}</p>
                            </div>
                            {/* <div className="price-data-toping ms-4 mb-5">
                                    <p>{item?.price}</p>
                                </div> */}
                        </div>
                    ))}
                    {/* END MAPPING */}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AddTopping