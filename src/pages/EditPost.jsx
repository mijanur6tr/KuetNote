import React , {useState ,useEffect} from 'react'
import { Container, PostForm } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import apiService from '../services/api'
import { Loader } from '../components'


const EditPost = () => {

 const {slug} = useParams()
 const navigate = useNavigate()
 const [post ,setPost] = useState()
 const [loading, setLoading] = useState(true)

 useEffect(()=>{

    if(slug){
      apiService.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        }
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }else{
      navigate('/')
      setLoading(false)
    }

 },[slug,navigate])

 if (loading) return <Loader />;

 return post ? (
   <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'>
     <PostForm post={post}/>
   </div>
 ) : null;
}

export default EditPost;
