import React , {useState} from 'react'
import './Login.css'
import { useDispatch , useSelector } from 'react-redux'
import { userLogin } from '../../features/userSlice'
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';


function Login() {

    const [user , setUser] = useState({
        email:'',
        password:'',
    })
    const [errors , setErrors] = useState({
        email:'',
        password:'',
    })
  
    const validform = () =>{
        const {email , password} = user;
        const newError = {};
        
        if(!validator.isEmail(email)){
            newError.email = "Please enter valid email address"
        }

        // if (!validator.isLength(password, { min: 5 })) {
        //     newError.password = 'Password must be at least 5 characters long';
        // }
      
        
        setErrors(newError)
        return Object.keys(newError).length === 0;
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSet = (e) => {
        setUser({...user , [e.target.id]:e.target.value})
    }

    const UserLogin = async (e) => {
        e.preventDefault()
        if(validform()){
            const decodToken = await dispatch(userLogin(user))
            if(decodToken.payload === false){
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
                    title: 'Block usereAccount',
                  });
                return false  
            }
            if (decodToken.payload == undefined){
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
                    title: 'Invalid user',
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
                    title: "Successfully Logined"
                  });
                  navigate('/')   
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
        <h1>Login</h1>
        <form>
      
            <label htmlFor="username">
                Email
            </label>
            <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={handleSet}
                required
                placeholder='Enter your Email'
                className='input'
            />
             {errors.email && <p className='error-message'>{errors.email}</p>}
            
            <label htmlFor="password">
                Password:
            </label>
            <input
                type="password"
                id="password"
                required
                onChange={handleSet}
                placeholder='Enter your Password'
            />
             {errors.password && <p className='error-message'>{errors.password}</p>}

         

            <button className='btn-1' onClick={(e) => UserLogin(e)} >Sign In</button>
        </form>
        <p>
            Does Not Have Account?<br />
            <span className="line">
                <a href="#">Sign Up</a>
            </span>
        </p>
    </section>
</>

  )
}

export default Login
