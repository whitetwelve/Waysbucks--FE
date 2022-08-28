import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import { Container, Row, Col } from "react-bootstrap"
import Dummy from "../../Dummies/Topping"
import Rp from "rupiah-format"
import "../../assets/css/DetailProduct.css"
import { useParams, useNavigate } from 'react-router-dom';
import NavbarUser from "../../components/partials/NavbarUser";
import { useMutation } from "react-query"
import { API } from "../../config/API"
import { CartContext } from '../../context/cart-context';

const DetailProduct = () => {
    const title = ' Detail Product '
    document.title = title 
    
    const moving = useNavigate()

    // GET ID USER
    const [state, _] = useContext(UserContext)
    const user_id = state.user.id

    // STORE DATA CART
    const [payload, act] = useContext(CartContext)

    // COUNTER 
    const [cartCounter, setCartCounter] = useState(0)
    localStorage.setItem("Tambah", cartCounter)
    const addCart = localStorage.getItem("Tambah")

    // GET PRODUCT
    const [gettingProduct, setGettingProduct] = useState({})
    const { id } = useParams()
    const getDetailProduct = async () => {
        const response = await API.get(`/product/${id}`)
        setGettingProduct(response.data.product)
    }

    // SET TOPPINGS
    const [topping, setTopping] = useState([])
    const [toppingID, setToppingID] = useState([])
    console.log(toppingID);
    const  handleChange = (e) => {
        let updateTopping = [...topping]
        if (e.target.checked) {
            updateTopping = [...topping, e.target.value]
        } else {
            updateTopping.splice(topping.indexOf(e.target.value))
        }
        setTopping(updateTopping)


    let toppingId = [...toppingID]
        if(e.target.checked) {
            toppingId = [...toppingID, parseInt(e.target.name)]
        } else {
            toppingId.splice(toppingID.indexOf(e.target.name))
        }
        setToppingID(toppingId)
    }

    // GET TOPPINGS 
    const [gettingToppings, setGettingToppings] = useState([])
    const getToppings = async() => {
        const res = await API.get('/topings')
        setGettingToppings(res?.data?.users)
    }

    // FETCH
    useEffect(() => {
        getDetailProduct()
        getToppings()
    },[])

    // ADD COST
    let toppingTotal = topping.reduce((a, b) => {
        return a + parseInt(b)
    }, 0)
    let sub_amount = gettingProduct?.price + toppingTotal

    // ADD TO CART
    const handleToCart = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                  'Content-type': 'application/json',
                },
              };

            const body = JSON.stringify({
                topping_id : toppingID,
                sub_total : sub_amount,

                product_id:parseInt(id)
            });

            const response = await API.post('/cart', body, config);
        } catch (error) {
            console.log(error);
        }
    })

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
                    <div className="topping-detail-container">
                        {gettingToppings?.map((data, index) => (
                        <form>
                        <div className="topping-detail">
                            <div className="picture-topping-detail">
                            <input type="checkbox" className="toppingCheckboxs" id={`checkmark${index}`} 
                            value={data.price} name={data.id} onChange={handleChange} />
                            <label htmlFor ={`checkmark${index}`}>
                                <img className="picture-topping" src={data.image} alt="" />
                            </label>
                            </div>
                            <div className="topping-variant-detail">
                            <p className='mt-3'>{data.title}</p>
                            </div>
                        </div>
                        </form>
                        ))}
                    </div>
                    
                    {/* END MAPPING */}

                        <div className="sub-total d-flex mb-5">
                            <div className="left-total">
                                Total
                            </div>
                            <div className="right-total">
                                {Rp.convert(gettingProduct?.price + toppingTotal)}
                            </div>
                        </div>
                            <div className="btn-add-cart mb-5 mt-2">
                                <button className="mb-2" onClick={(e) => {handleToCart.mutate(e)}} type="submit" >Add Cart</button>
                            </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default DetailProduct