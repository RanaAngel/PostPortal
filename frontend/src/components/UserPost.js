// UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { set } from 'mongoose';

const UserPost = () => {
  const [userpost, setUserPost] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/get_post');
      setUserPost(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete_post/${postId}`);
      setUserPost(userpost.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
    <h2 className="text-xl font-bold mb-4">User's Post Table</h2>
    <table className="w-full text-left text-gray-500">
      <thead>
        <tr>
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">User</th>
          <th className="px-4 py-2">Post Content</th>
          <th className="px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {userpost.map((post, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{index + 1}</td>
            <td className="px-4 py-2">{post.userID}</td>
            <td className="px-4 py-2">{post.content}</td>
            <td className="px-4 py-2">{post.dateTime}</td>
            <td className="px-4 py-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded-md mr-2">Edit</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => handleDelete(post._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UserPost;
