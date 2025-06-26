import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import authService from '../appWrite/auth';
import { useState } from 'react';
import { logIn } from '../store/authSlice';
import { useForm } from 'react-hook-form';
import { Button, Logo, Input } from './index';
import Login from './Login';



const SignUp = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState()
  const { register, handleSubmit } = useForm()

  const signup = async (data) => {
    setError('')
    const user = authService.signUp(data)
    if (user) {
      const userdata = authService.getCurrentUser(user)
      if (userdata) dispatch(Login(user))
      navigate("/")
    }

  }

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2>Sign up if you are new</h2>
        {error && <P className="text-red-600 mt-8 text-center">{error}</P>}
        <From onSubmit={handleSubmit(signup)}>
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
              type='email'
              label="Email:"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />

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
            >
              Sign Up
            </Button>

          </div>
        </From>

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
