import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import service from '../appWrite/config';
import parse from 'html-react-parser';
import { Button, Container, Loader } from '../components';
import { ContextStore } from '../context/contextStore';
import { formatDistanceToNow } from 'date-fns';

const Post = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(ContextStore)

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        
        if (!slug) return navigate('/');

        const fetchedPost = await service.getPost(slug);
        if (!fetchedPost) return navigate('/');

        setPost(fetchedPost);

        if (user && fetchedPost.userId === user.$id) {
          setIsAuthor(true);
        }
      } catch (error) {
        console.error("Error fetching post/user:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndUser();
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = await service.deletePost(post.$id);
      if (status) {
        await service.deleteFile(post.featuredImage);
        navigate('/');
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <Loader />;

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Post Card */}
          <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            {/* Decorative top bar */}
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500"></div>
            
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="w-full h-64 md:h-96 overflow-hidden relative">
                <img
                  src={service.previewFile(post.featuredImage)}
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

              {/* Author & Date */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center text-white font-bold">
                    {post.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{post.userName}</p>
                    <p className="text-slate-400 text-sm">
                      {formatDistanceToNow(new Date(post.$createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === 'Public' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 hover:prose-a:text-slate-300 text-amber-50">
                {parse(post.content)}
              </div>

              {/* Action Buttons */}
              {isAuthor && (
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-700/50">
                  <Link to={`/edit-post/${post.$id}`}>
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
      </Container>
    </div>
  ) : null;
};

export default Post;
