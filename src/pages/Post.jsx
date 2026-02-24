import React, { useEffect, useState } from 'react';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import apiService from '../services/api';
import parse from 'html-react-parser';
import { Button, Container, Loader, CommentCard } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, createComment, updateComment, deleteComment, upvoteComment, downvoteComment } from '../store/commentSlice';
import { deletePost as deletePostAction, upvotePost, downvotePost } from '../store/postSlice';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import { Send } from 'lucide-react';

const Post = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();

  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const { comments } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        
        if (!slug) return navigate('/');

        const fetchedPost = await apiService.getPost(slug);
        if (!fetchedPost) return navigate('/');

        setPost(fetchedPost);

        // Compare userId - it could be an object (populated) or string
        const postUserId = typeof fetchedPost.userId === 'object' ? fetchedPost.userId._id : fetchedPost.userId;
        if (user && postUserId === user.id) {
          setIsAuthor(true);
        }

        dispatch(fetchComments(fetchedPost._id));
      } catch (error) {
        console.error("Error fetching post/user:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPostAndUser();
    }
  }, [slug, navigate, user, dispatch]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const result = await dispatch(createComment({ content: newComment, postId: post._id }));
    if (result.meta.requestStatus === 'fulfilled') {
      setNewComment('');
    }
  };

  const handleUpvote = async () => {
    await dispatch(upvotePost(post.slug));
    // Refetch post to get updated votes
    try {
      const updatedPost = await apiService.getPost(post.slug);
      setPost(updatedPost);
    } catch (error) {
      console.error('Error refetching post:', error);
    }
  };

  const handleDownvote = async () => {
    await dispatch(downvotePost(post.slug));
    // Refetch post to get updated votes
    try {
      const updatedPost = await apiService.getPost(post.slug);
      setPost(updatedPost);
    } catch (error) {
      console.error('Error refetching post:', error);
    }
  };

  const handleCommentUpdate = () => {
    // Comments are updated automatically by Redux
  };

  const handleCommentDelete = () => {
    // Comments are updated automatically by Redux
  };

  const deletePost = async () => {
    try {
      const result = await dispatch(deletePostAction(post.slug));
      if (result.meta.requestStatus === 'fulfilled') {
        // Delete featured image if it exists
        if (post.featuredImage) {
          try {
            await apiService.deleteFile(post.featuredImage);
          } catch (imageError) {
            console.error('Failed to delete image:', imageError);
          }
        }
        toast.success('Post deleted successfully!');
        setShowDeleteModal(false);
        navigate('/my-post');
      } else {
        toast.error('Failed to delete post.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Error deleting post.');
    }
  };

  if (loading) return <Loader />;

  return post ? (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
                    Thought Share
                  </span>
                </div>
          
                <p className="text-slate-300 text-sm font-medium">
                  Every idea matters. Express yours.
                </p>

                <Link
                  to="/add-post"
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
              </div>
            </div>
          </div>

          {/* Main Content - Post */}
          <div className='lg:col-span-6'>
            {/* Post Card */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
              {/* Decorative top bar */}
              <div className="h-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500"></div>
              
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="w-full h-64 md:h-96 overflow-hidden relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Category Badge */}
                {post.category && (
                  <div className="mb-4">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md">
                      {post.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>

                {/* Author & Date & Menu */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center text-white font-bold">
                      {post.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{post.userName}</p>
                      <p className="text-slate-400 text-sm">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === 'Public' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                    }`}>
                      {post.status}
                    </span>
                    
                    {isAuthor && (
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpen(!menuOpen)}
                          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200"
                        >
                          <svg className="w-5 h-5 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm0 2c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm0 6c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z" />
                          </svg>
                        </button>
                        
                        {menuOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10">
                            <Link to={`/edit-post/${post.slug}`}>
                              <button className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 flex items-center gap-2 first:rounded-t-lg">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                            </Link>
                            <button 
                              onClick={() => {
                                setMenuOpen(false);
                                setShowDeleteModal(true);
                              }}
                              className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900/30 transition-colors duration-200 flex items-center gap-2 last:rounded-b-lg"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 hover:prose-a:text-slate-300 text-amber-50 mb-6">
                  {parse(post.content)}
                </div>

                {/* Stats Line */}
                <div className="flex items-center gap-6 py-4 border-y border-slate-700/50 mb-6">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleUpvote}
                      className={`p-1 rounded transition-colors duration-200 ${post.upvotes?.includes(user?.id) ? 'text-green-400' : 'text-slate-400 hover:text-green-400'}`}
                    >
                      ▲
                    </button>
                    <span className="text-slate-400 text-sm">{post.upvotes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleDownvote}
                      className={`p-1 rounded transition-colors duration-200 ${post.downvotes?.includes(user?.id) ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}`}
                    >
                      ▼
                    </button>
                    <span className="text-slate-400 text-sm">{post.downvotes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2l-4 4v-4z" />
                    </svg>
                    <span className="text-slate-400 text-sm">{post && comments[post._id]?.length || 0}</span>
                  </div>
                </div>

                {/* Action Buttons - Hidden, using menu instead */}
                {isAuthor && (
                  <div className="hidden">
                    <Link to={`/edit-post/${post.slug}`}>
                      <Button
                        className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Post
                      </Button>
                    </Link>

                    <Button
                      onClick={deletePost}
                      className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Post
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Comments</h3>

              {/* Add Comment */}
              {user && (
                <div className="mb-6">
                  <div className="relative">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-4 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 resize-none focus:border-cyan-500 focus:outline-none pr-12"
                      rows={3}
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="absolute bottom-3 right-3 p-2 text-cyan-500 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {post && comments[post._id]?.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    comment={comment}
                  />
                ))}
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-6 text-center">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>

          {/* Right Sidebar - KuetBubble Advertisement */}
          <div className='lg:col-span-3 hidden lg:block'>
            <div className='sticky top-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 shadow-2xl border border-purple-700/50 overflow-hidden hover:border-purple-500/50 transition-all duration-300'>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 max-w-sm w-full p-6">
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7m0 6h2m-2 0h-2m0 0H9m0 0v2m0-6v-2m0 0V7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Delete Post?</h3>
                <p className="text-slate-300 text-sm">
                  This action cannot be undone. Your post and featured image will be permanently deleted.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={deletePost}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default Post;
