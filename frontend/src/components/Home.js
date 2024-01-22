import React from 'react';
import Posts from './Posts';
import Post from './Post';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  if (!isLoggedIn) {
    navigate('/login');
    
  }

  return (
    <div>
      <Post />
      <Posts />
    </div>
  );
};

export default Home;
