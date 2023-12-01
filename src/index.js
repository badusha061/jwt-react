import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import  {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Layout from './Layout.jsx'
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import Home from './Components/Home/Home.jsx';
import Profile from './Components/UserProfile/Profile.jsx'
import Adminlogin from './Components/AdminLogin/AdminLogin.jsx'
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx'
import EditUser from './Components/AdminDashboard/EditUser.jsx';
import AddUser from './Components/AdminDashboard/AddUser.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route  path='/' element={<Home />} />
                    <Route path='register/' element={<Register />} />
                    <Route  path='login/' element={<Login />} />
                    <Route  path='profile/' element={<Profile />} />
                    <Route  path='adminlogin/' element={<Adminlogin/>} />
                </Route>
                <Route  path='admindashboard/' element={<AdminDashboard />} />
                <Route  path='edituser/:userId' element={<EditUser />} />
                <Route  path='adduser' element={<AddUser />} />
            </Routes>
        </Router>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
