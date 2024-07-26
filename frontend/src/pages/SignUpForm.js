// frontend/client/src/components/SignupForm.js
import { useCallback } from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';


const SignupForm = () => {
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = e => {
  setFormData({ ...formData, [e.target.name]: e.target.value });  
  };

const handleSubmit = async e => {

  e.preventDefault();

     // Check for null values in formData
  for (const key in formData) {
    if (!formData[key]) {
      alert(`${key.toUpperCase()} is required.`);
      return;
    }
  }
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      alert('Signup successful');
      // Redirect or do something else after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.message);
      alert('Signup failed. Please try again.');
    }
  };
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(prevState => !prevState);
};

const navigate = useNavigate();
  const onLOGINTextClick = useCallback(() => {
    // Please sync "log in page" to the project
    navigate('/login');
  }, [navigate]);

  const onCancelContainerClick = useCallback(() => {
    // Please sync "Landing Page" to the project
    navigate('/')
  }, [navigate]);

  // const onRectangleClick = useCallback(() => {
  //   // Please sync "Landing Page" to the project
  // }, []);

  // const onLOGINTextClick = useCallback(() => {
  //   // Please sync "log in page" to the project
  // }, []);

  // const onCancelContainerClick = useCallback(() => {
  //   // Please sync "Landing Page" to the project
  // }, []);

  return (
<div className="w-full relative bg-black-main-background overflow-hidden flex flex-row items-start justify-start pt-20 pb-[142px] pr-[170px] pl-[154px] box-border gap-[121px] tracking-[normal] leading-[normal] text-left text-[40px] text-black-main-text font-inter mq450:gap-[15px] mq450:pr-5 mq450:box-border mq1225:gap-[60px] mq1225:pl-[77px] mq1225:pr-[85px] mq1225:box-border mq850:gap-[30px] mq850:pl-[38px] mq850:pr-[42px] mq850:box-border mq1525:flex-wrap">
<div className="flex-1 flex flex-col items-start justify-start gap-[195px] min-w-[515px] max-w-full mq450:gap-[73px] mq1225:min-w-full mq850:gap-[147px]">
  <div className="self-stretch flex flex-col items-start justify-start gap-[79px] max-w-full mq450:gap-[20px] mq850:gap-[39px]">
    <div className="h-[87px] flex flex-row items-start justify-start py-0 pr-0 pl-2.5 box-border">
      <img
        className="h-20 w-20 relative object-cover"
        loading="lazy"
        alt=""
        src="/95ba66434f85ea111bc97dcb33d85d72-1@2x.png"
      />
    </div>
    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[18px] box-border max-w-full">
      <div className="flex-1 flex flex-col items-start justify-start gap-[44px] max-w-full mq450:gap-[22px]">
        <h1 className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-[24px] mq850:text-[32px]">
          CARE TO EXPLORE OUR SERVICES? GET TO MANAGE POSTS IN SINGLE
          CLICK
        </h1>
        <div className="w-[743px] relative text-xl font-medium text-black-sub-text inline-block max-w-full mq450:text-base">
          Gain access to powerful tools and features designed to
          streamline your social media workflow and boost your online
          presence.
        </div>
      </div>
    </div>
  </div>
  <div className="w-[358px] flex flex-row items-start justify-start py-0 px-[18px] box-border sticky top-[0] z-[99] max-w-full text-xl">
    <div className="flex-1 rounded-11xl bg-lightslategray overflow-hidden flex flex-row items-start justify-start py-0 pr-[33px] pl-0 box-border gap-[37px] max-w-full mq450:gap-[18px]">
      <button className="cursor-pointer [border:none] pt-[25px] px-[27px] pb-[15px] bg-button flex-1 rounded-11xl overflow-hidden flex flex-row items-start justify-end whitespace-nowrap hover:bg-mediumslateblue">
        <div className="h-[37px] w-[100px] relative text-xl font-semibold font-inter text-black-main-text text-left inline-block shrink-0">
          SIGN UP
        </div>
      </button>
      <div className="w-[83px] flex flex-col items-start justify-start pt-[27px] px-0 pb-0 box-border">
        <div
          className="self-stretch h-[37px] relative font-semibold inline-block shrink-0 whitespace-nowrap cursor-pointer"
          onClick={onLOGINTextClick}
        >
          LOG IN
        </div>
      </div>
    </div>
  </div>
</div>
<div className="w-[682px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border min-w-[682px] max-w-full mq1225:min-w-full mq1525:flex-1">
  <div className="self-stretch flex flex-col items-end justify-start gap-[1px] max-w-full">
    <div className="flex flex-row items-start justify-end py-0 px-[7px]">
      <div
        className="overflow-hidden flex flex-row items-center justify-center relative gap-[10px] cursor-pointer"
        onClick={onCancelContainerClick}
      >
        <div className="h-10 w-10 relative rounded-[50%] bg-gray box-border border-[0px] border-solid border-black-main-text" />
        <img
          className="h-6 w-6 absolute !m-[0] top-[8px] left-[8px] overflow-hidden shrink-0 z-[1]"
          loading="lazy"
          alt=""
          src="/fluentmdl2cancel.svg"
        />
      </div>
<<<<<<< Updated upstream
    </div>
    <div className="self-stretch h-[784px] relative max-w-full mq850:h-auto mq850:min-h-[784]">
      <form onSubmit={handleSubmit} className="m-0 absolute top-[58px] left-[0px] rounded-xl bg-black-card w-full flex flex-col items-end justify-start pt-[139px] pb-[72px] pr-[70px] pl-14 box-border gap-[30px] max-w-full mq850:gap-[22px] mq850:pl-7 mq850:pr-[35px] mq850:box-border">
        <img
          className="w-[682px] h-[726px] relative rounded-xl hidden max-w-full"
          alt=""
          src="/rectangle-29.svg"
        />
        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-1 pl-[3px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[25px] max-w-full mq850:flex-wrap">
=======
    </header>
    <section
      className={`w-[1702px] flex flex-row items-center justify-between max-w-full gap-[2px] text-left text-21xl text-gray-200 font-body-body1-regular mq1500:flex-wrap `}
    >
      <div className="w-[654px] flex flex-col items-center justify-start pt-0 px-0 pb-[97px] box-border min-w-[654px] min-h-[583px] max-w-full mq1225:min-w-full mq850:pb-[63px] mq850:box-border mq1500:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq450:gap-[37px] mq850:gap-[73px]">  
          <div className="self-stretch flex flex-col items-center justify-start gap-[46px] max-w-full mq850:gap-[23px]">
            <h1 className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-5xl mq850:text-13xl">
              CARE TO EXPLORE OUR SERVICES? GET TO MANAGE POSTS IN SINGLE CLICK
            </h1>
            <div className="w-[596px] relative text-xl font-medium inline-block max-w-full mq450:text-base">
              Gain access to powerful tools and features designed to streamline
              your social media workflow and boost your online presence.
            </div>
          </div>
          <div className="w-[292px] flex flex-row items-start justify-start">
            <button className="cursor-pointer [border:none] pt-[27px] px-[33px] pb-[26px] bg-button w-[153.8px] rounded-11xl overflow-hidden shrink-0 flex flex-row items-start justify-start box-border whitespace-nowrap z-[1] hover:bg-mediumslateblue-100">
              <div className="relative text-xl font-semibold font-body-body1-regular text-black-main-text text-left inline-block min-w-[81px]">
                SIGN UP
              </div>
            </button>
            <button className="cursor-pointer [border:none] pt-[27px] px-[30px] pb-[26px] bg-lightslategray flex-1 rounded-11xl overflow-hidden flex flex-row items-start justify-end shrink-0 whitespace-nowrap ml-[-63.8px] hover:bg-mediumslateblue-300 active:bg-button mq1225:hover:bg-mediumslateblue-300 mq1225:active:bg-button mq850:hover:bg-mediumslateblue-300 mq850:active:bg-button mq1500:hover:bg-mediumslateblue-300 mq1500:active:bg-button">
              <a
                className="[text-decoration:none] w-[81px] relative text-xl font-semibold font-body-body1-regular text-gray-200 text-left inline-block shrink-0 cursor-pointer hover:text-white active:text-white mq1225:hover:text-white mq1225:active:text-white mq850:hover:text-white mq850:active:text-white mq1500:hover:text-white mq1500:active:text-white"
                onClick={onLOGINTextClick}
              >
                LOG IN
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[664px] flex flex-col items-end justify-start min-w-[664px] max-w-full mq1225:min-w-full mq1500:flex-1">
        <div className="self-stretch h-[115.1px] flex flex-row items-start justify-center py-0 pr-5 pl-[21px] box-border">
          <div className="self-stretch w-[114.9px] flex flex-row items-start justify-center relative gap-[10px] shrink-0 z-[1]">
            <div className="self-stretch flex-1 relative rounded-[50%] bg-neutral-main-50" />
            <div className="h-[91px] w-[calc(100%_-_24.1px)] absolute !m-[0] top-[12.8px] right-[12.8px] left-[11.3px] rounded-[50%] bg-lightslategray-200 z-[1]" />
            <img
              className="h-[37px] w-[42px] absolute !m-[0] top-[39px] left-[36px] overflow-hidden shrink-0 z-[2]"
              loading="lazy"
              alt=""
              src="/clarityaddline.svg"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}
      className={`m-0 self-stretch rounded-xl bg-lightslategray-200 flex flex-col items-start justify-start pt-[132px] pb-[79px] pr-[45px] pl-[46px] box-border gap-[37px] shrink-0 max-w-full mt-[-75.1px] mq850:gap-[18px] mq850:pl-[23px] mq850:pr-[22px] mq850:pb-[51px] mq850:box-border `}
    > <ToastContainer
    style={{ fontSize: '1rem' }} // Adjust the font size as needed
/>
      <img
        className="w-[664px] h-[678px] relative rounded-xl hidden max-w-full"
        alt=""
        src="/logincontainer.svg"
      />
      <div className="self-stretch flex flex-col items-start justify-start gap-[21px] max-w-full">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-2.5 box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[30px] max-w-full mq850:flex-wrap">
>>>>>>> Stashed changes
            <input
              className="[outline:none] bg-gainsboro h-[50px] flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-4 px-[19px] pb-[15px] font-inter font-medium text-base text-lightslategray-100 min-w-[168px] z-[1] border-[1px] border-solid border-lightslategray-100"
              placeholder="FIRST NAME *"
              type="text"
              value={formData.firstName} 
              onChange={handleChange} 
              name="firstName"
              style={{ WebkitTextFillColor: "currentColor" 
            }} 
              
            />
            <input
              className="[outline:none] bg-gainsboro h-[50px] flex-[0.9733] rounded-8xs box-border flex flex-row items-start justify-start pt-[15px] px-[22px] pb-4 font-inter font-medium text-base text-lightslategray-100 min-w-[172px] z-[1] border-[1px] border-solid border-lightslategray-100 mq450:flex-1"
              placeholder="LAST NAME *"
              type="text"
              value={formData.lastName} 
              onChange={handleChange}
              name="lastName"
            />
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[39px] mq850:gap-[19px]">
          <input
            className="[outline:none] bg-gainsboro self-stretch h-[50px] rounded-8xs box-border flex flex-row items-start justify-start pt-[15px] px-[19px] pb-4 font-inter font-medium text-base text-lightslategray-100 min-w-[250px] z-[1] border-[1px] border-solid border-lightslategray-100"
            placeholder="ORGANIZATION NAME* "
            type="text"
            value={formData.organizationName} 
            onChange={handleChange}
            name="organizationName"

          />
          <input
            className="[outline:none] bg-gainsboro self-stretch h-[50px] rounded-8xs box-border flex flex-row items-start justify-start pt-[15px] px-[19px] pb-4 font-inter font-medium text-base text-lightslategray-100 min-w-[250px] z-[1] border-[1px] border-solid border-lightslategray-100"
            placeholder="WORK  EMAIL*"
            value={formData.email} 
            onChange={handleChange}  
            name="email"
            type="email"
          />
          <input
            className="[outline:none] bg-gainsboro self-stretch h-[50px] rounded-8xs box-border flex flex-row items-start justify-start pt-[17px] px-[19px] pb-3.5 font-inter font-medium text-base text-lightslategray-100 min-w-[250px] z-[1] border-[1px] border-solid border-lightslategray-100"
            placeholder="PHONE*"
            value={formData.phone} 
            onChange={handleChange}
            name="phone"
            type="tel"
          />
        </div>
        <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[5px] box-border max-w-full relative">
  <div className="flex-1 relative">
    <input
      className="[outline:none] bg-gainsboro h-[50px] w-full rounded-8xs box-border flex flex-row items-start justify-start pt-[15px] px-[19px] pb-4 font-inter font-medium text-base text-lightslategray-100 min-w-[250px] max-w-full z-[1] border-[1px] border-solid border-lightslategray-100"
      placeholder="PASSWORD*"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      onChange={handleChange}
      name="password"
    />
  </div>
  <div className="absolute top-[50%] right-[10px] transform -translate-y-1/2 cursor-pointer">
    {showPassword ? (
      <FiEyeOff
        className="text-lightslategray-100"
        onClick={togglePasswordVisibility}
      />
    ) : (
      <FiEye
        className="text-lightslategray-100"
        onClick={togglePasswordVisibility}
      />
    )}
  </div>
</div>






        <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch h-[50px] relative">
          <div
            className="absolute top-[0px] left-[0px] rounded-8xs bg-button w-full h-full cursor-pointer z-[1]"
          //   onClick={onRectangleClick}
          />
          <div className="absolute top-[14px] left-[257px] text-[18px] font-medium font-inter text-black-main-text text-left inline-block w-32 z-[2]">
            SUBMIT
          </div>
        </button>
      </form>
      <div className="absolute top-[0px] left-[269px] w-[114.9px] flex flex-row items-start justify-start z-[3]">
        <div className="h-[115.1px] flex-1 relative">
          <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-black-main-background w-full h-full" />
          <div className="absolute w-[calc(100%_-_24.1px)] top-[12.8px] right-[12.8px] left-[11.3px] h-[91px]">
            <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-black-card w-full h-full z-[1]" />
            <img
              className="absolute top-[26.2px] left-[24.7px] w-[42px] h-[37px] overflow-hidden z-[2]"
              loading="lazy"
              alt=""
              src="/clarityaddline.svg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>  
    
  );
};

export default SignupForm;
