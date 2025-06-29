import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative overflow-hidden py-5 bg-slate-700 border-t-2 border-t-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col items-center">

        {/* Centered Columns */}
        <div className="flex flex-wrap justify-center gap-10 lg:gap-50 w-full">
          {/* Company */}
          <div className="w-full sm:w-auto p-4">
            <h3 className="mb-6 text-xs font-bold uppercase text-gray-300 tracking-wide ">
              Company
            </h3>
            <ul >
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((text) => (
                <li key={text} className="mb-3 last:mb-0">
                  <Link
                    to="/"
                    className="text-base font-normal text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-auto p-4">
            <h3 className="mb-6 text-xs font-bold uppercase text-gray-300 tracking-wide ">
              Support
            </h3>
            <ul>
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map((text) => (
                <li key={text} className="mb-3 last:mb-0">
                  <Link
                    to="/"
                    className="text-base font-normal text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legals */}
          <div className="w-full sm:w-auto p-4">
            <h3 className="mb-6 text-xs font-bold uppercase text-gray-300 tracking-wide ">
              Legals
            </h3>
            <ul >
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((text) => (
                <li key={text} className="mb-3 last:mb-0">
                  <Link
                    to="/"
                    className="text-base font-normal text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All Rights Reserved by KuetNote.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
