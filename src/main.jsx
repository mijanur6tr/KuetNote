import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import {AuthLayout} from "./components/index.js"



import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import EditPost from "./pages/EditPost.jsx"
import AddPost from "./pages/AddPost.jsx"
import AllPost from "./pages/AllPost.jsx"
import Post from "./pages/Post.jsx"
import MyPost from './pages/MyPost.jsx'

 
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication={true}>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:"/all-post",
        element:(
          <AuthLayout authentication={true}>
            <AllPost/>
          </AuthLayout>
        )
      },
      {
        path:"/my-post",
        element:(
          <AuthLayout authentication={true}>
            <MyPost/>
          </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication={true}>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:(
          
            <Post/>
          
        )
      },

    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store ={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
