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
          const response = await axios.get('http://localhost:5000/stripe/complete', {
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
    <section class="h-full bg-white items-end justify-end text-white">
  <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div class="mx-auto max-w-3xl text-center">
      <h1
        class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-wrap bg-clip-text text-2xl font-extrabold text-transparent sm:text-5xl"
      >
        CONGRATULATIONS!

      </h1>

      <h1
        class=" mx-auto mt-4 max-w-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-wrap bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >

        <span class="sm:block"> YOUR PAYMENT HAVE BEEN COMPLETED </span>
      </h1>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <img
          class="block rounded border px-12 py-3 text-sm font-medium text-white  focus:outline-none focus:ring sm:w-auto"
          loading="lazy"
          alt=""
          src="/ep_success-filled.png"
        >
        </img>

      </div>
    </div>
  </div>
</section>
  );
};

export default SuccessPage;
