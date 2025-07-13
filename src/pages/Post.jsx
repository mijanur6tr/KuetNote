import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import service from '../appWrite/config';
import parse from 'html-react-parser';
import { Button, Container } from '../components';
import authService from '../appWrite/auth';

const Post = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);

        if (!slug) return navigate('/');

        const fetchedPost = await service.getPost(slug);
        if (!fetchedPost) return navigate('/');

        setPost(fetchedPost);

        if (currentUser && fetchedPost.userId === currentUser.$id) {
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

  if (loading) return <p className="text-center text-lg text-gray-500 py-10">Loading post...</p>;

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full max-w-3xl mx-auto bg-white border rounded-xl shadow-md p-6">

          <div className="w-full flex justify-center mb-6">
            <img
              src={service.previewFile(post.featuredImage)}
              alt={post.title}
              className="max-w-full max-h-[400px] rounded-lg mx-auto"
            />
          </div>

          <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>

          <div className="prose max-w-none mb-6">{parse(post.content)}</div>

          {isAuthor && (
            <div className="flex justify-center gap-10 mt-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500 hover:bg-green-600"
                  className="px-6 py-1 rounded-xl shadow-md transition duration-300 text-white font-medium"
                >
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="bg-red-500 hover:bg-red-600"
                className="px-3 py-1 rounded-xl shadow-md transition duration-300 text-white font-medium"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
