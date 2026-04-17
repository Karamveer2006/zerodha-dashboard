import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from "react";
import { watchlist } from "../data/data";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowDown';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {tooltip,Grow} from '@mui/material';
import OrderContext from "./OrderContext";
ChartJS.register(ArcElement, Tooltip, Legend);

const WatchList = ({username}) => {

  const dataSet=watchlist.map((stock)=>{
   return  stock.price;
  });
  const name=watchlist.map((stock)=>{
   return  stock.name;
  })
  


  
 
 
  const data = {
    

  labels: name,
  datasets: [
    {
      label: 'price',
      data: dataSet,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
  return (
    <>
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">

        {watchlist.map((stock)=>{
          return(
             <WatchListItem 
          stock={stock}
          key={stock.name}
          index={stock.name}  />
          )

         

        })}
        
      </ul>
      <div>
      <Doughnut data={data} />
    </div>

      
      
    </div>
    
    </>
   
  );
}



export default WatchList;

const WatchListItem=({stock})=>{

  const[mouseOverItem,setMouseOverItem]=useState(false);

  const mouseEnter=(e)=>{
    setMouseOverItem(true);
    
  }
  const mouseLeave=(e)=>{
    setMouseOverItem(false);
    
  }


  return(
    
    <li  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>

    
    <div className="item">
      <p className={stock.isDown?"down":"up"}>{stock.name}</p>
      <div className="item-info">
        <span className="percent">{stock.percent}</span>
        {stock.isDown?<KeyboardArrowDownIcon className="down"/>:<KeyboardArrowUpIcon className="up"/>}
      <span>{stock.price}</span>
      </div>


    </div>
    {mouseOverItem && <WatchlistItemHover index={stock.name}/>}

    
    </li>
  )
  

}



const WatchlistItemHover =({index})=>{
  const context=useContext(OrderContext);

  const HandleBuyclick=()=>{
    context.openBuyWindow({index});
    


  }
  
  
  return(
    

    
  <span className="actions">
    <tooltip title="buy(B)" placement="top" arrow TransitionComponent={Grow}>
    <button className="buy btn" onClick={HandleBuyclick}>buy</button>
   </tooltip>
   <tooltip title="sell(S)" placement="top" arrow TransitionComponent={Grow}>
    <button className="sell btn">sell</button>
   </tooltip>
   <tooltip title="analitics(A)" placement="top" arrow TransitionComponent={Grow}>
    <button className="chart btn"><LeaderboardIcon/></button>
   </tooltip>
   <tooltip title="more(M)" placement="top" arrow TransitionComponent={Grow}>
    <button className="btn"><MoreHorizIcon/></button>
   </tooltip>
   
  </span>
   
  )
}

