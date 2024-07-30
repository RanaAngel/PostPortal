import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NavTopBar = ({ className = "" }) => {
  const navigate = useNavigate();

  const onButtonTextContainerClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='cARETOEXPLORE']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onButtonTextContainerClick1 = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='cHOOSEAPLAN']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onButtonTextContainerClick2 = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onButtonTextContainerClick3 = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <header
      className={`self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0),_0px_4px_4px_rgba(0,_0,_0.1,_0.2)] bg-gray-400 flex flex-row items-center justify-start py-2 pr-[31px] pl-6 box-border sticky top-[0] z-[99] max-w-full ${className}`}
    >
      <div className="h-20 w-[127px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border">
        <img
          className="h-[90.2px] flex-1 relative max-w-full overflow-hidden object-cover"
          loading="lazy"
          alt=""
          src="/logo@2x.png"
        />
      </div>
      <div className="flex-1 flex flex-row items-start gap-[3rem] justify-center pt-[15px] px-0 pb-[19px] box-border max-w-full">
        <button className="cursor-pointer [border:none] py-[11px] px-[39px] bg-button rounded-mid flex flex-row items-center justify-center hover:bg-mediumslateblue-300 mq900:hover:bg-mediumslateblue-300 mq1300:hover:bg-mediumslateblue-300 mq1650:hover:bg-mediumslateblue-300">
          <div className="flex flex-row items-start justify-start">
            <a className="[text-decoration:none] relative text-base leading-[24px] font-body-body1-regular text-neutral-main-50 text-left inline-block min-w-[48px]">
              HOME
            </a>
          </div>
        </button>
        <button onClick={onButtonTextContainerClick} className="group cursor-pointer [border:none] py-[11px] px-6 bg-[transparent] rounded-mid flex flex-row items-start justify-start hover:bg-mediumslateblue-300 active:bg-button mq900:hover:bg-mediumslateblue-300 mq900:active:bg-button mq1300:hover:bg-mediumslateblue-300 mq1300:active:bg-button mq1650:hover:bg-mediumslateblue-300 mq1650:active:bg-button">
          <a
            className="flex flex-row items-start justify-start cursor-pointer"
            
          >
            <div className="[text-decoration:none] group-hover:text-white relative text-base leading-[24px] font-body-body1-regular text-black-main-background text-left inline-block min-w-[81px] hover:text-white active:text-white mq900:hover:text-white mq900:active:text-white mq1300:hover:text-white mq1300:active:text-white mq1650:hover:text-white mq1650:active:text-white">
              FEATURES
            </div>
          </a>
        </button>
        <button onClick={onButtonTextContainerClick1} className="group cursor-pointer [border:none] py-[11px] px-6 bg-[transparent] rounded-mid flex flex-row items-start justify-start hover:bg-mediumslateblue-300 active:bg-button mq900:hover:bg-mediumslateblue-300 mq900:active:bg-button mq1300:hover:bg-mediumslateblue-300 mq1300:active:bg-button mq1650:hover:bg-mediumslateblue-300 mq1650:active:bg-button">
          <div
            className="flex flex-row items-start justify-start cursor-pointer"
            
          >
            <a className="[text-decoration:none] group-hover:text-white relative text-base leading-[24px] font-body-body1-regular text-black-main-background text-left inline-block min-w-[65px] hover:text-white active:text-white mq900:hover:text-white mq900:active:text-white mq1300:hover:text-white mq1300:active:text-white mq1650:hover:text-white mq1650:active:text-white">
              PRICING
            </a>
          </div>
        </button>
      </div>
      <div className="flex flex-row items-center justify-start gap-[16px]">
        <button onClick={onButtonTextContainerClick2} className="group cursor-pointer [border:none] py-[11px] px-[39px] bg-[transparent] rounded-mid flex flex-row items-center justify-center hover:bg-mediumslateblue-300 active:bg-button mq900:hover:bg-mediumslateblue-300 mq900:active:bg-button mq1300:hover:bg-mediumslateblue-300 mq1300:active:bg-button mq1650:hover:bg-mediumslateblue-300 mq1650:active:bg-button">
          <div
            className="flex flex-row items-start justify-start cursor-pointer"
            
          >
            <a className="[text-decoration:none] group-hover:text-white  relative text-base leading-[24px] font-body-body1-regular text-black-main-background text-left inline-block min-w-[49px] hover:text-white active:text-white mq900:hover:text-white mq900:active:text-white mq1300:hover:text-white mq1300:active:text-white mq1650:hover:text-white mq1650:active:text-white">
              LOGIN
            </a>
          </div>
        </button>
        <button  onClick={onButtonTextContainerClick3} className="cursor-pointer [border:none] py-[11px] px-6 bg-button rounded-mid flex flex-row items-start justify-start hover:bg-mediumslateblue-300 mq900:hover:bg-mediumslateblue-300 mq1300:hover:bg-mediumslateblue-300 mq1650:hover:bg-mediumslateblue-300">
          <div
            className="flex flex-row items-start justify-start cursor-pointer"
           
          >
            <a className="[text-decoration:none] relative text-base leading-[24px] font-body-body1-regular text-neutral-main-50 text-left inline-block min-w-[108px] whitespace-nowrap hover:text-white active:text-white mq900:hover:text-white mq900:active:text-white mq1300:hover:text-white mq1300:active:text-white mq1650:hover:text-white mq1650:active:text-white">
              GET STARTED
            </a>
          </div>
        </button>
      </div>
    </header>
  );
};

NavTopBar.propTypes = {
  className: PropTypes.string,
};

export default NavTopBar;