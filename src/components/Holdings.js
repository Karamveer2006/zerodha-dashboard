import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from "react";
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const Holdings = () => {
  const[holdingData,setHoldingData]=useState([]);
  
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Holdings ',
    },
  },
};


const labels = holdingData.map((stock)=>{
  return stock
});

const data = {
  labels,
  datasets: [
    {
      label: 'current value',
      data: holdingData.map((stock) =>stock.price*stock.qty ),
      backgroundColor: 'rgba(141, 72, 164, 0.7)',
    },
   
  ],
};

  useEffect(()=>{
    let url="https://zerodha-backend-three.vercel.app/holdingsdata";
     let fetchHoldings=()=>{
      
        fetch(url).then((res)=>{
          
          return res.json();
          

        }).then((data)=>{
          setHoldingData(data);
        }).catch((err)=>{
          console.log(err);
        })

      
    }
    fetchHoldings();

},[])

 
  return (
    <>
      <h3 className="title">Holdings {holdingData.length}</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
          {holdingData.map((stock,index)=>{
            const cleanNumber = (val) => Number(String(val).replace(/[^0-9.-]/g, ""));


            const currValue= stock.price*stock.qty;
            const isProfit= currValue-stock.avg*stock.qty>=0;
            const proClass=isProfit?"profit":"loss";
            const netClass=cleanNumber(stock.net)>=0?"profit":"loss";
            const dayClass=cleanNumber(stock.day)>=0?"profit":"loss";

        return(
          
            <tr key={index} >
            <td>{stock.name}</td>
            <td>{stock.qty}</td>
            <td>{stock.avg.toFixed(2)}</td>
            <td>{stock.price.toFixed(2)}</td>
            <td>{currValue.toFixed(2)}</td>
            <td className={proClass}>{(currValue-stock.avg*stock.qty).toFixed(2)}</td>
            <td className={netClass}>{stock.net}</td>
            <td className={dayClass}>{stock.day}</td>
          </tr>

          
        )

      })}
        </table>
        <div><Bar options={options} data={data} /></div>
      </div>

      

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
