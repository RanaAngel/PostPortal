// frontend/client/src/components/SignupForm.js
import { useCallback } from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for null values in formData
    for (const key in formData) {
        if (!formData[key]) {
            toast.error(`${key.toUpperCase()} is required.`);
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

        toast.success('Signup successful!');
        // Redirect after a short delay to allow toast to be visible
        setTimeout(() => {
            navigate('/login');
        }, 1000); // Adjust the delay time as needed

    } catch (error) {
        console.error('Signup error:', error.message);
        toast.error('Signup failed. Please try again.');
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

  const onGroupClick = useCallback(() => {
    // Please sync "Landing Page" to the project
    navigate('/')
  }, [navigate]);


return (
  <div className="w-full relative bg-neutral-main-50 flex flex-col items-end justify-start pt-[52px] pb-[166px] pr-[110px] pl-[46px] box-border gap-[57px] tracking-[normal] leading-[normal] mq1225:pl-[23px] mq1225:pr-[55px] mq1225:box-border mq850:gap-[28px] mq850:pr-[27px] mq850:box-border">
    <header className="self-stretch flex flex-row items-start justify-end py-0 pr-[15px] pl-0 box-border max-w-full">
      <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px]">
        <img
          className="h-[87px] w-[155px] relative object-cover"
          loading="lazy"
          alt=""
          src="/95ba66434f85ea111bc97dcb33d85d72-1@2x.png"
        />
        <div className="flex flex-col items-start justify-start pt-[18px] px-0 pb-0">
          <img
            className="w-[55px] h-[51px] relative cursor-pointer"
            loading="lazy"
            alt=""
            src="/group-183.svg"
            onClick={onGroupClick}
          />
        </div>
      </div>
    </header>
    <section
      className={`w-[1702px] flex flex-row items-end justify-between max-w-full gap-[20px] text-left text-21xl text-gray-200 font-body-body1-regular mq1500:flex-wrap `}
    >
      <div className="w-[654px] flex flex-col items-start justify-start pt-0 px-0 pb-[97px] box-border min-w-[654px] min-h-[583px] max-w-full mq1225:min-w-full mq850:pb-[63px] mq850:box-border mq1500:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-[147px] max-w-full mq450:gap-[37px] mq850:gap-[73px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[46px] max-w-full mq850:gap-[23px]">
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
            <input
              className="w-full [outline:none] bg-gainsboro h-[50px] flex-1 bg-[transparent] rounded-8xs box-border flex flex-row items-start justify-start pt-[15px] px-4 pb-4 font-inter font-medium text-base text-black-card min-w-[172px] z-[1] border-[1px] border-solid border-black-card"
              placeholder="FIRST NAME *"
              type="text"
              value={formData.firstName} 
              onChange={handleChange} 
              name="firstName"
            />
            <input
              className="w-full [outline:none] bg-gainsboro flex-1 bg-[transparent] rounded-8xs box-border flex flex-row items-start justify-start pt-[13px] px-3.5 pb-3.5 font-inter font-medium text-base text-black-card min-w-[167px] whitespace-nowrap z-[1] border-[1px] border-solid border-black-card"
              placeholder="LAST NAME *"
              type="text"
              value={formData.lastName} 
              onChange={handleChange}
              name="lastName"
            />
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[11px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-start p-2.5 box-border max-w-full z-[1]">
            <div className="flex-1 rounded-8xs bg-gainsboro box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 max-w-full border-[1px] border-solid border-black-card">
              <div className="h-[50px] flex-1 relative rounded-8xs bg-gainsboro box-border hidden max-w-full border-[1px] border-solid border-black-card" />
              <input
                className="w-full [border:none] [outline:none] font-medium font-inter text-base bg-[transparent] h-[19px] flex-1 relative text-black-card text-left inline-block min-w-[111px] p-0 z-[2]"
                placeholder="ORGANIZATION NAME* "
            type="text"
            value={formData.organizationName} 
            onChange={handleChange}
            name="organizationName"
              />
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
            <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
              <div className="flex-1 rounded-8xs bg-gainsboro box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 max-w-full border-[1px] border-solid border-black-card">
                <div className="h-[50px] flex-1 relative rounded-8xs bg-gainsboro box-border hidden max-w-full border-[1px] border-solid border-black-card" />
                <input
                  className="w-full [border:none] [outline:none] font-medium font-inter text-base bg-[transparent] h-[19px] flex-1 relative text-black-card text-left inline-block min-w-[65px] p-0 z-[1]"
                  placeholder="WORK  EMAIL*"
            value={formData.email} 
            onChange={handleChange}  
            name="email"
            type="email"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
            <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
              <div className="flex-1 rounded-8xs bg-gainsboro box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 max-w-full border-[1px] border-solid border-black-card">
                <div className="h-[50px] flex-1 relative rounded-8xs bg-gainsboro box-border hidden max-w-full border-[1px] border-solid border-black-card" />
                <input
                  className="w-full [border:none] [outline:none] font-medium font-inter text-base bg-[transparent] h-[19px] flex-1 relative text-black-card text-left inline-block min-w-[41px] p-0 z-[1]"
                  placeholder="PHONE*"
                  value={formData.phone} 
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
            <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
              <div className="flex-1 rounded-8xs bg-gainsboro box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 max-w-full border-[1px] border-solid border-black-card">
                <div className="h-[50px] flex-1 relative rounded-8xs bg-gainsboro box-border hidden max-w-full border-[1px] border-solid border-black-card" />
                <input
                  className="w-full [border:none] [outline:none] font-medium font-inter text-base bg-[transparent] h-[19px] flex-1 relative text-black-card text-left inline-block min-w-[62px] p-0 z-[1]"
                  placeholder="PASSWORD*"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      onChange={handleChange}
      name="password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-2.5 box-border max-w-full">
        <button className="cursor-pointer [border:none] py-[11px] px-5 bg-button flex-1 rounded-8xs overflow-hidden flex flex-row items-start justify-center box-border max-w-full z-[1] hover:bg-mediumslateblue">
          <div className="relative text-xl font-medium font-inter text-black-main-text text-left inline-block min-w-[78px] mq450:text-base">
            SUBMIT
          </div>
        </button>
      </div>
    </form>
      </div>
    </section>
  </div>
);
};

export default SignupForm;