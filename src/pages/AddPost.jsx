import React from 'react';
import { useSelector } from 'react-redux';
import { Container, PostForm ,Loader } from '../components';

const AddPost = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'>
      <PostForm />
    </div>
  );
};

export default AddPost;
