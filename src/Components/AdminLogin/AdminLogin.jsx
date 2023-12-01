import React , {useState} from 'react'
import { superUserLogin } from '../../features/userSlice'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';
import './AdminLogin.css'

function AdminLogin() {

  const [form , setForm] = useState({
    email:'',
    password:'',
  })

  const [errors , setErrors] = useState({
    email:'',
    password:'',
})


const dispatch = useDispatch()
const navigate = useNavigate()

 

const validform = () =>{
  const {email , password} = form;
  const newError = {};


  if(!validator.isEmail(email)){
      newError.email = "Please enter valid email address"
  }

  if (!validator.isLength(password, { min: 5 })) {
      newError.password = 'Password must be at least 5 characters long';
  }

  
  setErrors(newError)
  return Object.keys(newError).length === 0;
}


  const handleSet = (e) => {
    setForm({...form , [e.target.id]:e.target.value})
  }
  const AdminLogin = async (e) => {
    e.preventDefault()
    if(validform()){
      const re = await dispatch(superUserLogin(form))
    if(re.payload !== undefined){
      if(re.payload.token.is_admin === false){
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
          title: 'Invalid admin',
        });
      return false 
    }
   
    }
    if(re.payload === undefined){
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
        title: 'Invalid admin',
      });
    return false 
    }else{
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
        title: "Successfully Logined Admin"
      });
      navigate('/admindashboard')
    }
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }

  }

  return (
    <>
      <section className='section'>
        <h1>Admin Login</h1>
        <form>
      
            <label htmlFor="username">
                Email
            </label>
            <input
                type="text"
                id="email"
                autoComplete="off"
                required
                placeholder='Enter your Email'
                onChange={handleSet}
            />
             {errors.email && <p className='error-message'>{errors.email}</p>}

            <label htmlFor="password">
                Password:
            </label>
            <input
                type="password"
                id="password"
                required
                placeholder='Enter your Password'
                onChange={handleSet}
            />
             {errors.password && <p className='error-message'>{errors.password}</p>}

            <button className='btn-1' onClick={(e) => AdminLogin(e)} >Sign In</button>
        </form>
    
    </section>
    </>
  )
}

export default AdminLogin
