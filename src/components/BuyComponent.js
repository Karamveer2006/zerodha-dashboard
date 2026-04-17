import '../buyComponent.css'
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderContext from './OrderContext';
import { useSelector } from "react-redux";




function BuyWindow() {
    const user=useSelector(state=>state.user);
    console.log(user.user[0].id);
const Context =useContext(OrderContext);
const[stockQuantity,setStockQuantity]=useState(1);
const[stockPrice,setStockPrice]=useState(0.00);


  const handleBuyClick=()=>{

    const postOrderData=async(uid)=>{
      await fetch('http://localhost:8080/orderdata',{
        method:'post',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: 'Buy',
          userId: user.user[0].id
        }),
      })
    }
    
    postOrderData(Context.selectedStockUid);
    Context.closeBuyWindow();
  

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