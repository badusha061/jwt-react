import React, { useState, useEffect } from 'react';
import './EditUser.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../features/userApi';
import axios from 'axios';
import Swal from 'sweetalert2';
import validator from 'validator';


function EditUser() {
    const {userId} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        is_active : false
    });

    const [error , setError] = useState({
      firstName:'',
      lastName:'',
        email:'',

    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const validateForm = () => {
        const {firstName,lastName,email} = formData;
        const newError = {};
        if(!validator.isEmail(email)){
            newError.email = "Please enter valid email address"
        }
        if (!validator.isAlpha(firstName)) {
            newError.firstName = 'First name should only contain letters';
        }
        if (validator.isEmpty(firstName)) {
            newError.firstName = 'First name cannot be empty';
        }
        if (validator.isEmpty(lastName)) {
            newError.lastName = 'Last name cannot be empty';
        }

    
        setError(newError)
        return Object.keys(newError).length === 0;
    }

   
    

   

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.firstName.trim() === ''){
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
          title: 'First Name cannot be Empty',
        });
      return false 
  }
  if(formData.lastName.trim() === ''){
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
          title: 'Last Name cannot be Empty',
        });
      return false 
  }
  if(formData.email.trim() === ''){
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
          title: 'Email cannot be Empty',
        });
      return false 
  }

    if(validateForm()){
        const apiUrl = `${BASE_URL}/edituser/${userId}`
    axios.post(apiUrl,{
        userId:userId,
        first_name:formData.firstName,
        last_name:formData.lastName,
        email:formData.email,
        is_active:formData.is_active
    })
    .then((response)=>{
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
            title: "Successfully Edited User"
          });
          navigate('/admindashboard')
    })
    .catch((error) =>{
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
            title: 'Email is Already taken',
          });
        return false
    })
  }else{
    console.log('error');
  }
    
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form >
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className='input-2'
            value={formData.firstName}
            onChange={handleChange}
          />
             {error.first_name && <p className='error-message'>{error.first_name}</p>}

        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className='input-2'
            value={formData.lastName}
            onChange={handleChange}
          />
            {error.last_name && <p className='error-message'>{error.last_name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className='input-2'
            value={formData.email}
            onChange={handleChange}
          />
             {error.email && <p className='error-message'>{error.email}</p>}
        </div>
        <div className="form-group attractive-checkbox">
            <div className="checkbox-container">
                <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                />
                <label htmlFor="is_active" className="checkmark"></label>
            </div>
            <label htmlFor="is_active" className="checkbox-label">
                Status:
            </label>
            </div>
        <button onClick={(e) => handleSubmit(e)} type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditUser;
