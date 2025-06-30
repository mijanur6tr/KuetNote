import React from 'react'
import hero from "../assets/hero.jpg"

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <img
        src={hero} 
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div> {/* semi-transparent overlay */}

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Welcome to KuetNote
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-100 max-w-xl drop-shadow-md">
          Dive into fresh thoughts, creativity & GenZ culture.
        </p>
        <p className="mt-4 text-lg md:text-2xl text-gray-100 max-w-xl drop-shadow-md">
          Shape the abstract.
        </p>
        <a
          href="#blogs"
          className="mt-6 px-6 py-3 bg-blue-400 text-black font-semibold rounded-full hover:bg-gray-200 transition duration-300"
        >
          Explore Blogs
        </a>
      </div>
    </section>
  )
}

export default Hero
