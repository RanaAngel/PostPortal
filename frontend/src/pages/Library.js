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
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Library</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          onClick={() => handlePostClick(post._id)}
        >
          <img src={post.imageURL} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Library;