import React, { useState, useTransition } from 'react'
import { Button, Input } from './index'
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
  <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-1">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Log in to continue your journey.
      </p>

      {error && (
        <p className="text-red-600 mb-4 text-center text-sm font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(login)}>
        <div className="space-y-4">

          {/* EMAIL */}
          <div>
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
              labelClass="text-gray-700 font-medium text-sm mb-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              labelClass="text-gray-700 font-medium text-sm mb-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
          >
            Sign In
          </Button>

        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
          Create one
        </Link>
      </p>
    </div>
  </div>
);


}


export default Login;