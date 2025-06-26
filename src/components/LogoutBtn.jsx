import React from 'react'
import authService from '../appWrite/auth';
import { logOut } from '../store/authSlice';
import { useDispatch } from 'react-redux';


const LogoutBtn = (props) => {
    const dispath = useDispatch()
    const logOutHandler = ()=>{
        authService.logOut().then(
            ()=>{
                dispath(logOut())
            }
        )
    }
  return(
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logOutHandler}
    >Log Out</button>
   )
  }

  export default LogoutBtn;
