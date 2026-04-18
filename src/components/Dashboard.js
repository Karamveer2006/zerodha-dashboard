
import { Route, Routes } from "react-router-dom";


// Components
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { OrderContextProvider } from "./OrderContext";

const Dashboard = () => {
 

  

  return (
    <div className="dashboard-container">
      
      <OrderContextProvider>
        <WatchList />
        <div className="content">
          <Routes>
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="apps" element={<Apps />} />
            
           
          </Routes>
        </div>
      </OrderContextProvider>
    </div>
  );
};

export default Dashboard;