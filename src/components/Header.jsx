import React , {useState} from 'react'
import { Container ,Logo, LogoutBtn} from "./index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const authStatus = useSelector((state)=>(state.auth.status))
  const navigate = useNavigate()

  const navItems = [
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Log In",
      slug:"/login",
      active:!authStatus
    },
    {
      name:"Sign Up",
      slug:"/signup",
      active:!authStatus
    },
    {
      name:"Add Post",
      slug:"/add-post",
      active:authStatus
    },
    {
      name:"All Post",
      slug:"/all-post",
      active:authStatus
    },
    {
      name:"My Post",
      slug:"my-post",
      active:authStatus
    },
  ]

 

  return (
    <header className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-gray-800 shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/">
            <Logo width="w-20" />
          </Link>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus:outline-none text-2xl"
            >
              {mobileMenuOpen ? "✖" : "☰"}
            </button>
          </div>

          {/* Nav Links */}
          <ul
            className={`flex flex-col items-center md:flex-row gap-6 md:gap-4 text-base font-medium
              absolute md:static w-full md:w-auto left-0 top-16 md:top-0 bg-white md:bg-transparent transition-all duration-300 ease-in-out
              px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none
              ${mobileMenuOpen ? "block" : "hidden md:flex"}
            `}
          >
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        navigate(item.slug)
                      }}
                      className="text-gray-800 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}
export default Header;