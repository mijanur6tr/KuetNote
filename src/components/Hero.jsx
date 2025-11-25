import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ isLoggedIn }) => {
  return (
    <section className={`relative w-full flex items-center justify-center overflow-hidden bg-gradient-to-b 
  from-slate-900 via-slate-800 to-slate-900 
  ${isLoggedIn ? "h-[40vh]" : "h-[50vh] lg:h-[60vh]"}`}>

      {/* Soft glow circles */}
      <div className="absolute top-10 left-20 w-52 h-52 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-52 h-52 bg-amber-400/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {isLoggedIn ? "Post on " : "Welcome to "}
          <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">
            KuetNote
          </span>
        </h1>

        {isLoggedIn ? <></> : (<p className="mt-4 text-lg sm:text-xl text-slate-300 font-medium max-w-xl">
          Your space to explore creativity, share insights,
          and experience campus culture with a Gen-Z spark.
        </p>)
}
        <p className="mt-2 text-lg sm:text-xl text-slate-300 font-medium max-w-xl">
          Every idea matters. Express yours.
        </p>

        

        <Link
          to={isLoggedIn ? "/add-post" : "/login"}
          className="mt-8 px-6 py-3 rounded-xl text-white text-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isLoggedIn ? "Express Yourself ✨" : "Log in to Explore Posts"}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
