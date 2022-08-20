import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import { Container, Row, Col } from "react-bootstrap"
import Rp from "rupiah-format"
import "../../assets/css/DetailProduct.css"
import DummyTopping from "../../Dummies/Topping"
import { useParams } from 'react-router-dom';
import NavbarUser from "../../components/partials/NavbarUser";
import { useQuery } from "react-query"
import { API } from "../../config/API"

const DetailProduct = () => {
    const title = ' Detail Product '
    document.title = title 
    const [cartCounter, setCartCounter] = useState(0)
    
    // GET PRODUCT
    const [gettingProduct, setGettingProduct] = useState({})
    const { id } = useParams()
    const getDetailProduct = async () => {
        const response = await API.get(`/product/${id}`)
        setGettingProduct(response.data.product)
    }

    // GET TOPPINGS
    const [gettingToppings, setGettingToppings] = useState([])
    const [checkedToping, setCheckedToping] = useState([])
    const getToppings = async () => {
        const res = await API.get(`/topings`)
        setGettingToppings(res.data.users)
    }

    // FETCH
    useEffect(() => {
        getDetailProduct()
        getToppings()
    },[])
    console.log(gettingToppings);

    const handleChangeToping = (e) => {
        const id = e.target.value
        const checked = e.target.checked

        if (checked) {
            setCheckedToping([...checkedToping, parseInt(id)]);
          } else {
            let newTopingId = checkedToping.filter((topingId) => {
              return topingId != id;
            });
            setCheckedToping(newTopingId);
          }
    }

    const [checkedState, setCheckedState] = useState(
        new Array(DummyTopping.length).fill(false)
    );

    const [total, setTotal] = useState(0);

    const handleOnchage = (id) => {
        const updateCheckedState = checkedState.map((item, index) =>
            index === id ? !item : item
        )

        setCheckedState(updateCheckedState);

        const totalPrice = updateCheckedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    return sum + DummyTopping[index].price
                }
                return sum;
            },
        );
        console.log(totalPrice);
        setTotal(totalPrice)
    }

    const increaseCart = (e) => {
        e.preventDefault()
        setCartCounter(cartCounter + 1)
        alert('Data added succesfully')
    }

    localStorage.setItem("Tambah", cartCounter)
    const addCart = localStorage.getItem("Tambah")
    return (
        <Container>
            <NavbarUser plusOne={addCart}/>
            <Row id="row-detail-product">
                <Col className="detail-drink mt-5">
                    <img id="detail-img-drink" className='mt-4 mb-5 shadow-lg' src={gettingProduct?.image}/>
                </Col>
                <Col id="right-side-addtpg" className="mt-5">
                    <div className="title-detail-product">
                        <p className="mt-4">{gettingProduct?.title}</p>
                    </div>
                    <div className="price-drink">
                        <p className="mt-2">{Rp.convert(gettingProduct?.price)}</p>
                    </div>
                    <div className="toping-add">
                        <p className='mt-5'>Toping</p>
                    </div>

                    {/* MAPPING TOPPING */}
                    <Row>
                    {gettingToppings.map((item, index) => (
                        <div key={index} className="topping-datas ms-4 col mb-5">
                            <div className="img-data-toping toppings-list-item" >
                                <div>
                                    <input 
                                        type="checkbox" 
                                        className="poppingCheck" 
                                        style={{display:"none"}}
                                        id={`custom-checkbox-${index}`}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnchage(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>
                                        <img className="mb-5 cursor-pointer" src={item?.image}/>
                                    </label>
                                    
                                    <p id="toping-name" className="mb-5">{item?.title}</p>
                                </div>
                            </div>
                            <div className="price-data-toping ms-4 mb-5" hidden>
                                <p>{item?.price}</p>
                            </div>
                        </div>
                    ))}
                    
                    {/* END MAPPING */}

                        <div className="sub-total d-flex mb-5">
                            <div className="left-total">
                                Total
                            </div>
                            <div className="right-total">
                                {Rp.convert(12000 + total)}
                            </div>
                        </div>
                        <div className="btn-add-cart mb-5 mt-2">
                            <button className="mb-2" type="submit" onClick={increaseCart} >Add Cart</button>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default DetailProduct