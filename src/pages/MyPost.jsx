import React, { useState, useEffect, useContext } from 'react';
import service from '../appWrite/config';
import { Container, PostCard, Loader, Button } from '../components';
import { Link } from 'react-router-dom';
import authService from '../appWrite/auth';
import { ContextStore } from '../context/contextStore';

const MyPost = () => {
  
  const {myPostList,loading} = useContext(ContextStore)
  const [filter, setFilter] = useState('All'); 
  

  const filteredPosts = myPostList.filter(post =>
    filter === 'All' ? true : post.status === filter
  );

  if (loading) return <Loader />;

  return (
    <div className='w-full py-8 px-4 sm:px-6 md:px-8'>
      <Container>
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-800">
          Your <span className="text-indigo-600">Posts</span>
        </h2>

        
        <div className="flex justify-center gap-4 mb-10">
          {['All', 'Public', 'Private'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md font-medium border transition duration-200 ${
                filter === status
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white text-cyan-600 border-cyan-600 hover:bg-blue-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        
        {filteredPosts.length > 0 ? (
          <div className='flex flex-wrap -mx-2'>
            {filteredPosts.map(post => (
              <div
                key={post.$id}
                className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 relative'
              >
                <span
                  className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${
                    post.status === 'Public'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {post.status}
                </span>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-slate-600">
            <p className="text-xl font-semibold mb-4">No Post Found.</p>
            <Link to="/add-post">
              <Button
                bgColor="bg-blue-600 hover:bg-blue-700"
                className="text-white px-6 py-2 rounded-md font-medium shadow-md transition duration-300"
              >
                Create Your Post
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyPost;
