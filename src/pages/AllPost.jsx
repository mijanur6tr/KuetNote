import React, { useState, useEffect, useContext } from 'react';
import { Container, PostCard, Loader } from '../components';
import { ContextStore } from '../context/contextStore';

const categories = ["All", "Learn & Share", "Random Thought", "Academic","Prominent Places", "Subject Review"];

const AllPost = () => {
  
  const {postList,loading} = useContext(ContextStore)
  const [selectedCategory, setSelectedCategory] = useState('All');

  const publicPosts = postList
          .filter(post => post.status === 'Public')
          .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

 


  const filteredPosts =
    selectedCategory === 'All'
      ? publicPosts
      : publicPosts.filter(post => post.category === selectedCategory);

  if (loading) return <Loader />;

  return (
    <div className='w-full py-8 px-4 sm:px-6 md:px-8'>
      <Container>
        
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-800">
          Explore <span className="text-indigo-600">Posts</span>
        </h2>

       
        <div className="flex overflow-x-auto  gap-2 sm:gap-4 mb-10 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-3   sm:px-4 py-2 rounded-md text-sm sm:text-base sm:font-medium font-medium border transition duration-200 ${selectedCategory === category
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
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
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
