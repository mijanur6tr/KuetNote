import React from 'react';
import { useSelector } from 'react-redux';
import { Container, PostForm ,Loader } from '../components';

const AddPost = () => {
  

 

  return (
    <div className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
