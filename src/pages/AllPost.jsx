import React, { useState, useEffect } from 'react'
import service from '../appWrite/config'
import { Container, PostCard, Loader } from '../components'

const AllPost = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        const publicPosts = posts.documents.filter(post => post.status === "Public")
        setPosts(publicPosts)
      }
      setLoading(false)
    })
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <div className='w-full py-8 px-4 sm:px-6 md:px-8'>
      <Container>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">
          Explore <span className="text-indigo-600">Posts.</span>
        </h2>

        {/* Post Grid */}
        {posts.length > 0 ? (
          <div className='flex flex-wrap -mx-2'>
            {posts.map((post) => (
              <div
                key={post.$id}
                className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No public posts found.</p>
        )}
      </Container>
    </div>
  )
}

export default AllPost
