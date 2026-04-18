import { useState } from "react";
import React  from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { removeUser } from "../features/userSlice";


const Menu = () => {
  const user=useSelector(state=>state.user);
  
  
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const[selectedMenue ,setSelectedMenue]=useState(0);
  const[isDropDown,setIsDroupDown]=useState(false);

  const handelDropDown=()=>{
    setIsDroupDown(!isDropDown);
  }

  const onSelect=(index)=>{
    setSelectedMenue(index);

  }
  const handleLogout = () => {
    dispatch(removeUser());
   
    navigate("/login"); 
  };
  const menuClass="menu";
  const activeMenu="menu selected";


  return (
    <div className="menu-container">
      <img src="/media/image/logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
             <Link style={{textDecoration:"none"}} className={selectedMenue===0 ?activeMenu:menuClass} onClick={()=>onSelect(0)}   to={"/dashboard"}>Dashboard</Link>
            
           
          </li>
          <li>
            <Link style={{textDecoration:"none"}} className={selectedMenue===1 ?activeMenu:menuClass} onClick={()=>onSelect(1)} to={"/dashboard/orders"}>Orders</Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} className={selectedMenue===2 ?activeMenu:menuClass} onClick={()=>onSelect(2)} to={"/dashboard/holdings"}>Holdings</Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} className={selectedMenue===3 ?activeMenu:menuClass} onClick={()=>onSelect(3)} to={"/dashboard/positions"}>Positions</Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} className={selectedMenue===4 ?activeMenu:menuClass} onClick={()=>onSelect(4)} to={"/dashboard/funds"}>Funds</Link>
          </li>
          <li>
            <Link style={{textDecoration:"none"}} className={selectedMenue===5 ?activeMenu:menuClass} onClick={()=>onSelect(5)} to={"/dashboard/apps"}>Apps</Link>
          </li>
        </ul>
        <hr />
        <div className="profile position-relative" onClick={handelDropDown} >
          <div className="avatar">ZU</div>
          <p className="username">{user.user[0]?.username}</p>
         
          <Box className=" position-absolute start-30 top-100 bg-light" onClick={handelDropDown}   style={isDropDown?{display:"inline"}:{display:"none"}}>
      
      <nav aria-label="secondary mailbox folders">
        <List style={{margin:0,paddingBlock:0}} >
          <ListItem style={{padding:0,margin:0}} disablePadding>
            <ListItemButton onClick={handleLogout} on style={{paddingInline:"10px",margin:0,paddingBlock:0}}>
              <LoginIcon className=""/>
              <ListItemText  primary="Logout" />
            </ListItemButton>
          </ListItem>
          
        </List>
      </nav>
    </Box>
       

        </div>
        
        
      </div>
    </div>
  );
};

export default Menu;
