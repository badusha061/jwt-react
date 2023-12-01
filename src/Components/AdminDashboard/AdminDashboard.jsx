import React,{useState , useEffect} from 'react';
import './AdminDashboard.css'
import { BASE_URL } from '../../features/userApi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; 

const AdminDashboard = () => {
  const [users , setUsres] = useState([]);
  const [loading , setLoading] = useState(true);
  const [search , setSearch] = useState(null)
  const [result , setResult] = useState([])
  
  const getAdminDetails = () =>{
    let userjson = localStorage.getItem('admindetails')
    let userdetails = JSON.parse(userjson)
    return userdetails
   }
   const admin = getAdminDetails();
   console.log('the admin',admin.token.is_admin);
  const navigate = useNavigate();
  useEffect(() =>{
    let apiUrl;
    if(search){
      console.log('if');
      apiUrl =  `${BASE_URL}/usersearch/${search}`

      
    }else{
      console.log('else');
      apiUrl = `${BASE_URL}/userlist`;
  
    }
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (Array.isArray(data)) {
        setUsres(data);
      } else {
        setUsres([]);
      }
      setLoading(false);
    })
  },[search,navigate]);

  const handle_edit = async(userid) =>{
      navigate(`/edituser/${userid}`)
  }

  const soft_delete = async (e,userid) =>{
    e.preventDefault()
    const response = await axios.post(
      `${BASE_URL}/userdelete/${userid}`
      
    )
    if(response.data.message === "Successfully Deleted"){
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
        title: "Successfully Deleted User"
      });
    }else{
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
        title: 'Something Went Wrong',
      });
    return false
    }
  }
  const handleSearch =  (e) =>{
    e.preventDefault()
    setSearch(e.target.value)
    console.log(search);
    }

    const handleAdminLogout = (e) =>{
      e.preventDefault()
      localStorage.removeItem('jwtTokenadmin')
      localStorage.removeItem('admindetails')
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
        title: "Successfully Admin Logout"
      });
      
      navigate('/adminlogin')
  }
  
  return (
<div >
    <nav style={{ backgroundColor: 'black', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between',width:'100%' }}>
    { admin ?(
       <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Welcome ADMIN:{admin.auth_user.first_name} </span>
    ):(
      <span style={{ fontWeight: 'bold', fontSize: '20px' }}>No Admin</span>
    )

    }
   
    <div class="search-container">
        <input style={{width:"100%"}} onChange={(e) => handleSearch(e)} type="text" class="search-input" placeholder="Search..."/>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <Link to={'/adduser'}className="btn btn-outline-light " style={{ cursor: 'pointer' }}>
      ADD USER
    </Link>
    <p style={{color:'black'}}>ashra</p>
    <Link onClick={(e) => handleAdminLogout(e)}	  className="btn btn-outline-light " style={{ cursor: 'pointer' }}>
      LOGOUT
    </Link>
    </div>
  </nav>

  <table className="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">status</th>
          <th scope="col">edit</th>
          <th scope="col">delete</th>

        </tr>
      </thead>
      <tbody>
  {users.map((user, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.is_active === true ? 'Active' : 'DeActive'}</td>
      <td>
        <button className="btn-edit" onClick={() => handle_edit(user.id)} >
          Edit
        </button>
      </td>
            <td>
              <button onClick={(e) => soft_delete(e,user.id)} className="btn-delete" >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
          </table>
        </div>
  );
};

export default AdminDashboard;

