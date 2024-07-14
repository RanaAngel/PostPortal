import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostAnalytics = () => {
  const { postId } = useParams();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Fetch the analytics for the post
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/facebook/analytics/${postId}`);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [postId]);

  return (
    <div>
      <h2>Post Analytics</h2>
      {analytics ? (
        <div>
          <p>Likes: {analytics.likes}</p>
          <p>Comments: {analytics.comments}</p>
          <p>Shares: {analytics.shares}</p>
          {/* Add more analytics fields as needed */}
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default PostAnalytics;
