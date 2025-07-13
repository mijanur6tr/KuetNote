import React from 'react'
import { Link } from 'react-router-dom'
import hero from "../assets/hero.jpg"

const Hero = ({ isLoggedIn }) => {
  return (
    <section className="relative w-full h-[50vh] lg:h-[80vh] xl:h-[90vh] overflow-hidden">
      <img
        src={hero}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Welcome to <span className="text-4xl md:text-6xl font-bold text-center mb-10 text-blue-300">
        Kuet<span className="text-amber-400">Note.</span>
      </span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-50 tracking-tighter lg:tracking-tight font-medium max-w-xl drop-shadow-md">
          Dive into fresh thoughts, creativity & GenZ culture.
        </p>
        <p className="mt-4 text-lg md:text-2xl text-gray-50 tracking-tighter lg:tracking-tight font-medium max-w-xl drop-shadow-md">
          Shape the abstract.
        </p>
        <Link
          to={isLoggedIn ? "/add-post" : "/login"}
          className="mt-6 px-4 py-2 text-white bg-cyan-700  font-semibold rounded-xl hover:bg-cyan-800 transition duration-300"
        >
          {isLoggedIn ? "Express Yourself :)" : "Log in to Explore Posts"}
        </Link>
      </div>
    </section>
  )
}

export default Hero
