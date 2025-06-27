import React , {useState , useEffect} from 'react'
import {Container , PostCard} from '../components'
import service from '../appWrite/config'
import { Link } from 'react-router-dom'


const Home = (props) => {

  const [posts,setPosts] = useState([])

  useEffect(()=>{
    if(posts){
      service.getPosts().then((posts)=>{
        if(posts){
          setPosts(posts.documents)
        }
      })
    }
  },[])

 if( posts.length ===0){
  return(
    <div>
      <p>Log in to see Posts.</p>
      <Link
      to="/login"
      >
      LogIn
      </Link>
    </div>
  )
 }

  return(
    <div className='w-full py-8'>
      <Container>
          {
            posts.map(()=>(
              <div key={posts.$id} className='p-2 w-1/4'>
                <PostCard {...posts}/>
              </div>
            ))
          }
      </Container>
    </div>
   )
  }
  
export default Home;
