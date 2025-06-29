import React from 'react'
import logo from "../assets/logo.png"

/**
* @author
* @function Logo
**/

const Logo = ({width="w-10"}) => {
  return(
    <div>
      <img src={logo} alt="Logo" className={width} />
    </div>
   )
  }
export default Logo;