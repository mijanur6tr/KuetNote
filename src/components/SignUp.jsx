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
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2>Sign up if you are new</h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup, (err) => console.log('Validation Error', err))}>

          <div>
            <Input
              type="text"
              label="Full Name:"
              placeholder="Write down your full name"
              {...register("name", {
                required: true
              })}
            />

            <Input
              type="email"
              label="Email:"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email address must be a valid address"
                }
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password", {
                required: true
              })}
            />

            <Button
              type="submit"
              className="w-full mt-4"
            >
              Sign Up
            </Button>

          </div>
        </form>

        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp;
