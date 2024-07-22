import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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
<<<<<<< Updated upstream
=======
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <Sidebar />
    <main className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_233px)] mq1050:max-w-full">
      <Navbar
        gettingStarted="Getting Started"
        mingcuteuser4Line="/mingcuteuser4line-1.svg"
      />
      <section className="self-stretch flex flex-row items-center justify-center py-[87.9px] px-5 box-border max-w-full shrink-0 mq450:pt-[29px] mq450:pb-[29px] mq450:box-border mq725:pt-[37px] mq725:pb-[37px] mq725:box-border mq1000:pt-11 mq1000:pb-11 mq1000:box-border">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  </section>
      </main>
    </div>
>>>>>>> Stashed changes
);
};

export default Library;