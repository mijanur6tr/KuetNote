import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appWrite/auth';
import { logIn } from '../store/authSlice';
import { useForm } from 'react-hook-form';
import { Button, Input } from './index';



const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();

  const signup = async (data) => {

    setError('')
    try {
      const user = await authService.signUp(data)
      if (user) {
        const userdata = await authService.getCurrentUser()
        if (userdata) dispatch(logIn(userdata))
        navigate("/")
        
      }
    } catch (error) {
      setError(error.message)
    }

  }

return (
  <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      
      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-1">
        Create an Account
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Join us to share your ideas & explore creativity.
      </p>

      {error && (
        <p className="text-red-600 mb-4 text-center text-sm font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(signup)}>
        <div className="space-y-4">

          {/* FULL NAME */}
          <div>
            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              {...register("name", { required: true })}
              labelClass="text-gray-700 font-medium text-sm mb-1"
            />
            {errors.name && <p className="text-red-500 text-sm">Full name is required</p>}
          </div>

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

          {/* BUTTON */}
          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
          >
            Create Account
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign In
        </Link>
      </p>
    </div>
  </div>
);

}

export default SignUp;
