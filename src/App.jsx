import { useState , useEffect } from 'react'
import  authService  from './appWrite/auth.js'
import {logIn , logOut} from "./store/authSlice.js"
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from './components'


function App() {
  const [load, setLoad] = useState(true);
  const dispatch = useDispatch()

  useEffect( ()=>{
          authService.getCurrentUser()
          .then((userData)=>{
            if (userData) {
              dispatch(logIn({userData}))
            } else {
              dispatch(logOut())
            }
          })
          .finally(()=>setLoad(false))
  },[] )

  return !load ? (
   <div className='bg-[#aa9898f7] min-h-screen w-full flex flex-col'>
  <Header />

  <main className='flex-grow'>
    <Outlet />
  </main>

  <Footer />
</div>

  ) : null;
}

export default App
