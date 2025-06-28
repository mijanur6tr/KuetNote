import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import service from '../appWrite/config'
import authService from '../appWrite/auth' 

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)

        if (userData) {
          const postsRes = await service.getPosts()
          if (postsRes) {
            setPosts(postsRes.documents)
          }
        }
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className='h-2/3 flex justify-center items-center py-10'>
        <p className='text-xl font-semibold'>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='h-2/3 flex justify-center items-center py-10'>
        <p className='text-xl font-semibold'>Log in to see posts.</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className='h-2/3 flex justify-center items-center py-10'>
        <p className='text-xl font-semibold'>No posts found.</p>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
