import React, { useState, useTransition } from 'react'
import { Button, Input, Logo } from './index'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../appWrite/auth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { logIn as authLogIN } from '../store/authSlice'



function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const { register, handleSubmit , formState: { errors } } = useForm()

  const login = async (data) => {
   
    setError('')
    try {
      const session = await authService.logIn(data)
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogIN(userData));
        navigate("/");
       
      }
    } catch (error) {
      setError(error.message)
    }
  }



return (
  <div className="min-h-screen bg-white flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-gradient-to-br from-white via-gray-100 to-white rounded-2xl shadow-xl p-10 border border-gray-200">
      
      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2 tracking-wide">
        Sign In to Your Account
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Welcome back! Please enter your details.
      </p>

      {error && (
        <p className="text-red-600 mt-2 mb-4 text-center text-sm font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(login, (err) => console.log('Validation Error', err))}>
        <div className="space-y-5">

          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email address must be valid"
              }
            })}
            labelClass="text-gray-700 font-semibold text-sm mb-1"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required"
            })}
            labelClass="text-gray-700 font-semibold text-sm mb-1"
          />
          {errors.password && <p className="text-red-500 text-sm">Password is required</p>}

          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow transition duration-300"
          >
            Sign In
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>
)

}


export default Login;