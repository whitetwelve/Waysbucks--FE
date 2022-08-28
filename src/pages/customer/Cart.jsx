import React, { useState, useContext, useEffect } from 'react';
import Bin from "../../assets/img/bin.png";
import NavbarUser from "../../components/partials/NavbarUser";
import "../../assets/css/Cart.css"
import Rp from "rupiah-format"
import DummyData from "../../Dummies/My-Cart"
import { Alert , Form } from "react-bootstrap"
import { CartContext } from '../../context/cart-context';
import NoImg from "../../assets/img/no-photo.jpg"
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/API';
import { useNavigate } from 'react-router-dom';


function Cart() {
  
  const title = "My Cart"
  document.title = title

  const [message, setMessage] = useState(null)
  const [datas, setDatas] = useState([])
  const moving = useNavigate()

  const getData = async() => {
    const res = await API.get('/cart-user')
    setDatas(res.data.carts)
  }
  console.log(datas);

  useEffect(() => {
    getData()
  },[])

  let subTotal = 0;
  datas.forEach((item) => {
    subTotal += item?.sub_total
  })
  console.log(datas);
  let resultTotal = datas?.reduce((addition, b) => {
    return addition + b.sub_total;
  }, 0);
  console.log(resultTotal);
  let handleOnDelete = async (id) => {
    console.log(id)
    await API.delete(`/cart/${id}`)
  }


  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault()

      const data = {
        price : resultTotal,
        buyer_id : datas.user_id,
      }

      // Data body
      const body = JSON.stringify(data);

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const res = await API.post('/transaction', body, config)
      console.log(res);

      const token = res.data.users.token
      console.log(token);
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
  })

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "Client key here ...";
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
  
  return (
    <div>
      <div className="container">
        <NavbarUser className="ms-4 for-nav"/>
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
              {datas?.map((item) => (
                <div className="row g-0 mb-2" key={item?.id}>
                  <div className="col-md-2" >
                    <img
                      src={item?.product?.image || NoImg}
                      alt={item?.product?.image}
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
                          {item?.product?.title}
                        </p>
                        <p
                          className="card-text ms-1"
                          style={{ fontSize: "16px", fontWeight: "800", color:"#974A4A" }}
                        >
                          Topping :
                          {item?.topping?.map((item, idx) => (
                              <span 
                              className="text-red ms-1"
                              style={{fontSize:"14px", fontWeight: "100"}}>
                                {item?.title},
                              </span>
                          ))}
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
                            width:'8rem'
                          }}
                        >
                          {Rp.convert(item?.sub_total)}
                        </p>

                        <img src={Bin} style={{ float: "right" , cursor:'pointer'}}
                          onClick={() => handleOnDelete(item?.id)}/>
                      </div>
                    </div>
                  </div>
                </div>
                ))}

            </div>

            <hr />


          </div>
            <div className="col-4 px-5">

                <div className="text-red">
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="d-flex">Subtotal</p>
                    <p className="d-flex">{Rp.convert(subTotal)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="d-flex">Qty</p>
                    <p className="d-flex">{datas.length}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="d-flex fw-bold">Total</p>
                    <p className="d-flex fw-bold">{Rp.convert(subTotal)}</p>
                  </div>
                </div>
              <div className="mt-4">
                <button 
                className="container btn btn-primary bg-red border-0 mt-2"
                  onClick={(e) => handleBuy.mutate(e)} >
                  Pay
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
