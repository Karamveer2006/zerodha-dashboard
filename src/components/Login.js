import React, { useState } from "react";
import '../credientials.css'
import { Link, useNavigate } from "react-router-dom";
import{useDispatch} from 'react-redux'
import { addUser } from "../features/userSlice";




const Login = () => {
  const navigate = useNavigate();
   const dispatch=useDispatch();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

   const handleError = (err) => alert(err);
  const handleSuccess = (msg) => alert(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://zerodha-backend-three.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        credentials: "include", 
        body: JSON.stringify({
          ...inputValue,
        }), 
      });

   
      const data = await response.json();
      const { success, message, user, token } = data;
       
      
      if (success) {
        if (user) {
          dispatch(
            addUser({
              email: user.email,
              username: user.username,
              id: user._id,
            })
          );
        }
        if (token) {
          localStorage.setItem("authToken", token);
        }
        handleSuccess(message);
        
        // Clear the form on success
        setInputValue({ email: "", password: "" });
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        localStorage.removeItem("authToken");
        handleError(message);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      handleError("Server error. Please try again.");
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      
    </div>
  );
};

export default Login;