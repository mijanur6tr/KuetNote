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
    console.log("Signup form submitted with data:", data);

    setError('')
    try {
      const user = await authService.signUp(data)
      if (user) {
        const userdata = await authService.getCurrentUser()
        console.log(userdata)
        if (userdata) dispatch(logIn(userdata))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }

  }

 

return (
  <div className="min-h-screen bg-white flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-gradient-to-br from-white via-gray-100 to-white rounded-2xl shadow-xl p-10 border border-gray-200">

      <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-2 tracking-wide">
        Create an Account
      </h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Join us to share your ideas and read blogs!
      </p>

      {error && (
        <p className="text-red-600 mt-2 mb-4 text-center text-sm font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit(signup, (err) => console.log('Validation Error', err))}>
        <div className="space-y-5">

          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            {...register("name", {
              required: "Full name is required"
            })}
            labelClass="text-gray-700 font-semibold text-sm mb-1"
          />
          {errors.name && <p className="text-red-500 text-sm">Full name is required</p>}

          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email must be valid"
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
            Sign Up
          </Button>

        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
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
)

}

export default SignUp;
