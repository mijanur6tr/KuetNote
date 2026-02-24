import React, { useState, useEffect } from 'react';
import { Container, PostCard, Loader } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../store/postSlice';


const categories = ["All", "Learn & Share", "Random Thought", "Academic", "Prominent Places", "Subject Review"];

const AllPost = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const publicPosts = posts
    .filter(post => post.status === 'Public')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredPosts =
    selectedCategory === 'All'
      ? publicPosts
      : publicPosts.filter(post => post.category === selectedCategory);

  if (loading) return <Loader />;

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4 sm:px-6 md:px-8'>
      <Container>
        
        {/* Header */}
        <div className='mb-8'>
          <h2 className="text-3xl font-bold text-white mb-2">
            Explore <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">Posts</span>
          </h2>
          <div className='h-1 w-20 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full'></div>
        </div>

       
        {/* Category Filter */}
        <div className="flex overflow-x-auto gap-2 sm:gap-3 mb-10 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 text-white border-cyan-500 shadow-lg'
                  : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        
        {filteredPosts.length > 0 ? (
          <div className="flex flex-wrap -mx-3">
            {filteredPosts.map(post => (
              <div
                key={post.$id}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <div className='w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-white mb-2">No posts found</p>
            <p className="text-slate-400">in this category.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPost;
