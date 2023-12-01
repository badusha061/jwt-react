import React,{useState} from 'react';
import './Profile.css'; 
import Swal from 'sweetalert2';
import axios, { Axios } from 'axios';
import { BASE_URL } from '../../features/userApi';

function Profile() {
  const [file ,setFile] = useState(null)
  let setjson = localStorage.getItem('userdetails');
  let setuser = JSON.parse(setjson);
  const getUserDetails = () => {
    let userjson = localStorage.getItem('userdetails');
  
    if (userjson === undefined || userjson === null) {
      return null; 
    }
  
    let userdetails = JSON.parse(userjson);
    return userdetails;
  };
  
   const user = getUserDetails();
   let token = localStorage.getItem('jwtToken')
    console.log(user.auth_user.user_image);
    const handleChange = (e) => {
      const selectfile = e.target.files;
      if (selectfile && selectfile.length > 0){
          setFile(selectfile[0])
      }
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(file === null){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        
        Toast.fire({
          icon: 'error',
          title: 'No Image Choose',
        });
      return false   
      }else{
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const formdata = new FormData();
        formdata.append('user_image',file);
        const apiurl = `${BASE_URL}/imageupload`
        axios.post(apiurl,formdata,config)
        .then((response) => {
          user.auth_user.user_image = response.data.user_image;
          localStorage.setItem('userdetails', JSON.stringify(user));
          console.log(response.data.user_image);
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
            title: "Successfully Added Photo"
          });

        })
        .catch((error) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          
          Toast.fire({
            icon: 'error',
            title: error,
          });
        return false     
        })
      }

  
     
    }
  return (
     <>   
   {user ? (
      <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="profile-content">
        <div className="profile-picture">
        <img src={`${BASE_URL}${user.auth_user.user_image}`} alt="User Profile" />
        <label htmlFor="profilePicture" className="upload-button">
            Upload Picture
          </label>
          <input  onChange={handleChange} type="file" id="profilePicture" accept="image/*" />
          <button onClick={handleSubmit} className='btn'> Submit </button>
        </div>
        <div className="user-details">
          <p>
            <strong>First Name:</strong> {user.auth_user.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {user.auth_user.last_name}
          </p>
          <p>
            <strong>Email:</strong> {user.auth_user.email}
          </p>
        </div>
      </div>
    </div>
    ):(
      <p>
            <strong>Go To Login</strong> 
        </p>
    )}
    </>

  );
}

export default Profile;
