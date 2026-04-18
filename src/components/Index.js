import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from "react-router-dom";


import Login from './Login';
import SignupPage from './Sign';
import Home from './Home';
function Main() {
    return ( 
       <CookiesProvider>
    <BrowserRouter>
        <div className="Main">
         
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        
      </Routes>
      
    </div>
    </BrowserRouter>
    </CookiesProvider>
     );
}

export default Main;