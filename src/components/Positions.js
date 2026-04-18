import React from "react";

import { useState } from "react";
import { useEffect } from "react";


const Positions = () => {


  const[positionData,setPositionData]=useState([]);
  
    useEffect(()=>{
      let url="https://zerodha-backend-7sge.vercel.app/positionsdata";
       let fetchPosition=()=>{
        
          fetch(url).then((res)=>{
            
            return res.json();
            
  
          }).then((data)=>{
            setPositionData(data);
          }).catch((err)=>{
            console.log(err);
          })
  
        
      }
      fetchPosition();
  
  },[])
  

  return (
    <>
      <h3 className="title">Positions ({positionData.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positionData.map((stock,index)=>{
            const cleanNumber = (val) => Number(String(val).replace(/[^0-9.-]/g, ""));


            const currValue= stock.price*stock.qty;
            const isProfit= currValue-stock.avg*stock.qty>=0;
            const proClass=isProfit?"profit":"loss";
            
            const dayClass=cleanNumber(stock.day)>=0?"profit":"loss";

        return(
          
            <tr key={index} >
            <td>{stock.product}</td>
            <td>{stock.name}</td>
            <td>{stock.qty}</td>
            <td>{stock.avg}</td>
            <td>{stock.price}</td>
            <td className={proClass}>{(currValue-stock.avg*stock.qty).toFixed(2)}</td>
            
            <td className={dayClass}>{stock.day}</td>
          </tr>
         )

      })}
          
        </table>
      </div>
    </>
  );
};

export default Positions;
