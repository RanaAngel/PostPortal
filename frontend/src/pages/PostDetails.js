// src/pages/PostDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Add navigate to redirect after deletion
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/facebook/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const showToast = (message, onConfirm, onCancel) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>{message}</p>
                    <div>
                        <button
                            onClick={() => {
                                onConfirm();
                                closeToast();
                            }}
                            className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => {
                                onCancel();
                                closeToast();
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            { closeOnClick: false, autoClose: false }
        );
    };

    const onConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/facebook/posts/${id}`);
            toast.success('Post deleted successfully');
            setTimeout(() => {
                navigate('/library');
            }, 800);
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete post');
        }
    };

    showToast(
        'Are you sure you want to delete this post?',
        onConfirmDelete,
        () => toast.info('Delete action canceled')
    );
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!post) return <div>Post not found.</div>;

  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal]">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start justify-start">
        <Navbar
          gettingStarted="Post Details"
          mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch flex flex-col items-center justify-center py-[87.9px] px-5">
        <ToastContainer />
          <div className="w-full max-w-[800px] bg-white p-5 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <img
              className="w-full h-auto rounded-lg mb-4"
              alt={post.title}
              src={post.imageURL}
            />
            <p className="text-lg mb-4">{post.content}</p>
            <div className="text-sm text-gray-500 mb-4">
              <p>{post.scheduleDate ? `Scheduled Date: ${new Date(post.scheduleDate).toLocaleDateString()}` : `Posted Date: ${new Date(post.postedAt).toLocaleDateString()}`}</p>
            </div>
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Post
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostDetails;
