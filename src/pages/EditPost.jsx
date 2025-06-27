import React , {useState ,useEffect} from 'react'
import { Container, PostForm } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import service from '../appWrite/config'


const EditPost = (props) => {

 const slug = useParams()
 const navigate = useNavigate()
 const [post ,setPost] = useState()

 useEffect(()=>{

    if(slug){
      service.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        }
      })
    }else{
      navigate('/')
    }

 },[slug,navigate])

  return post ? <div className='py-8'>
    <Container>
      <PostForm post={post}/>
    </Container>
  </div> : null;
  }

  export default EditPost;
