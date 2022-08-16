import React, { useState } from "react";
import NavbarAdmin from "../../components/partials/NavbarAdmin";
import TransactionData from "../../Dummies/TransactionData"
import "../../assets/css/Transaction.css"

function Transaction() {

    const title = "Transaction"
    document.title = title
    const [datas] = useState(TransactionData);
    console.log(datas);

  return (

    <div>
      <NavbarAdmin/>
      <div class="container my-5 text-red">
        <h3>Income Transaction</h3>
      </div>

      <div class="container px-5">
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
            {datas.map(data => (
            <tr>
                <th scope="row">{data.no}</th>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.postcode}</td>
                <td class="text-primary">{data.income}</td>
                <td className= {`status-transaction-${data.status}`} >{data.status}</td>
            </tr>
            ))}
            </tbody>
        </table>
      </div>

    </div>
  );
}

export default Transaction;
