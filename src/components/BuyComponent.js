import '../buyComponent.css'
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderContext from './OrderContext';
import { useSelector } from "react-redux";




function BuyWindow() {
    const user=useSelector(state=>state.user);
   
const Context =useContext(OrderContext);
const[stockQuantity,setStockQuantity]=useState(1);
const[stockPrice,setStockPrice]=useState(0.00);


  const handleBuyClick=()=>{
    const token = localStorage.getItem("authToken");
    const userId = user.user?.[0]?.id;
    if (!userId && !token) {
      return;
    }

    const postOrderData=async(uid)=>{
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const payload = { 
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: 'Buy',
      };
      if (userId) {
        payload.userId = userId;
      }

      const response = await fetch('https://zerodha-backend-three.vercel.app/orderdata',{
        method:'post',
        headers,
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return false;
      }

      return true;
    }
    
    postOrderData(Context.selectedStockUid).then((ok) => {
      if (ok) {
        Context.closeBuyWindow();
      }
    });
  

  }

  const handleCancelClick=()=>{
    Context.closeBuyWindow();

  }


    return ( 
        
       <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              value={stockQuantity}
              onChange={(e)=>{setStockQuantity(e.target.value)}}
             
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
                value={stockPrice}
              onChange={(e)=>{setStockPrice(e.target.value)}}
              
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link onClick={handleCancelClick} to="" className="btn btn-grey" >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BuyWindow;