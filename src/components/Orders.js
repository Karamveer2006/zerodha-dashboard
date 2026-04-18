import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import{useSelector} from 'react-redux'

const Orders = () => {

  const[orderData,setOrderData]=useState([]);
  const user=useSelector(state=>state.user);

    
      useEffect(()=>{
        let url="https://zerodha-backend-three.vercel.app/ordersdetails";
         let fetchOrders=()=>{
            const token = localStorage.getItem("authToken");
            const userId = user.user?.[0]?.id;
            const headers = {
              "Content-Type": "application/json",
            };
            if (token) {
              headers.Authorization = `Bearer ${token}`;
            }

            const payload = {};
            if (userId) {
              payload.userId = userId;
            }

            fetch(url, {
        method: "post",
        headers,
        
        credentials: "include", 
        body: JSON.stringify(payload),
        
      }).then((res)=>{
              return res.json();
              
    
            }).then((data)=>{
              console.log(data);
              setOrderData(data);
              
            }).catch((err)=>{
              console.log(err);
            })
    
          
        }
        fetchOrders();
    
    },[]);
   

  
  if (!orderData || orderData.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/dashboard"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  
  return (
    <>
      <h3 className="title">Orders ({orderData.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((stock, index) => (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price}</td>
                <td>{stock.mode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
