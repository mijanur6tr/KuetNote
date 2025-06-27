import React , {useEffect , useState} from 'react'
import { useNavigate, useParams , Link } from 'react-router-dom';
import service from '../appWrite/config';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { Button , Container } from '../components';




const Post = (props) => {

  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.userData)
  const [post , setPost] = useState()
  const slug = useParams()

  const isAuthor = post && user ? user.$id===post.userId :false;

  useEffect(()=>{
    if(slug){
      service.getPost(slug).then((post)=>{
        setPost(post)
      })
      if(post){
        navigate(`/post/${post.$id}`)
      }
      navigate('/')
    }
    navigate('/')
  },[slug,navigate])

  const deletePost = ()=>{
    service.deletePost(post.$id).then((status)=>{
      if (status){
        service.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  return post? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
          src={service.previewFile(post.featuredImage)}
          alt={post.titile}
           className="rounded-xl"
          />

           <div className="w-full mb-6">
             <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>

            <div className='browser-css'>
              {parse(post.content)}
            </div>

        </div>

        <div>
          {isAuthor && (
            <div>
              <Link to={`/edit-post/${post.$id}`}>
               <Button bgColor="bg-green-500" className="mr-3">
                  Edit
               </Button>
              </Link>

              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

      </Container>
    </div>
  ) : null;
  }

  export default Post;
