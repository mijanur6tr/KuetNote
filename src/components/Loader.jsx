import React from 'react'


const Loader = ({ message = "Loading KuetVerse..." }) => (
  <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
    <div>
      <span className="bounce-dot"></span>
      <span className="bounce-dot"></span>
      <span className="bounce-dot"></span>
    </div>
    <p className="text-lg font-semibold text-slate-600 mt-4">{message}</p>
  </div>
)

export default Loader
