import React, { useState } from 'react';
import PropTypes from "prop-types";
import { jwtDecode } from 'jwt-decode';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51PdBs1RtMCZpc0lvO5sPihZRLyQSMdPsb70MVxqmrCNaAOWESutiE1g0bekhV0YSWh588OZH1YA5CgmyTgGrIEZv00jEni0OPv');  // Initialize Stripe



const UpgradePlan = ({ className = "" }) => {
    const [selectedPlan, setSelectedPlan] = useState(null);
  
    const plans = [
      {
        title: "START FOR",
        price: "FREE",
        features: ["User Analytics", "Data Metrics", "Post Management Dashboard", "Schedule Post"],
        buttonLabel: "FREE",
        onButtonClick: () => {
          console.log("Free plan selected");
          setSelectedPlan('free');
        },
      },
      {
        title: "BUY PREMIUM",
        price: "$ 100",
        features: ["User Analytics", "Data Metrics", "Post Management Dashboard", "Schedule Post"],
        buttonLabel: "BUY",
        onButtonClick: () => {
          console.log("Premium plan selected");
          setSelectedPlan('premium');
        },
      },
    ];

// Function to get user ID from JWT token
const getUserIdFromToken = (token) => {
  try {
    // Decode the token
    const decodedToken = jwtDecode(token);
    
    // Extract the user ID (assuming it's stored as 'userId' in the payload)
    const userId = decodedToken.userId;
    
    return userId;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
// const token = localStorage.getItem('token'); // or get the token from your preferred storage
// const userId = getUserIdFromToken(token);

// console.log('User ID:', userId);
  
const createCheckoutSession = async () => {
  try {
      const userId = getUserIdFromToken(localStorage.getItem('token'));
      const response = await fetch('http://localhost:5000/stripe/checkout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
      });
      const session = await response.json();
      console.log(session.url);
      console.log(session.id);

      // Redirect to Checkout
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
          console.error(result.error.message);
      } else {
          alert('successful payment');
      }
  } catch (error) {
      console.error('Error creating checkout session:', error);
  }
};
         

  return (
    <section
    className={`w-full sm:w-[80%] md:w-[90%] lg:w-[95%] flex flex-row items-start justify-start pt-0 px-2.5 pb-[51px] box-border max-w-full text-left text-lg text-gray-100 font-body-body1-regular mq900:pb-[33px] mq900:box-border ${className}`}
    >
      
        
        <div className="w-[1608.4px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-41xl text-gray-300">
          <div className="w-[1106.4px] flex flex-row items-start justify-between max-w-full gap-[20px] mq1300:flex-wrap">
          {plans.map((plan, index) => (
              <div
                key={index}
                className="w-[432.4px] shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(250,_250,_250,_0.2),_rgba(0,_0,_0,_0.2))] flex flex-col items-start justify-start pt-[98px] px-0 pb-px box-border gap-[154px] min-w-[432.4px] shrink-0 max-w-full mq450:gap-[77px] mq900:pt-16 mq900:pb-5 mq900:box-border mq900:min-w-full mq1300:flex-1"
              >
                <div className="w-[322.2px] h-[82px] flex flex-row items-start justify-start py-0 px-[42px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
                  <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[7px]">
                      <h1 className="m-0 h-[82px] flex-1 relative text-inherit font-extrabold font-inherit inline-block z-[1] mq450:text-17xl mq900:text-29xl">
                        <p className="m-0">&nbsp;</p>
                        <p className="m-0">{plan.price}</p>
                      </h1>
                    </div>
                    <b className="relative text-base tracking-[0.08em] inline-block text-palevioletred min-w-[122px] z-[1] mt-[-40px]">
                      {plan.title}
                    </b>
                  </div>
                </div>
                <div className="self-stretch rounded-xl bg-whitesmoke-200 flex flex-row items-end justify-start pt-[21px] pb-7 pr-[35px] pl-[41px] box-border gap-[11.2px] max-w-full z-[1] text-base mq450:flex-wrap">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[3.5px] min-w-[212px] max-w-full">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="relative font-semibold z-[2]">
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button
                    className="cursor-pointer [border:none] pt-2 px-[34px] pb-[7px] bg-slateblue rounded-11xl flex flex-row items-start justify-start shrink-0 z-[2] hover:bg-mediumslateblue-200"
                    onClick={() => {
                        plan.onButtonClick();
                        setSelectedPlan(plan.title.toLowerCase());
                        if (plan.title === 'BUY PREMIUM') {
                          createCheckoutSession();
                        }
                      }}
                    
                  >
                    <div className="h-[35px] w-[110.9px] relative rounded-11xl bg-slateblue hidden" />
                    <b className="relative text-base inline-block font-body-body1-regular text-black-main-text text-left min-w-[41.3px] z-[1]">
                      {plan.buttonLabel}
                    </b>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
     
    </section>
  );
};

UpgradePlan.propTypes = {
  className: PropTypes.string,
};

export default UpgradePlan;
