import { useMemo } from "react";
import PropTypes from "prop-types";

const Facebook = ({
  className = "",
  logosfacebook,
  facebook,
  propBackgroundColor,
  spaceHolders,
}) => {
  const facebookStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  return (
    <div
      className={`flex-1 rounded-3xs bg-color box-border flex flex-col items-start justify-start py-[17px] px-7 gap-[80px] min-w-[199px] max-w-[265px] text-left text-lg text-text-colors font-title-medium border-[2px] border-solid border-outline mq450:gap-[40px] ${className}`}
      style={facebookStyle}
    >
      <div className="self-stretch flex flex-row items-center justify-start py-2.5 pr-[21px] pl-0 gap-[30px]">
        <img
          className="h-[60px] w-[64.5px] relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src={logosfacebook}
        />
        <div className="relative leading-[28px] font-medium inline-block min-w-[89px]">
          {facebook}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[10px] text-21xl text-secondary-secondary500">
        <div className="self-stretch relative leading-[28px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mq800:text-13xl mq800:leading-[22px] mq450:text-5xl mq450:leading-[17px]">
          {spaceHolders}
        </div>
        <div className="self-stretch relative text-base leading-[28px] font-medium">
          Total Posts
        </div>
      </div>
    </div>
  );
};

Facebook.propTypes = {
  className: PropTypes.string,
  logosfacebook: PropTypes.string,
  facebook: PropTypes.string,
  spaceHolders: PropTypes.string,

  /** Style props */
  propBackgroundColor: PropTypes.any,
};

export default Facebook;
