import React from 'react'
import hero from "../assets/hero.png"

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <img
        src={hero} // ✅ Replace with your background image
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div> {/* semi-transparent overlay */}

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Welcome to MyBlog
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-xl drop-shadow-md">
          Dive into fresh thoughts, creativity & GenZ culture.
        </p>
        <a
          href="#blogs"
          className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition duration-300"
        >
          Explore Blogs
        </a>
      </div>
    </section>
  )
}

export default Hero
