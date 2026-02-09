import React, { useState, useEffect, useContext } from 'react';
import service from '../appWrite/config';
import { Container, PostCard, Loader, Button } from '../components';
import { Link } from 'react-router-dom';
import { ContextStore } from '../context/contextStore';

const MyPost = () => {
  
  const {myPostList,loading} = useContext(ContextStore)
  const [filter, setFilter] = useState('Public'); 
  

  const filteredPosts = myPostList
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)) // DESC order
    .filter(post => (filter === 'All' ? true : post.status === filter));


  if (loading) return <Loader />;

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 md:px-8'>
      <Container>
        
        {/* Header */}
        <div className='mb-8'>
          <h2 className="text-3xl font-bold text-white mb-2">My Posts</h2>
          <div className='h-1 w-20 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full'></div>
        </div>

        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['Public', 'Private'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-xl font-medium border transition-all duration-200 ${
                filter === status
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white border-cyan-500 shadow-lg'
                  : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        
        {filteredPosts.length > 0 ? (
          <div className='flex flex-wrap -mx-3'>
            {filteredPosts.map(post => (
              <div
                key={post.$id}
                className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 relative'
              >
                
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl border border-slate-700/50">
            <div className='w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mb-4'>
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-white mb-2">No Post Found.</p>
            <p className="text-slate-400 mb-6">Start sharing your knowledge with the community!</p>
            <Link to="/add-post">
              <Button
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
