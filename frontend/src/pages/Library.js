import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Library = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the posts from the server
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/facebook/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post-analytics/${postId}`);
  };

  return (
    <div>
      <h2>Library</h2>
      {posts.map((post) => (
        <div key={post._id} onClick={() => handlePostClick(post._id)}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Library;
