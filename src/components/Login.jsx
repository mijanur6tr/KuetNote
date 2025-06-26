import React ,  {useState, useTransition} from 'react'
import { Button,Input,Logo } from './index'
import { useNavigate , Link } from 'react-router-dom'
import authService from '../appWrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { logIn as authLogIN } from '../store/authSlice'


function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState()
  const {register, handleSubmit} = useForm()

  const login = async(data) => {
    setError= ""
    try {
      const session = await authService.logIn(data)
      if(session){
        const userData = authService.getCurrentUser(data);
        if(userData) dispatch(authLogIN(userData));
          navigate("/");
      }
    } catch (error) {
      setError(error.message)
    }
  }

  

  return(
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

          <div className="mb-2 flex justify-center">
            <Logo width='100%'/>
          </div>
          <h2>Sing in your account</h2>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <From onSubmit={handleSubmit(login)} className='mt-8'> 
            <div className='space-y-5'>
              <Input
                type='email'
                label= "Email:"
                placeholder= "Enter your email"
                {...register("email",{
                  required:true,
                  validate:{
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                              "Email address must be a valid address",
                  }
                })}
              />

              <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password",{
                required:true
              })}
              />

              <button
              type='submit'
              className='w-full'
              >
                Sign In
              </button>
            </div>
          </From>

          <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
          
      </div>
    </div>
   )
  }


  export default Login;