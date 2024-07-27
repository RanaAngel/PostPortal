import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51PdBs1RtMCZpc0lvO5sPihZRLyQSMdPsb70MVxqmrCNaAOWESutiE1g0bekhV0YSWh588OZH1YA5CgmyTgGrIEZv00jEni0OPv');  // Initialize Stripe

const Pricing = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

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
          toast.success('payment successful');
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <Sidebar />
    <main className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_233px)] mq1050:max-w-full">
      <Navbar
        gettingStarted="Getting Started"
        mingcuteuser4Line="/mingcuteuser4line-1.svg"
      />
      <section className="self-stretch flex flex-row items-center justify-center py-[87.9px] px-5 box-border max-w-full shrink-0 mq450:pt-[29px] mq450:pb-[29px] mq450:box-border mq725:pt-[37px] mq725:pb-[37px] mq725:box-border mq1000:pt-11 mq1000:pb-11 mq1000:box-border">
    <div
      className={`flex-1 flex flex-col items-center text-wrap w-1/2 justify-center font-extrabold  gap-[80px] text-left text-lg text-gray-500 font-inter mq750:gap-[46px] mq450:gap-[23px]`}
    >
      <div className="flex flex-col items-center justify-start gap-[1px] max-w-full">
        <h2 className="m-0 w-2/3 h-1/2 relative text-center font-bold font-inherit inline-block shrink-0 max-w-full mq450:text-lg mq1050:text-sm">{`CHOOSE A PLAN. WE OFFER OUR SERVICE IN AFFORDABLE PRICE `}</h2>
      </div>

     <div className="w-[1608.4px] flex flex-row items-end justify-center py-0 px-5 box-border max-w-full text-41xl text-gray-300">
          <div className="w-[1106.4px] flex flex-row items-start justify-evenly max-w-full gap-[20px] mq1300:flex-wrap">
            <div className="w-[432.4px] shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(250,_250,_250,_0.2),_rgba(0,_0,_0,_0.2))] flex flex-col items-start justify-start pt-[98px] px-0 pb-px box-border gap-[154px] min-w-[432.4px] shrink-0 max-w-full mq450:gap-[77px] mq900:pt-16 mq900:pb-5 mq900:box-border mq900:min-w-full mq1300:flex-1">
              <div className="self-stretch h-[478px] relative shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(250,_250,_250,_0.2),_rgba(0,_0,_0,_0.2))] hidden" />
              <div className="w-[322.2px] h-[82px] flex flex-row items-start justify-start py-0 px-[42px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex-1 flex flex-col items-start justify-evenly">
                  <div className="self-stretch flex flex-row items-center justify-evenly py-0 pr-0 pl-[7px]">
                    <h1 className="m-0 h-[82px] flex-1 relative text-inherit font-extrabold font-inherit inline-block z-[1] mq450:text-17xl mq900:text-29xl">
                      <p className="m-0">&nbsp;</p>
                      <p className="m-0">FREE</p>
                    </h1>
                  </div>
                  <b className="relative text-base tracking-[0.08em] inline-block text-palevioletred min-w-[122px] z-[1] mt-[-40px]">
                    {" "}
                    * START FOR
                  </b>
                </div>
              </div>
              <div className="self-stretch rounded-xl bg-whitesmoke-200 flex flex-row items-end justify-start pt-[21px] pb-7 pr-[35px] pl-[41px] box-border gap-[11.2px] max-w-full z-[1] text-base mq450:flex-wrap">
                <div className="h-[143px] w-[432.4px] relative rounded-xl bg-whitesmoke-200 hidden max-w-full" />
                <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[3px]">
                  <div className="flex flex-col items-start justify-start gap-[5.3px]">
                    <img
                      className="w-[18.1px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect.svg"
                    />
                    <img
                      className="w-[18.1px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect.svg"
                    />
                    <img
                      className="w-[18.1px] h-[17px] relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-2.svg"
                    />
                    <div className="flex flex-row items-start justify-start py-0 pr-0.5 pl-px">
                      <img
                        className="h-[13px] w-[15.1px] relative overflow-hidden shrink-0 z-[2]"
                        loading="lazy"
                        alt=""
                        src="/makicross.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[3.5px] min-w-[212px] max-w-full">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full">
                    <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
                      <div className="flex flex-col items-start justify-start pt-[13px] px-0 pb-0">
                        <div className="flex flex-col items-start justify-start gap-[3px] shrink-0">
                          <div className="relative font-semibold inline-block min-w-[113.9px] z-[2]">
                            User Analytics
                          </div>
                          <div className="relative font-semibold inline-block min-w-[99.8px] z-[2]">
                            Data Metrics
                          </div>
                        </div>
                      </div>
                      <button className="cursor-pointer [border:none] pt-2 px-[34px] pb-[7px] bg-slateblue rounded-11xl flex flex-row items-start justify-start shrink-0 z-[2] hover:bg-mediumslateblue-200">
                        <div className="h-[35px] w-[110.9px] relative rounded-11xl bg-slateblue hidden" />
                        <b className="relative text-base inline-block font-body-body1-regular text-black-main-text text-left min-w-[41.3px] z-[1]">
                          FREE
                        </b>
                      </button>
                    </div>
                  </div>
                  <div className="relative font-semibold z-[2]">
                    Post Management Dashboard
                  </div>
                  <div className="relative leading-[16px] font-semibold inline-block min-w-[112.9px] z-[2]">
                    Schedule Post
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[429px] shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.2),_rgba(0,_0,_0,_0.2))] flex flex-col items-start justify-start pt-[93px] px-0 pb-0 box-border gap-[174px] min-w-[429px] shrink-0 max-w-full mq450:gap-[87px] mq900:pt-[60px] mq900:box-border mq900:min-w-full mq1300:flex-1">
              <div className="self-stretch h-[478px] relative shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.2),_rgba(0,_0,_0,_0.2))] hidden" />
              <div className="w-[253px] flex flex-row items-start justify-start py-0 px-[35px] box-border">
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch h-[66px] relative font-extrabold inline-block shrink-0 z-[1] mq450:text-17xl mq900:text-29xl">
                    <p className="m-0">&nbsp;</p>
                    <p className="m-0">$ 100</p>
                  </div>
                  <b className="w-[179px] relative text-base tracking-[0.08em] inline-block text-palevioletred z-[1] mt-[-17px]">
                    {" "}
                    * BUY PREMIUM
                  </b>
                </div>
              </div>
              <div className="self-stretch rounded-xl bg-whitesmoke-200 flex flex-row items-start justify-start pt-[22px] pb-[29px] pr-5 pl-[35px] box-border gap-[2px] max-w-full z-[1] text-base mq450:flex-wrap">
                <div className="h-[143px] w-[429px] relative rounded-xl bg-whitesmoke-200 hidden max-w-full" />
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <div className="flex flex-col items-start justify-start gap-[8px]">
                    <img
                      className="w-[18px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-3.svg"
                    />
                    <img
                      className="w-[18px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-3.svg"
                    />
                    <img
                      className="w-[18px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-3.svg"
                    />
                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px">
                      <img
                        className="h-4 w-[18px] relative overflow-hidden shrink-0 z-[2]"
                        loading="lazy"
                        alt=""
                        src="/iconparkcorrect-3.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border min-w-[160px]">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                    <div className="w-[150px] flex flex-row items-start justify-start py-0 px-0.5 box-border">
                      <div className="flex-1 relative font-semibold whitespace-pre-wrap z-[2]">
                        {" "}
                        User Analytics
                      </div>
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 px-[11px]">
                      <div className="relative font-semibold inline-block min-w-[107px] z-[2]">
                        Data Metrics
                      </div>
                    </div>
                    <div className="self-stretch relative font-semibold whitespace-pre-wrap z-[2]">
                      {" "}
                      Post Management Dashboard
                    </div>
                    <div className="w-[154px] flex flex-row items-start justify-start py-0 px-px box-border">
                      <div className="h-2.5 flex-1 relative font-semibold whitespace-pre-wrap inline-block z-[2]">
                        {" "}
                        Schedule Post
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={createCheckoutSession} className="cursor-pointer [border:none] pt-[9px] pb-2 pr-8 pl-[35px] bg-slateblue rounded-11xl flex flex-row items-start justify-start z-[2] hover:bg-mediumslateblue-200">
                  <div className="h-[35px] w-[104.4px] relative rounded-11xl bg-slateblue hidden" />
                  <b className="relative text-base inline-block font-body-body1-regular text-black-main-text text-left min-w-[37px] z-[3]">
                    BUY
                  </b>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
    </section>
      </main>
    </div>
  );
};

Pricing.propTypes = {
  className: PropTypes.string,
};

export default Pricing;