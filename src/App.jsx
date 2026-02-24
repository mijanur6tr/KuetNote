import { useState, useEffect } from 'react'
import apiService from './services/api.js'
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
      const userData = await apiService.getCurrentUser();

      if (userData) {
        // API returns { user: { ... } } — normalize to the user object
        dispatch(logIn(userData.user || userData));
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
    <div className='bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen w-full flex flex-col'>
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
