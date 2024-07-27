import { useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate} from "react-router-dom";




const Hero = ({ className = "" }) => {
  
  const navigate = useNavigate();
  const onButtonClick = useCallback(() => {
    navigate("/channels");
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-start gap-[69px] shrink-0 max-w-full text-left text-6xl text-darkslategray font-inter mq450:gap-[17px] mq725:gap-[34px] ${className}`}
    >
      <div className="w-[349px] flex flex-row items-center justify-start max-w-full">
        <img
          className="h-[503.2px] flex-1 relative max-w-full overflow-hidden object-cover"
          loading="lazy"
          alt=""
          src="/image2@2x.png"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <h3 className="m-0 relative text-inherit font-normal font-inherit mq450:text-xl">
          Ready to grow your audience on social media?
        </h3>
      </div>
      <div className="flex flex-col items-center justify-center max-w-full text-mid text-dimgray-100">
        <div className="relative">First, let's connect a social account.</div>
        <div className="w-[233px] bg-gray-1300 flex flex-col items-center justify-center py-3 px-0 box-border gap-[4px] text-center text-2xs-5 text-slategray-200">
          <button
            className="cursor-pointer [border:none] py-[18px] pr-3.5 pl-5 bg-button self-stretch rounded-[3.75px] flex flex-row items-center justify-between whitespace-nowrap gap-[0px] [row-gap:20px] hover:bg-mediumslateblue-100"
            onClick={onButtonClick}
          >
            <div className="h-[25px] relative text-lg font-inter text-color text-left inline-block">
              Connect an Account
            </div>
            <img
              className="h-4 w-[19px] relative object-cover"
              alt=""
              src="/image-1@2x.png"
            />
          </button>
          <div className="relative">(this takes less than a minute)</div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  className: PropTypes.string,
};
export default Hero;