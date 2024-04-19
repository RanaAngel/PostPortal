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

const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(prevState => !prevState);
};

const navigate = useNavigate();

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

  const onLOGINTextClick = useCallback(() => {
    // Please sync "log in page" to the project
    navigate('/login');
  }, [navigate]);

  // const onCancelContainerClick = useCallback(() => {
  //   // Please sync "Landing Page" to the project
  // }, []);

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
<div className="flex-1 flex flex-col items-start justify-start gap-[294px] min-w-[515px] max-w-full mq450:gap-[73px] mq1225:min-w-full mq850:gap-[147px]">
  <div className="self-stretch flex flex-col items-start justify-start gap-[79px] max-w-full mq450:gap-[20px] mq850:gap-[39px]">
    <div className="h-[87px] flex flex-row items-start justify-start py-2.5 pr-0 pl-2.5 box-border">
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
        <div className="w-[743px] relative text-xl font-medium text-lightslategray-100 inline-block max-w-full mq450:text-base">
          Gain access to powerful tools and features designed to
          streamline your social media workflow and boost your online
          presence.
        </div>
      </div>
    </div>
  </div>
  <div className="w-[358px] flex flex-row items-start justify-start py-0 px-[18px] box-border sticky top-[0] z-[99] max-w-full text-xl">
    <div className="flex-1 rounded-11xl bg-lightslategray-200 overflow-hidden flex flex-row items-start justify-start py-0 pr-[33px] pl-0 box-border gap-[37px] max-w-full mq450:gap-[18px]">
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
<div className="w-[682px] flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border min-w-[682px] max-w-full mq1225:min-w-full mq1525:flex-1">
  <div className="self-stretch flex flex-col items-end justify-start gap-[24px] max-w-full">
    <div className="flex flex-row items-start justify-end py-0 px-[7px]">
      <div
        className="overflow-hidden flex flex-row items-center justify-center relative gap-[10px] cursor-pointer"
      //   onClick={onCancelContainerClick}
      >
        <div className="h-10 w-10 relative rounded-[50%] bg-gray box-border border-[0px] border-solid border-black-main-text" />
        <img
          className="h-6 w-6 absolute !m-[0] top-[8px] left-[8px] overflow-hidden shrink-0 z-[1]"
          loading="lazy"
          alt=""
          src="/fluentmdl2cancel.svg"
        />
      </div>
    </div>
    <div className="self-stretch h-[784px] relative max-w-full mq850:h-auto mq850:min-h-[784]">
      <form onSubmit={handleSubmit} className="m-0 absolute top-[58px] left-[0px] rounded-xl bg-black-card w-full flex flex-col items-end justify-start pt-[139px] pb-[72px] pr-[70px] pl-14 box-border gap-[44px] max-w-full mq850:gap-[22px] mq850:pl-7 mq850:pr-[35px] mq850:box-border">
        <img
          className="w-[682px] h-[726px] relative rounded-xl hidden max-w-full"
          alt=""
          src="/rectangle-29.svg"
        />
        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-1 pl-[3px] box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-start gap-[25px] max-w-full mq850:flex-wrap">
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
