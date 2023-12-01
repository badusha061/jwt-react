import React , {useState} from 'react'
import './Register.css'
import { userRegistation } from '../../features/userSlice';
import {useDispatch , useSelector} from 'react-redux';
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';

function Register() {
    const [formData , setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirm_password:''
    })
    const [error , setError] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        confirm_password:''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRegistred = useSelector((state) => state.user.user)

    const userRegistrederror = useSelector((state) => state.user.error)

    const handleInputChange = (e) => {
        const {id,value} = e.target;
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
 
    const validateForm = () => {
        const {first_name,last_name,email,password,confirm_password} = formData;
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
        console.log('password',password);
        console.log('conform password',confirm_password);
        if (password !== confirm_password){
            newError.confirm_password = 'password do not match';
        }
        setError(newError)
        return Object.keys(newError).length === 0;
    }

    const userRegister = (e) => {
        e.preventDefault();
        if(validateForm()){
            dispatch(userRegistation(formData))
            .then((response) => {
                if(response.payload === undefined){
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
                        title: 'Email Already taken',
                      });
                    return false
                }
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
                    title: "Signed in successfully"
                  });

                  navigate('/login')
              })
            .catch((error) => {
                console.log('error during user registration' , error);
            });
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
    <>
    <section className='section'>
        <h1>Register</h1>
        <form >
        <label htmlFor="username">
                First Name
            </label>
            <input
                type="text"
                id="first_name"
                autoComplete="off"
                onChange={handleInputChange}
                required
                placeholder='Enter First Name'
            />
             {error.first_name && <p className='error-message'>{error.first_name}</p>}

               <label htmlFor="username">
                Last Name
            </label>
            <input
                type="text"
                id="last_name"
                autoComplete="off"
                onChange={handleInputChange}
                required
                placeholder='Enter Last Name'

            />
             {error.last_name && <p className='error-message'>{error.last_name}</p>}
            <label htmlFor="username">
                Email
            </label>
            <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={handleInputChange}
                required
                placeholder='Enter Email Address'

            />
             {error.email && <p className='error-message'>{error.email}</p>}

            <label htmlFor="password">
                Password:
            </label>
            <input
                type="password"
                id="password"
                onChange={handleInputChange}
                required
                placeholder='Enter password '

            />
             {error.password && <p className='error-message'>{error.password}</p>}

            <label htmlFor="confirm_pwd">
                Confirm Password:
            </label>
            <input
                type="password"
                id="confirm_password"
                onChange={handleInputChange}
                required
                placeholder='Conform password'

            />
             {error.confirm_password && <p className='error-message'>{error.confirm_password}</p>}

            <button className='btn-1' onClick={(e) => userRegister(e)}>Sign Up</button>
        </form>
        <p>
            <br />
            <span className="line">
                <NavLink path="login"> Already registered?  </NavLink>
            </span>
        </p>
    </section>
</>

  )
}

export default Register
