import React, { useState } from 'react';
import BuyWindow from './BuyComponent';

const OrderContext=React.createContext({

    openBuyWindow:(uid)=>{},
    closeBuyWindow:()=>{}

});

export const OrderContextProvider=(props)=>{
    const[isBuyWindowOpen,setIsBuyWindowOpen]=useState(false);
    const[selectStockUid,setSelectedStockUid]=useState("");


    const handelOpenBuyWindow=(uid)=>{
        
        setIsBuyWindowOpen(true);
        setSelectedStockUid(uid.index);
       
        

    }
    const handelCloseBuyWindow=()=>{
        setIsBuyWindowOpen(false);
        setSelectedStockUid("");
        }

        return(
    <OrderContext.Provider value={{
        openBuyWindow:handelOpenBuyWindow,
        closeBuyWindow:handelCloseBuyWindow,
        selectedStockUid:selectStockUid

    }}
    >
        {props.children}
        {isBuyWindowOpen && <BuyWindow uid={selectStockUid}/>}

    </OrderContext.Provider>
)
}

export default OrderContext;