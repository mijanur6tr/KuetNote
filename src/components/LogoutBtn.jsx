import React from 'react'
import authService from '../appWrite/auth';
import { logOut } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LogoutBtn = (props) => {
    const dispath = useDispatch()
    const navigate= useNavigate()
    const logOutHandler = ()=>{
        authService.logOut().then(
            ()=>{
                dispath(logOut())
                navigate("/login")
            }
        )
    }
  return(
    <button
    className='inline-bock px-3 py-1 duration-200 hover:bg-blue-200 rounded-lg'
    onClick={logOutHandler}
    >Log Out</button>
   )
  }

  export default LogoutBtn;
