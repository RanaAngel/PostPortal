import React, { useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  let notified = false;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const userId = urlParams.get('userId');
    const notifySuccess = (message) => !notified && toast.success(message);
    const notifyError = (message) => !notified && toast.error(message);

    if (sessionId && userId) {
      const completePayment = async () => {
        try {
          const response = await axios.get('http://localhost:5000/stripe/complete', {
            params: { session_id: sessionId, userId: userId },
          });

          const { status, redirectUrl } = response.data;

          if (status === 'completed') {
            notifySuccess('Payment completed successfully!');
            notified = true;
          } else if (status === 'failed') {
            notifyError('Payment failed. Please try again.');
            notified = true;
          }

          // Redirect to the specified URL after payment completion
          if (redirectUrl) {
            setTimeout(() => {
              window.location.href = redirectUrl;
            }, 1000);
          }
        } catch (error) {
          console.error('Error completing payment:', error);
          notifyError('An error occurred while processing the payment.');
          notified = true;
        }
      };

      completePayment();
    }
  }, [navigate]);

  return (
    <section className="h-full bg-white items-end justify-end text-white">
      <ToastContainer />
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-wrap bg-clip-text text-2xl font-extrabold text-transparent sm:text-5xl"
          >
            CONGRATULATIONS!
          </h1>
          <h1
            className="mx-auto mt-4 max-w-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-wrap bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            <span className="sm:block"> YOUR PAYMENT HAS BEEN COMPLETED </span>
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <img
              className="block rounded border px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring sm:w-auto"
              loading="lazy"
              alt=""
              src="/ep_success-filled.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
