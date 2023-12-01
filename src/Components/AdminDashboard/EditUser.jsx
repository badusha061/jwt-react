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
        first_name:'',
        last_name:'',
        email:'',

    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const {first_name,last_name,email} = formData;
        const newError = {};
        if(!validator.isEmail(email)){
            newError.email = "Please enter valid email address"
        }
        if (!validator.isAlpha(first_name)) {
            newError.first_name = 'First name should only contain letters';
        }
        if (validator.isEmpty(first_name)) {
            newError.first_name = 'First name cannot be empty';
        }
        if (validator.isEmpty(last_name)) {
            newError.last_name = 'Last name cannot be empty';
        }

    
        setError(newError)
        return Object.keys(newError).length === 0;
    }

   
    

   

  const handleSubmit = (e) => {
    e.preventDefault();
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
            title: error,
          });
        return false
    })
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please fill in the required fields correctly.',
            footer: 'Check the form and try again.'
        });
        return false
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
