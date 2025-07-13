import React, { useState, useEffect } from 'react';
import service from '../appWrite/config';
import { Container, PostCard, Loader } from '../components';

const categories = ['All', 'Prominent Places', 'Random Thought', 'Academic', 'Subject Review'];

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await service.getPosts([]);
      if (res) {
        const publicPosts = res.documents
          .filter(post => post.status === 'Public')
          .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
        setPosts(publicPosts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);


  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter(post => post.category === selectedCategory);

  if (loading) return <Loader />;

  return (
    <div className='w-full py-8 px-4 sm:px-6 md:px-8'>
      <Container>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-800">
          Explore <span className="text-indigo-600">Posts</span>
        </h2>

       
        <div className="flex overflow-x-auto gap-2 sm:gap-4 mb-10 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 space-y-0 py-o.1  sm:px-4 sm:py-2 rounded-md text-sm sm:text-base sm:font-medium font-thin border transition duration-200 ${selectedCategory === category
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white text-cyan-600 border-cyan-600 hover:bg-blue-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        
        {filteredPosts.length > 0 ? (
          <div className="flex flex-wrap -mx-2">
            {filteredPosts.map(post => (
              <div
                key={post.$id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">No posts found in this category.</p>
        )}
      </Container>
    </div>
  );
};

export default AllPost;
