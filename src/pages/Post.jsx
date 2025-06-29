import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import service from '../appWrite/config'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { Button, Container } from '../components'

const Post = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)
  const [post, setPost] = useState(null)
  const { slug } = useParams()

  const isAuthor = post && user ? user.$id === post.userId : false

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full max-w-3xl mx-auto bg-white border rounded-xl shadow-md p-6">
         
          <div className="w-full flex justify-center mb-6">
            <img
              src={service.previewFile(post.featuredImage)}
              alt={post.title}
              className="max-w-full max-h-[400px] rounded-lg mx-auto"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>
         
          <div className="prose max-w-none mb-6">{parse(post.content)}</div>

          {isAuthor && (
            <div className="flex justify-center gap-4 mt-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="px-6 py-2">
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="bg-red-500"
                className="px-6 py-2"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
