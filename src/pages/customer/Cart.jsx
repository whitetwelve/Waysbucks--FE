import React, { useState } from 'react';
import Bin from "../../assets/img/bin.png";
import NavbarUser from "../../components/partials/NavbarUser";
import "../../assets/css/Cart.css"
import Rp from "rupiah-format"
import DummyData from "../../Dummies/My-Cart"
import { Alert , Form } from "react-bootstrap"

function Cart() {
  
  const title = "My Cart"
  document.title = title

  const [cartData] = useState(DummyData)
  const [deleteDummyData, setDeleteDummyData] = useState(cartData)
  const [message, setMessage] = useState(null)

  
  let subTotal = 0;
  cartData.forEach((item) => {
    return subTotal += item?.price
  })

  let handleOnDelete = (id) => {
    let data = cartData
    const datas = data.splice(id - 1 , 1)
    console.log(datas);
    setDeleteDummyData(datas)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const alert = (
      <Alert id="alert-message-payment" variant="success" className='py-3'>
        Thank you for ordering in us, please wait to verify you order
      </Alert>
    )
    setMessage(alert)
  } 

  const addCart = localStorage.getItem("Tambah")
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
              {cartData.map((item) => (
                <div className="row g-0 mb-2">
                  <div className="col-md-2">
                    <img
                      src={item?.img}
                      alt={item?.img}
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
                          className="card-title text-red"
                          style={{ fontSize: "18px", fontWeight: "900" }}
                        >
                          {item?.title}
                        </p>

                        <p
                          className="card-text"
                          style={{ fontSize: "16px", fontWeight: "800", color:"#974A4A" }}
                        >
                          Toping
                          <span 
                          className="text-red ms-1"
                          style={{fontSize:"14px", fontWeight: "100"}}>
                            : {item?.toping}
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
                          }}
                        >
                          {Rp.convert(item.price)}
                        </p>

                        <img src={Bin} style={{ float: "right" , cursor:'pointer'}}
                           onClick={handleOnDelete}/>
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
                    <p className="d-flex">{cartData?.length}</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="d-flex fw-bold">Total</p>
                    <p className="d-flex fw-bold">{Rp.convert(subTotal)}</p>
                  </div>
                </div>
              <div className="mt-4">
              <Form className="d-flex" onSubmit={handleOnSubmit}>
                <button 
                className="container btn btn-primary bg-red border-0 mt-2" 
                type="submit">
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
