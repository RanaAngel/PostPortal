// frontend/client/src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate(); // Initialize useHistory
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
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
        throw new Error('Login failed');
      }
      const { token } = await response.json();
    localStorage.setItem('token', token);
      alert('Login successful');
      navigate('/dashboard'); // Redirect or do something else after successful login
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please try again.');
    }
  };

return (
  <div className="w-full relative bg-black-main-background overflow-hidden flex flex-col items-end justify-start pt-[98px] px-[127px] pb-[265px] box-border gap-[114px] tracking-[normal] leading-[normal] mq1325:gap-[57px] mq1325:pl-[63px] mq1325:pr-[63px] mq1325:box-border mq900:gap-[28px] mq900:pl-[31px] mq900:pr-[31px] mq900:box-border">
    <header className="self-stretch flex flex-row items-start justify-end py-0 pr-1 pl-3 box-border max-w-full">
      <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px]">
        <img
          className="h-20 w-20 relative object-cover"
          loading="lazy"
          alt=""
          src="/95ba66434f85ea111bc97dcb33d85d72-1@2x.png"
        />
        <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
          <img
            className="w-10 h-10 relative cursor-pointer"
            loading="lazy"
            src="/fluentmdl2cancel.svg"
          />
        </div>
      </div>
    </header>
    <section className="w-[1639px] flex flex-row items-end justify-between max-w-full gap-[20px] text-left text-[40px] text-black-main-text font-inter mq1725:flex-wrap">
      <div className="w-[775px] flex flex-col items-start justify-start gap-[123.5px] min-w-[775px] max-w-full mq1325:min-w-full mq450:gap-[31px] mq900:gap-[62px] mq1725:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-[42px] max-w-full mq450:gap-[21px]">
          <h1 className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-5xl mq900:text-[32px]">
            CARE TO EXPLORE OUR SERVICES? GET TO MANAGE POSTS IN SINGLE CLICK
          </h1>
          <div className="w-[743px] relative text-5xl font-medium text-black-sub-text inline-block max-w-full mq450:text-[19px]">
            <p className="m-0">{`Already have an account? `}</p>
            <p className="m-0">
              Simply enter your credentials below to access your dashboard and
              get started.
            </p>
          </div>
        </div>
        <div className="w-[330px] flex flex-row items-start justify-start py-0 px-1 box-border max-w-full text-xl">
          <div className="flex-1 rounded-11xl bg-lightslategray overflow-hidden flex flex-row items-start justify-start py-0 pr-1 pl-[38px] box-border gap-[11px] max-w-full z-[1] mq450:flex-wrap">
            <div className="w-[100px] flex flex-col items-start justify-start pt-[25px] px-0 pb-0 box-border">
              <div
                className="self-stretch h-[37px] relative font-semibold inline-block shrink-0 whitespace-nowrap cursor-pointer mq450:text-base"
                // onClick={onSIGNUPTextClick}
              >
                SIGN UP
              </div>
            </div>
            <button className="cursor-pointer [border:none] pt-[27px] px-[33px] pb-[13px] bg-button flex-1 rounded-11xl overflow-hidden flex flex-row items-start justify-end box-border min-w-[83px] whitespace-nowrap hover:bg-mediumslateblue">
              <div className="h-[37px] w-[83px] relative text-xl font-semibold font-inter text-black-main-text text-left inline-block shrink-0">
                LOG IN
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[664px] flex flex-col items-start justify-end pt-0 px-0 pb-1.5 box-border min-w-[664px] max-w-full mq1325:min-w-full mq1725:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
          <div className="self-stretch h-[115.1px] flex flex-row items-start justify-center py-0 pr-[23px] pl-5 box-border">
          <div className="self-stretch w-[114.9px] flex flex-row items-start justify-start relative gap-[10px] shrink-0 [debug_commit:1de1738] z-[1]">
      <div className="self-stretch flex-1 relative rounded-[50%] bg-black-main-background" />
      <div className="h-[91px] w-[calc(100%_-_24.1px)] absolute !m-[0] top-[12.8px] right-[12.8px] left-[11.3px] rounded-[50%] bg-gray z-[1]" />
      <img
        className="h-[37px] w-[42px] absolute !m-[0] top-[39px] left-[36px] overflow-hidden shrink-0 z-[2]"
        loading="lazy"
        alt=""
        src="/clarityaddline.svg"
      />
    </div>
          </div>
          <form onSubmit={handleSubmit} className="m-0 self-stretch rounded-xl bg-gray flex flex-col items-start justify-start pt-[136px] px-[54px] pb-[66px] box-border gap-[57px] shrink-0 [debug_commit:1de1738] max-w-full mt-[-80.1px] mq900:gap-[28px] mq900:pl-[27px] mq900:pr-[27px] mq900:pb-[43px] mq900:box-border">
            <img
              className="w-[664px] h-[482px] relative rounded-xl hidden max-w-full"
              alt=""
              src="/rectangle-29.svg"
            />
            <div className="self-stretch flex flex-col items-start justify-start gap-[31px] max-w-full mq900:gap-[15px]">
              <input
                className="[outline:none] bg-gainsboro self-stretch h-[50px] rounded-8xs box-border flex flex-row items-start justify-start pt-[19px] px-4 pb-3 font-inter font-medium text-base text-black-sub-text min-w-[250px] z-[1] border-[1px] border-solid border-black-sub-text"
                placeholder="WORK  EMAIL *" type="email" name="email" value={formData.email} onChange={handleChange}
                
              />
              <input
                className="[outline:none] bg-gainsboro self-stretch rounded-8xs box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 font-inter font-medium text-base text-black-sub-text min-w-[250px] max-w-full z-[1] border-[1px] border-solid border-black-sub-text hover:bg-silver hover:box-border hover:border-[1px] hover:border-solid hover:border-slategray"
                placeholder="PASSWORD *" type="password" name="password" value={formData.password} onChange={handleChange}
                
              />
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch h-[50px] relative z-[1]" type="submit">      <div
        className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-8xs bg-button cursor-pointer"
        
      />
      <div className="absolute top-[30%] left-[42.86%] text-xl font-medium font-inter text-black-main-text text-left inline-block min-w-[78px] z-[1] mq450:text-base">
        SUBMIT
      </div>
    </button>
              <div className="self-stretch flex flex-row items-start justify-end">
                <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-[15px] font-medium font-inter text-black-sub-text text-left inline-block z-[1]">
                  FORGOT PASSWORD ?
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
);
};


export default LoginForm;
