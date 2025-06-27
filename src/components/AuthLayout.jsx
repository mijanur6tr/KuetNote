import React ,{ useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AuthLayout = ({children,authentication=true}) => {

  const navigate = useNavigate();
  const [loader,setLoader] = useState(true);
  const authStatus = useSelector((state)=>state.auth.status)

  useEffect(()=>{

    if(authentication && authStatus !== authentication){
        navigate("/login")
    }else if(!authentication && authStatus !== authentication){
        navigate("/")
    }

    setLoader(false)

  },[authStatus,navigate,authentication])

  return loader ? <p>Loading...</p>:<>{children}</>;
  }

  export default AuthLayout;