import React, { useState } from "react";
import NavbarAdmin from "../../components/partials/NavbarAdmin";
import TransactionData from "../../Dummies/TransactionData"
import { Container, Row, Col, Card } from "react-bootstrap"
import "../../assets/css/Transaction.css"
import { useQuery } from "react-query"
import { API } from "../../config/API"
import { useEffect } from "react";

function Transaction() {

    const title = "Transaction"
    document.title = title
    const [datas, setDatas] = useState([]);
    console.log(datas);

        //   GET TRANSACTIONS
        const getTransactions = async () => {
          const response = await API.get('/transactions')
          setDatas(response?.data?.Transactions)
      }
    
      useEffect(() => {
        getTransactions()
      },[])
      console.log(datas);
  return (

    <>
      <Container>
        <NavbarAdmin/>
          <Row className="ms-5">
          <div class="container text-red mt-4">
            <h3 className="mt-4 mb-4">Income Transaction</h3>
          </div>
          <div class="container">
            <table class="table table-bordered border-dark">
                <thead>
                <tr>
                    <th scope="col" class="bg-secondary bg-opacity-10">No</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Name</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Address</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Post Code</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Income</th>
                    <th scope="col" class="bg-secondary bg-opacity-10">Status</th>
                </tr>
                </thead>
                <tbody>
                {datas.map((data, idx) => (
                <tr key={idx}>
                    <th scope="row">{data.id}</th>
                    <td>{data?.buyer?.fullname}</td>
                    <td>{data?.buyer?.address}</td>
                    <td>{data?.buyer?.post_code}</td>
                    <td class="text-primary">{data?.price}</td>
                    <td className= {`status-transaction-${data.status}`} >{data.status}</td>
                </tr>
                ))}
                </tbody>
            </table>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Transaction;
