import React from 'react';
import { useSelector } from 'react-redux';
import { Container, PostForm } from '../components';

const AddPost = () => {
  const user = useSelector(state => state.auth.userData);

  if (!user?.$id) {
    return (
      <Container>
        <div className="text-center py-20 text-slate-600 text-lg font-medium">
          Loading user info... Please wait.
        </div>
      </Container>
    );
  }

  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
