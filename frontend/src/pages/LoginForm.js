// frontend/client/src/components/LoginForm.js
import { useCallback } from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const { token, redirectUrl } = await response.json();
      localStorage.setItem('token', token);

      // Show success message
      toast.success('Login successful');

      // Redirect after a short delay to allow the toast to be visible
      setTimeout(() => {
        navigate(redirectUrl);
      }, 800);

    } catch (error) {
      toast.error(error.message);
    }
  };

  const onGroupClick = useCallback(() => {
    // Please sync "Landing Page" to the project
    navigate('/')
  }, [navigate]); 

  const onSIGNUPTextClick = useCallback(() => {   //Navigated to Signup page
    // Please sync "log in page" to the project
    navigate('/signup');
  }, [navigate]);

  const onForgetPasswordClick = useCallback(() => {
    navigate('/forget-password'); // Ensure '/forget-password' is the correct path to your ForgetPassword page
  }, [navigate]);


return (
  <div className="w-full relative bg-neutral-main-50 flex flex-col items-end justify-start pt-[52px] pb-[263px] pr-[110px] pl-[46px] box-border gap-[57px] tracking-[normal] leading-[normal] mq1225:pl-[23px] mq1225:pr-[55px] mq1225:box-border mq850:gap-[28px] mq850:pr-[27px] mq850:box-border">
    
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
    <section className="w-[1702px] flex flex-row items-end justify-between max-w-full gap-[20px] text-left text-21xl text-gray-200 font-body-body1-regular mq1500:flex-wrap">
    
      <div className="w-[654px] flex flex-col items-start justify-start gap-[147px] min-w-[654px] max-w-full mq1225:min-w-full mq450:gap-[37px] mq850:gap-[73px] mq1500:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-[46px] max-w-full mq850:gap-[23px]">
          <h1 className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-5xl mq850:text-13xl">
            CARE TO EXPLORE OUR SERVICES? GET TO MANAGE POSTS IN SINGLE CLICK
          </h1>
          <div className="w-[596px] relative text-xl font-medium inline-block max-w-full mq450:text-base">
            <p className="m-0">{`Already have an account? `}</p>
            <p className="m-0">
              Simply enter your credentials below to access your dashboard and
              get started.
            </p>
          </div>
        </div>
        <div className="w-[292px] flex flex-row items-start justify-start">
          <button className="cursor-pointer [border:none] pt-[27px] px-[33px] pb-[26px] bg-lightslategray flex-1 rounded-11xl overflow-hidden flex flex-row items-start justify-start whitespace-nowrap hover:bg-mediumslateblue-300 active:bg-button mq1225:hover:bg-mediumslateblue-300 mq1225:active:bg-button mq850:hover:bg-mediumslateblue-300 mq850:active:bg-button mq1500:bg-lightslategray mq1500:hover:bg-mediumslateblue-300 mq1500:active:bg-button">
            <div
              className="relative text-xl font-semibold font-body-body1-regular text-gray-200 text-left inline-block min-w-[81px] cursor-pointer hover:text-white active:text-white mq1225:hover:text-white mq1225:active:text-white mq850:hover:text-white mq850:active:text-white mq1500:hover:text-white mq1500:active:text-white"
              onClick={onSIGNUPTextClick}
            >
              SIGN UP
            </div>
          </button>
          <button className="cursor-pointer [border:none] pt-[27px] px-[27px] pb-[26px] bg-button w-[154px] rounded-11xl overflow-hidden shrink-0 flex flex-row items-start justify-end box-border whitespace-nowrap z-[1] ml-[-93px] hover:bg-mediumslateblue-100">
            <div className="w-[81px] relative text-xl font-semibold font-body-body1-regular text-black-main-text text-left inline-block shrink-0">
              LOG IN
            </div>
          </button>
        </div>
      </div>
      <div className="h-[621px] w-[664px] flex flex-col items-start justify-start min-w-[664px] max-w-full mq1225:min-w-full mq1500:flex-1">
        <div className="self-stretch flex flex-col items-end justify-start max-w-full">
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
          <form   className="m-0 self-stretch rounded-xl bg-lightslategray-200 flex flex-col items-end justify-start pt-[123px] px-[45px] pb-[79px] box-border gap-[23px] shrink-0 max-w-full mt-[-76.1px] mq450:pb-[51px] mq450:box-border mq850:pl-[22px] mq850:pr-[22px] mq850:box-border">
          <ToastContainer
    style={{ fontSize: '1rem' }} // Adjust the size as needed, e.g., 14px
/>

            <img
              className="w-[664px] h-[461px] relative rounded-xl hidden max-w-full"
              alt=""
              src="/logincontainer1.svg"
            />
           
            <div className="self-stretch flex flex-col items-start justify-start gap-[13px] max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[19px] max-w-full">
                <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
                
                  <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
                  <input
                      className="w-full [outline:none] bg-gainsboro h-[50px] bg-[transparent] flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-[19px] px-4 pb-3 font-body-body1-regular font-medium text-base text-gray-200 min-w-[250px] max-w-full border-[1px] border-solid border-gray-200"
                      placeholder="WORK EMAIL*" type="email" name="email" value={formData.email} onChange={handleChange}
                      
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
                  <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
                    <input
                      className="w-full [outline:none] bg-gainsboro bg-[transparent] flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 font-body-body1-regular font-medium text-base text-gray-200 min-w-[250px] max-w-full border-[1px] border-solid border-gray-200"
                      placeholder="PASSWORD *" type="password" name="password" value={formData.password} onChange={handleChange}
                      
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-end py-0 px-2.5">
              <button type="button" className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-[15px] font-medium font-body-body1-regular text-gray-200 text-left inline-block z-[1]" onClick={onForgetPasswordClick}>
          FORGET PASSWORD?
        </button>

              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end py-0 pr-2.5 pl-3 box-border max-w-full">
              <button onClick={handleSubmit} className="cursor-pointer [border:none] py-[11px] px-5 bg-button flex-1 rounded-8xs overflow-hidden flex flex-row items-start justify-center box-border max-w-full z-[1] hover:bg-mediumslateblue-100">
                <div className="relative text-xl font-medium font-body-body1-regular text-black-main-text text-left inline-block min-w-[78px] mq450:text-base">
                  SUBMIT
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
);
};

export default LoginForm;
