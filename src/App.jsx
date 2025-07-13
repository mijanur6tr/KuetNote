import { useState , useEffect } from 'react'
import  authService  from './appWrite/auth.js'
import {logIn , logOut} from "./store/authSlice.js"
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'
import { ToastContainer } from 'react-toastify'



function App() {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch()
  

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(logIn(userData));  
      } else {
        dispatch(logOut());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(logOut());
    } finally {
      setLoad(false);
    }
  };

  fetchUser();
}, []);


  return !load ? (
   <div className='bg-[#fffffff7] min-h-screen w-full flex flex-col'>
    <ToastContainer/>
  <Header />

  <main className='flex-grow'>
    <Outlet />
  </main>

  <Footer />
</div>

  ) : null;
}

export default App
