import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative overflow-hidden pt-10 bg-gradient-to-br from-slate-800 to-slate-900 border-t border-slate-700">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Top Section - Logo and Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          {/* Brand Section */}
          <div className="w-full lg:w-1/3">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">KuetNote</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ultimate note-taking companion. Capture ideas, organize thoughts, 
              and access your notes from anywhere. Built for students and professionals alike.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-start lg:justify-end gap-8 w-full lg:w-2/3">
            {/* Company */}
            <div className="w-full sm:w-auto p-1">
              <h3 className="mb-4 text-sm font-bold uppercase text-white tracking-wide">
                Company
              </h3>
              <ul>
                {['About Us', 'Careers', 'Blog'].map((text) => (
                  <li key={text} className="mb-2 last:mb-0">
                    <Link
                      to="/"
                      className="text-sm font-normal text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="w-full sm:w-auto p-1">
              <h3 className="mb-4 text-sm font-bold uppercase text-white tracking-wide">
                Support
              </h3>
              <ul>
                {['Help Center', 'Documentation', 'Contact Us'].map((text) => (
                  <li key={text} className="mb-2 last:mb-0">
                    <Link
                      to="/"
                      className="text-sm font-normal text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legals */}
            <div className="w-full sm:w-auto p-1">
              <h3 className="mb-4 text-sm font-bold uppercase text-white tracking-wide">
                Legal
              </h3>
              <ul>
                {['Terms & Conditions', 'Privacy Policy'].map((text) => (
                  <li key={text} className="mb-2 last:mb-0">
                    <Link
                      to="/"
                      className="text-sm font-normal text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-6 border-t border-slate-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} KuetNote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
