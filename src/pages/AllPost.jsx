import React, { useState, useEffect } from 'react'
import service from '../appWrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'

const AllPost = () => {
  const [posts, setPosts] = useState([])
  const user = useSelector((state) => state.auth.userData)

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
return (
  <div className='w-full py-8 px-4 sm:px-6 md:px-8'>
    <Container>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-8">
        Your Post
      </h2>

      {/* Post Grid */}
      <div className='flex flex-wrap -mx-2'>
        {posts.map((post) =>
          user?.$id === post.userId ? (
            <div
              key={post.$id}
              className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'
            >
              <PostCard {...post} />
            </div>
          ) : null
        )}
      </div>
    </Container>
  </div>
)

}

export default AllPost
