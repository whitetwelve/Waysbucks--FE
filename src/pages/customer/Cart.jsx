import React, { useState, useContext, useEffect } from 'react';
import Bin from "../../assets/img/bin.png";
import NavbarUser from "../../components/partials/NavbarUser";
import "../../assets/css/Cart.css"
import Rp from "rupiah-format"
import DummyData from "../../Dummies/My-Cart"
import { Alert , Form } from "react-bootstrap"
import { CartContext } from '../../context/cart-context';
import NoImg from "../../assets/img/no-photo.jpg"
import { useMutation } from 'react-query';
import { API } from '../../config/API';
import { useNavigate } from 'react-router-dom';


function Cart() {
  
  const title = "My Cart"
  document.title = title

  const [payload, act] = useContext(CartContext)
  const [message, setMessage] = useState(null)
  const [cartData, setCartData] = useState({})
  const [datas, setDatas] = useState({})
  const moving = useNavigate()

  useEffect(() => {
    setDatas(payload?.cart?.carts)
  },[payload])
  console.log(datas);
  // let subTotal = 0;
  // cartData.forEach((item) => {
  //   return subTotal += item?.price
  // })

  // let handleOnDelete = (id) => {
  //   let data = cartData
  //   const datas = data.splice(id - 1 , 1)
  //   console.log(datas);
  //   setDeleteDummyData(datas)
  // }

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault()
      // Get data from product
      const data = {
        product_id: datas.product_id,
        seller_id : 5,
        buyer_id: datas.user_id,
        price: datas.subamount,
      };
      // Data body
      const body = JSON.stringify(data);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // Insert transaction data
      const response = await API.post("/transaction", config);
      setCartData(response)
      console.log(response);

      // Create variabel for store token payment from response here ...
      const token = response.data.token;
      setDatas(token)
      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          moving("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          moving("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });
  const addCart = localStorage.getItem("Tambah")
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-nCBei_tHNTHLKVUe";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
        document.body.removeChild(scriptTag);
    };
    }, []);
    console.log(cartData);
  return (
    <div>
      <div className="container">
        <NavbarUser className="ms-4 for-nav" plusOne={addCart}/>
        {message}
      </div>
      <div className="p-5 mx-5">
        <div className="px-5 mb-3 text-red">
          <h3>My Cart</h3>
        </div>
        <div className="px-5">
          <p  className="mb-0 text-red">Review your order</p>
        </div>

        <div className="row">
          <div className="col-8 px-5">
            <hr />

            <div className="card mb-3 scroll" style={{ border: "none" }}>

                <div className="row g-0 mb-2">
                  <div className="col-md-2">
                    <img
                      src={datas?.image || NoImg}
                      alt=""
                      className="rounded"
                      height={"100px"}
                      width={"100px"}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-10 row">
                    <div className="col-md-9">
                      <div className="card-body px-0">
                        <p
                          className="card-title text-red ms-1"
                          style={{ fontSize: "18px", fontWeight: "900" }}
                        >
                          {datas?.product_name}
                        </p>
                        <p
                          className="card-text ms-1"
                          style={{ fontSize: "16px", fontWeight: "800", color:"#974A4A" }}
                        >
                          Toping
                          <span 
                          className="text-red ms-1"
                          style={{fontSize:"14px", fontWeight: "100"}}>
                            : Toping1, Toping2, Toping3
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="card-body px-0">
                        <p
                          className="card-title text-red"
                          style={{
                            fontSize: "16px",
                            fontWeight: "400",
                            textAlign: "right",
                            width:'7.5rem'
                          }}
                        >
                          {Rp.convert(datas?.subamount)}
                        </p>

                        <img src={Bin} style={{ float: "right" , cursor:'pointer'}}/>
                      </div>
                    </div>
                  </div>
                </div>

            </div>

            <hr />


          </div>
            <div className="col-4 px-5">

                <div className="text-red">
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="d-flex">Subtotal</p>
                    <p className="d-flex">{Rp.convert(datas?.subamount)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="d-flex">Qty</p>
                    <p className="d-flex">{datas?.qty}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="d-flex fw-bold">Total</p>
                    <p className="d-flex fw-bold">{Rp.convert(datas?.subamount)}</p>
                  </div>
                </div>
              <div className="mt-4">
                <Form onSubmit={(e) => handleBuy.mutate(e)}>
                <button 
                className="container btn btn-primary bg-red border-0 mt-2" 
                  type='submit'>
                  Pay
                </button>
                </Form>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
