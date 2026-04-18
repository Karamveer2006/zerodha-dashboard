import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";


const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch("https://zerodha-backend-three.vercel.app/verify", {
          method: "POST",
          headers,
          credentials: "include", 
        });

        const data = await response.json();
        console.log("Verification response:", data);

       
        if (data.status) {
          setUsername(data.user);
          setIsLoading(false); 
        } else {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      } catch (error) {
        console.error("Verification failed:", error);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

  
 
  if (isLoading) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Verifying session...</div>;
  }

  return (
    <>
      <TopBar user={username} /> 
      <Dashboard user={username} />
    </>
  );
};

export default Home;