import React, { useContext, useEffect } from 'react';
import { Container, PostCard, Loader } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { ContextStore } from '../context/contextStore';
import { useSelector } from 'react-redux';

const MyProfile = () => {
  const { myPostList, loading } = useContext(ContextStore);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const myPosts = myPostList
    .filter((post) => post.status === "Public")
    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {loading ? (
        <Loader />
      ) : (
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
            
            {/* Left Sidebar - Profile Info */}
            <div className='lg:col-span-3'>
              <div className='sticky top-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700/50'>
                <div className="flex flex-col items-center text-center space-y-5">
                  {/* Avatar */}
                  <div className="relative">
                    <div className='w-28 h-28 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl'>
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div>
                    <h1 className="text-xl font-extrabold text-white leading-tight">
                      {user?.name}
                    </h1>
                    <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent text-sm font-medium">
                      KUET Community Member
                    </span>
                  </div>

                  {/* Email */}
                  <p className="text-slate-400 text-sm font-medium px-4">
                    {user?.email}
                  </p>

                  {/* Stats */}
                  <div className='w-full grid grid-cols-2 gap-3 pt-2'>
                    <div className='bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/30'>
                      <p className='text-cyan-400 font-bold text-xl'>{myPostList.length}</p>
                      <p className='text-slate-400 text-xs'>Posts</p>
                    </div>
                    <div className='bg-slate-800/50 rounded-xl p-3 text-center border border-slate-700/30'>
                      <p className='text-amber-400 font-bold text-xl'>{myPosts.length}</p>
                      <p className='text-slate-400 text-xs'>Public</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='w-full space-y-3 pt-2'>
                    <Link
                      to={"/add-post"}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Post
                    </Link>

                    <Link
                      to={"/my-post"}
                      className="w-full px-4 py-3 rounded-xl text-white text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      My Posts
                    </Link>
                  </div>

                  {/* Member Since */}
                  <div className='pt-4 border-t border-slate-700/50 w-full'>
                    <p className='text-xs text-slate-500 leading-relaxed'>
                      Member since {user?.$createdAt ? new Date(user.$createdAt).getFullYear() : '2024'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
              
            {/* Main Content - General Profile Info */}
            <div className='lg:col-span-6'>
              {/* Header */}
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-white mb-2'>My Profile</h2>
                <div className='h-1 w-20 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full'></div>
              </div>

              {/* Profile Details Card */}
              <div className='bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 mb-6'>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                    <div className="w-32">
                      <p className="text-slate-400 text-sm">Full Name</p>
                    </div>
                    <p className="text-white font-medium">{user?.name || 'N/A'}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                    <div className="w-32">
                      <p className="text-slate-400 text-sm">Email Address</p>
                    </div>
                    <p className="text-white font-medium">{user?.email || 'N/A'}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                    <div className="w-32">
                      <p className="text-slate-400 text-sm">User ID</p>
                    </div>
                    <p className="text-white font-medium text-sm break-all">{user?.$id || 'N/A'}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
                    <div className="w-32">
                      <p className="text-slate-400 text-sm">Member Since</p>
                    </div>
                    <p className="text-white font-medium">
                      {user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className='bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50'>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Activity Summary
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl p-4 text-center border border-cyan-500/30">
                    <p className="text-2xl font-bold text-cyan-400">{myPostList.length}</p>
                    <p className="text-slate-400 text-xs">Total Posts</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 text-center border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{myPosts.length}</p>
                    <p className="text-slate-400 text-xs">Public</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl p-4 text-center border border-amber-500/30">
                    <p className="text-2xl font-bold text-amber-400">{myPostList.length - myPosts.length}</p>
                    <p className="text-slate-400 text-xs">Private</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 text-center border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">∞</p>
                    <p className="text-slate-400 text-xs">Ideas Shared</p>
                  </div>
                </div>
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
                    href="https://kuetbubble.com"
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

export default MyProfile;
