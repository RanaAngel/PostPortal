// frontend/client/src/components/LandingPage.js

import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div>
//       <h1>Welcome to My App</h1>
//       <div>
//         <Link to="/signup">Signup</Link>
//         <Link to="/login">Login</Link>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import LogSign from './LogSign';
import FooterElement from './Main';
import Services from './Services';
import Pricing from './Pricing';
import Reviews from './Reviews';
import ContactUs from './ContactUs';

const LandingPage = () => {
  return (
<<<<<<< Updated upstream
    <div className="w-full relative bg-gray-100 overflow-y-auto flex flex-col items-end justify-start py-[5.5px] px-0 box-border gap-[100px] leading-[normal] tracking-[normal] mq900:gap-[75px] mq450:gap-[44px] mq1350:gap-[150px] mq1300:gap-[87px]">
      <LogSign />
      <section className="self-stretch flex flex-col items-start justify-start gap-[100px] max-w-full">
        <FooterElement />
        <Services />
      </section>
      <Pricing />
      <Reviews />
      <ContactUs />
=======
    <div className="w-full absolute bg-neutral-main-50 overflow-y-auto flex flex-col items-center justify-start pt-0 px-0 pb-[108.7px] box-border gap-[64px] tracking-[normal] leading-[normal] mq450:gap-[16px] mq900:gap-[16px] mq1300:gap-[32px]">
      <NavTopBar />
      <main className="w-[1785px] flex flex-col items-center justify-start py-0 pr-0 pl-5 box-border gap-[129px] max-w-full mq450:gap-[16px] mq900:gap-[32px] mq1300:gap-[64px]">
        <section className="self-stretch flex flex-col items-start justify-start gap-[64px] max-w-full text-left text-lg text-gray-100 font-body-body1-regular mq450:gap-[16px] mq900:gap-[32px]">
          <FrameComponent3 />
          <div className="w-[1699px] flex flex-col items-start justify-start pt-0 pb-[17px] pr-5 pl-0 box-border gap-[20px] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[11px]">
              <div className="w-[188px] relative font-medium inline-block">
                WHAT WE PROVIDE
              </div>
              <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black" />
            </div>
            <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] text-11xl text-black-main-background mq1650:flex-wrap">
              <div className="w-[574px] flex flex-col items-start justify-start pt-[13px] px-0 pb-0 box-border min-w-[574px] max-w-full mq900:min-w-full mq1650:flex-1">
                <h2
                  className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-lg mq900:text-5xl"
                  data-scroll-to="cARETOEXPLORE"
                >
                  CARE TO EXPLORE OUR SERVICES? GET TO MANAGE POSTS IN ONE CLICK
                </h2>
              </div>
              <div className="w-[1014px] relative text-xl font-medium text-gray-100 inline-block shrink-0 max-w-full mq450:text-base">
                Explore our services with ease and manage your posts with just
                one click. Our platform lets you schedule posts across different
                media and provides metrics for analyzing user engagement, all
                from one intuitive dashboard. With our user-friendly platform,
                exploring our services is as easy as a single click. You'll be
                able to manage your posts effortlessly, saving you time and
                energy.
              </div>
            </div>
          </div>
          <FrameComponent2 />
        </section>
        <SocialMediaHeading />
        <FrameComponent1 />
        <FrameComponent />
      </main>
>>>>>>> Stashed changes
    </div>
  );
};
export default LandingPage;