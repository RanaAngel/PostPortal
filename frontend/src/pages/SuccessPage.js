import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const userId = urlParams.get('userId');

    if (sessionId && userId) {
      const completePayment = async () => {
        try {
          const response = await axios.get('http://44.207.233.50:5000/stripe/complete', {
            params: { session_id: sessionId, userId: userId },
          });

          const { status, redirectUrl } = response.data;

          if (status === 'completed') {
            alert('Payment completed successfully!');
          } else if (status === 'failed') {
            alert('Payment failed. Please try again.');
          }

          // Redirect to the specified URL after payment completion
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        } catch (error) {
          console.error('Error completing payment:', error);
          alert('An error occurred while processing the payment.');
        }
      };

      completePayment();
    }
  }, [navigate]);

  return (
    <div>
      <h1>Congratulations!</h1>
      <p>Processing your payment...</p>
    </div>
  );
};

export default SuccessPage;
