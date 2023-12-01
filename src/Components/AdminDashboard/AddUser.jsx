import React,{useState} from 'react'
import './AddUser.css'
import { BASE_URL } from '../../features/userApi'
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';


function AddUser() {
    const navigate = useNavigate()
    const [adduser , setAdduser] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirm_password:'',
        is_active:false
    })
    const [error , setError] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirm_password:'',
        is_active:false

    })

    const validateForm = () => {
        const {first_name,last_name,email,password,confirm_password} = adduser;
        const newError = {};
        if(!validator.isEmail(email)){
            newError.email = "Please enter valid email address"
        }
        if (!validator.isLength(password, { min: 6 })) {
            newError.password = 'Password must be at least 6 characters long';
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
        if (password !== confirm_password){
            newError.confirm_password = 'password do not match';
        }
        setError(newError)
        return Object.keys(newError).length === 0;
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAdduser({
        ...adduser,
        [name]: type === 'checkbox' ? checked : value,
        });
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validateForm()){
            const apiUrl = `${BASE_URL}/adduser`
            axios.post(apiUrl,{
                first_name:adduser.first_name,
                last_name:adduser.last_name,
                email:adduser.email,
                is_active:adduser.is_active,
                password:adduser.password
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
            }).catch((error) =>{
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
        }
       
    }

  return (
    <div className="edit-user-container">
      <h2>Add User</h2>
      <form >
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={handleInputChange}
          />
             {error.first_name && <p className='error-message'>{error.first_name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            onChange={handleInputChange}            
          />
            {error.last_name && <p className='error-message'>{error.last_name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}            
          />
             {error.email && <p className='error-message'>{error.email}</p>}

        </div>
        <div className="form-group">
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}            
          />
             {error.password && <p className='error-message'>{error.password}</p>}

        </div>
        <div className="form-group">
          <label htmlFor="conformpassword">conformpassword:</label>
          <input
            type="password"
            id="conformpassword"
            name="confirm_password"
            onChange={handleInputChange}                        
          />
             {error.confirm_password && <p className='error-message'>{error.confirm_password}</p>}
        </div>
        <div className="form-group attractive-checkbox">
            <div className="checkbox-container">
                <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={adduser.is_active}
                onChange={handleInputChange}
                />
                <label htmlFor="is_active" className="checkmark"></label>
            </div>
            <label htmlFor="is_active" className="checkbox-label">
                Status:
            </label>
            </div>
        <button onClick={(e) =>handleSubmit(e)} type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default AddUser