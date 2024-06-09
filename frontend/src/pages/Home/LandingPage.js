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
    <div className="w-full relative bg-gray-100 overflow-y-auto flex flex-col items-end justify-start py-[5.5px] px-0 box-border gap-[100px] leading-[normal] tracking-[normal] mq900:gap-[75px] mq450:gap-[44px] mq1350:gap-[150px] mq1300:gap-[87px]">
      <LogSign />
      <section className="self-stretch flex flex-col items-start justify-start gap-[100px] max-w-full">
        <FooterElement />
        <Services />
      </section>
      <Pricing />
      <Reviews />
      <ContactUs />
    </div>
  );
};
export default LandingPage;