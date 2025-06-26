import React from 'react'
import { Container , LogoutBtn} from "./index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {

  const authStatus = useSelector((state)=>(state.auth.status))
  const navigate = useNavigate()

  navItems = [
    {
      name:home,
      slug:"/",
      active:true
    },
    {
      name:LogIn,
      slug:"/login",
      active:!authStatus
    },
    {
      name:SignUp,
      slug:"/signup",
      active:!authStatus
    },
    {
      name:AddPost,
      slug:"/addpost",
      active:authStatus
    },
    {
      name:AllPost,
      slug:"/allpost",
      active:authStatus
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>

          </div>
          <ul>
            {
              navItems.map((item)=>
              item.active ? (
                <li
                key={item.name}
                >
                  <button
                  onClick={()=> navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                      {item.name}
                  </button>
                </li>
              ) : null 
              )
            }

            {authStatus &&(
              <li>
                <LogoutBtn/>
              </li>
            )
            }
          </ul>
        </nav>
      </Container>
   </header>
)
}

export default Header;