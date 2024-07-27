import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("A password reset email has been sent to your inbox.");
      }
      const { message } = response.json();
      console.log(message);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="w-full relative bg-neutral-main-50 flex flex-col items-center justify-evenly pt-[57px] pr-[1rem] pl-[auto] box-border gap-[5px] tracking-[normal] leading-[normal] mq1225:pl-[23px] mq1225:pr-[55px] mq1225:box-border mq850:gap-[28px] mq850:pr-[27px] mq850:box-border">
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
              onClick={() => navigate('/')}
            />
          </div>
        </div>
      </header>
      <section className="w-[1700px] flex flex-row items-center justify-between max-w-full gap-[20px] text-left text-21xl text-gray-200 font-body-body1-regular mq1500:flex-wrap">
        <div className="w-[654px] flex flex-col items-start justify-center gap-[147px] min-w-[654px] max-w-full mq1225:min-w-full mq450:gap-[37px] mq850:gap-[73px] mq1500:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full mq850:gap-[23px]">
            <h1 className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-5xl mq850:text-13xl">
              Forgot Password?
            </h1>
            <div className="w-[596px] relative text-xl font-medium inline-block max-w-full mq450:text-base">
              <p className="m-0">
                Simply enter your email, and get it reset
              </p>
            </div>
          </div>
          <div className="w-[292px] flex flex-row items-start justify-start">
            <button className="cursor-pointer [border:none] pt-[27px] px-[33px] pb-[26px] bg-lightslategray flex-1 rounded-11xl overflow-hidden flex flex-row items-start justify-start whitespace-nowrap hover:bg-mediumslateblue-300 active:bg-button mq1225:hover:bg-mediumslateblue-300 mq1225:active:bg-button mq850:hover:bg-mediumslateblue-300 mq850:active:bg-button mq1500:bg-lightslategray mq1500:hover:bg-mediumslateblue-300 mq1500:active:bg-button">
              <div
                className="relative text-xl font-semibold font-body-body1-regular text-gray-200 text-left inline-block min-w-[81px] cursor-pointer hover:text-white active:text-white mq1225:hover:text-white mq1225:active:text-white mq850:hover:text-white mq850:active:text-white mq1500:hover:text-white mq1500:active:text-white"
                onClick={() => navigate('/signup')}
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
                <div className="h-[91px] w-[calc(100%_-_24.1px)] absolute !m-[0] top-[12.8px] right-[12.8px] left-[11.3px] rounded-[50%] bg-lightslategray-200  z-[1]" />
                <img
                  className="h-[37px] w-[42px] absolute !m-[0] top-[39px] left-[36px] overflow-hidden shrink-0 z-[2]"
                  loading="lazy"
                  alt=""
                  src="/clarityaddline.svg"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit} className={`m-0 self-stretch rounded-xl bg-lightslategray-200 flex flex-col items-start justify-start pt-[132px] pb-[79px] pr-[45px] pl-[46px] box-border gap-[37px] shrink-0 max-w-full mt-[-75.1px] mq850:gap-[18px] mq850:pl-[23px] mq850:pr-[22px] mq850:pb-[51px] mq850:box-border `}>
            <h2 className="text-xl font-bold mb-4 items-start justify-start">Forget Password?</h2> {/* Add this line */}
              <input
                className="w-full [outline:none] bg-gainsboro h-[50px] flex-1 bg-[transparent] rounded-8xs box-border flex flex-row items-start justify-start pt-[15px] px-4 pb-4 font-inter font-medium text-base text-black-card min-w-[172px] z-[1] border-[1px] border-solid border-black-card"
                placeholder="WORK EMAIL*" type="email" name="email" value={formData.email} onChange={handleChange}
              />
              <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-2.5 box-border max-w-full">
              <button type="submit" className="cursor-pointer [border:none] py-[11px] px-5 bg-button flex-1 rounded-8xs overflow-hidden flex flex-row items-start justify-center box-border max-w-full z-[1] hover:bg-mediumslateblue">
                <div className="relative text-xl font-medium font-inter text-black-main-text text-left inline-block min-w-[78px] mq450:text-base">
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

export default ForgetPassword;
