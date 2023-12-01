import React from 'react';
import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Navbar() {
  const navigate = useNavigate()
  const handleLogout = (e) => {
      e.preventDefault();
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('userdetails')

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Successfully Logout"
      });

      navigate('/login')
  }

  const getUserDetails = () => {
    let userjson = localStorage.getItem('userdetails');
  
    if (userjson === undefined || userjson === null) {
      return null; 
    }
  
    let userdetails = JSON.parse(userjson);
    return userdetails;
  };
  const user = getUserDetails();
  if(user) {
    console.log('user');
  }else{
    console.log('does not have user');
  }
  

  return (
    <>
      <nav className='nav'>
      <ul className='ul'>
        <li className='li'>
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
      {user ? (
        <>
        
        <li className='li'>
          <NavLink className="nav-link" to="/profile">UserProfile</NavLink>
        </li>
        <li className='li'>
        <button onClick={(e) => handleLogout(e)} className="logout-button" >Logout</button>
        </li>
        </>
       
      ):(
        <>
       
        <li className='li'>
          <NavLink className="nav-link"   to="/Login">User Login</NavLink>
        </li>
        <li className='li'>
          <NavLink className="nav-link"  to="/register">User Registration</NavLink>
        </li>
        </>
      )
      }
        
        <li className='li'>
          <NavLink className="nav-link"  to="/adminlogin">Admin Login</NavLink>
        </li>
        
      </ul>
    </nav>

    </>
  );
}

export default Navbar;
