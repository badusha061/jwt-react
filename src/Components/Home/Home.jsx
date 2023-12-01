import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import userRducer from '../../features/userSlice'
import './Home.css'

function Home() {
 
  const getUserDetails = () => {
    let userjson = localStorage.getItem('userdetails');
  
    if (userjson === undefined || userjson === null) {
      // Handle the case where userjson is undefined or null
      return null; // or an appropriate default value
    }
  
    let userdetails = JSON.parse(userjson);
    return userdetails;
  };
  
 const user = getUserDetails();

  return (
    
    <>
  

<body className='body'>
  <header>
    <section class="banner1">
      <header>
      {user ? (
            <div>
              <h2>Welcome:</h2>
              <p className="banner-text">
                {user.auth_user.first_name} {user.auth_user.last_name}
              </p>
            </div>
          ) : (
            <p className='banner-text'>Welcome to our website! Please log in to access personalized content.</p>
          )}
      </header>
    </section>
  </header>

</body>
    </>
  )
}

export default Home
