import React, { useState, useEffect } from 'react'
import { Container, PostCard, Hero, Loader, Button } from '../components'
import service from '../appWrite/config'
import authService from '../appWrite/auth'
import { Link } from 'react-router-dom'


const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const publicPosts = posts.filter(post => post.status === "Public")
  const limitedPosts = publicPosts.slice(0, 8)

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

  return (
  <div className="w-full">
    {!loading && <Hero isLoggedIn={!!user} />}

    {loading ? (
      <Loader />
    ) : user && publicPosts.length > 0 ? (
      <div id="blogs" className="w-full py-8">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">
            Explore <span className="text-indigo-600">Prominent Places Of KUET</span>
          </h2>

          {/* Post Grid */}
          <div className="flex flex-wrap -mx-2">
            {limitedPosts.map((post) => (
              <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <PostCard {...post} />
              </div>
            ))}
          </div>

          {/* See More Button if there are more than 8 */}
          {publicPosts.length > 8 && (
            <div className="flex justify-center items-center mt-8">
              <Link to="/all-post">
                <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md shadow-lg transition duration-300">
                  See More
                </button>
              </Link>
            </div>
          )}
        </Container>
      </div>
    ) : user && publicPosts.length === 0 ? (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold">No public posts found.</p>
      </div>
    ) : null}
  </div>
)



}

export default Home
