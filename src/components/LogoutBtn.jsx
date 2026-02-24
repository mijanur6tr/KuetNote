import React from 'react'
import { logoutUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const LogoutBtn = (props) => {
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const logOutHandler = ()=>{
        dispatch(logoutUser())
        navigate("/login")
    }
  return(
    <button
    className='inline-bock px-3 py-1 duration-200 hover:bg-blue-200 rounded-lg'
    onClick={logOutHandler}
    >Log Out</button>
   )
  }

  export default LogoutBtn;
