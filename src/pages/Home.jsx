import React, { useContext, useEffect } from 'react';
import { Container, PostCard, Loader } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { ContextStore } from '../context/contextStore';
import { useSelector } from 'react-redux';

const Home = () => {
  const { postList, loading } = useContext(ContextStore);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const publicPosts = postList
    .filter((post) => post.status === "Public")
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
   
      {loading ? (
        <Loader />
      ) : (
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
            
            {/* Left Sidebar - Express Yourself */}
            <div className='lg:col-span-3 hidden lg:block'>
              <div className='sticky top-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300'>
                <div className="flex flex-col items-center text-center space-y-5">
                  <div className='w-16 h-16 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg'>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-extrabold text-white leading-tight">
                      Experience
                    </h1>
                    <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent text-2xl font-extrabold">
                      Noteshare
                    </span>
                  </div>
            
                  <p className="text-slate-300 text-sm font-medium">
                    Every idea matters. Express yours.
                  </p>

                  <Link
                    to={"/add-post"}
                    className="w-full px-5 py-3 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </Link>

                  <div className='pt-4 border-t border-slate-700/50 w-full'>
                    <p className='text-xs text-slate-400 leading-relaxed'>
                      Share your thoughts, stories, and knowledge with the community.
                    </p>
                  </div>

                  {/* Stats Section */}
                  <div className='w-full grid grid-cols-2 gap-3 pt-2'>
                    <div className='bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30'>
                      <p className='text-cyan-400 font-bold text-lg'>{publicPosts.length}</p>
                      <p className='text-slate-400 text-xs'>Articles</p>
                    </div>
                    <div className='bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/30'>
                      <p className='text-amber-400 font-bold text-lg'>∞</p>
                      <p className='text-slate-400 text-xs'>Ideas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              
            {/* Main Content - Posts */}
            <div className='lg:col-span-6'>
              {/* Mobile Header - Empty (no express button) */}
              <div className='lg:hidden mb-4'></div>

              {/* Posts Header */}
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-white mb-2'>Latest Articles</h2>
                <div className='h-1 w-20 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full'></div>
              </div>

              {/* Posts List */}
              <div className='space-y-6'>
                {publicPosts.length > 0 ? (
                  publicPosts.map((post) => (
                    <PostCard key={post.$id} {...post} />
                  ))
                ) : (
                  <div className='text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-700/50'>
                    <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className='text-slate-400 text-lg'>No articles yet</p>
                    <p className='text-slate-500 text-sm mt-2'>Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - KuetBubble Advertisement */}
            <div className='lg:col-span-3 hidden lg:block'>
              <div className='sticky top-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 shadow-2xl border border-purple-700/50 overflow-hidden relative hover:border-purple-500/50 transition-all duration-300'>
                {/* Decorative Elements */}
                <div className='absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl'></div>
                
                <div className="relative flex flex-col items-center text-center space-y-5">
                  <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse'>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-tight">
                      KuetBubble
                    </h2>
                    <p className='text-purple-300 text-xs font-medium mt-1'>Anonymous Messaging</p>
                  </div>
            
                  <p className="text-purple-200 text-sm leading-relaxed">
                    Share your thoughts anonymously with fellow KUET students. Your voice, your choice, complete privacy.
                  </p>

                  <div className='bg-white/10 backdrop-blur-sm rounded-xl p-4 w-full border border-white/20'>
                    <p className='text-xs text-purple-100 mb-3 font-medium flex items-center gap-2'>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Popular Topics:
                    </p>
                    <div className='space-y-2 text-left'>
                      <div className='flex items-start gap-2'>
                        <span className='text-purple-400 mt-1'>💡</span>
                        <p className='text-xs text-purple-200'>"Campus life tips?"</p>
                      </div>
                      <div className='flex items-start gap-2'>
                        <span className='text-purple-400 mt-1'>📚</span>
                        <p className='text-xs text-purple-200'>"Best study spots at KUET"</p>
                      </div>
                      <div className='flex items-start gap-2'>
                        <span className='text-purple-400 mt-1'>🤝</span>
                        <p className='text-xs text-purple-200'>"Exam stress support"</p>
                      </div>
                    </div>
                  </div>

                  
                    <a
                    href="https://kuet-bubble.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-5 py-3 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Visit KuetBubble
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                  <div className='pt-4 border-t border-purple-700/50 w-full space-y-2'>
                    <div className='flex items-center justify-center gap-2 text-xs text-purple-300'>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      100% Anonymous
                    </div>
                    <div className='flex items-center justify-center gap-2 text-xs text-purple-300'>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      KUET Students Only
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
