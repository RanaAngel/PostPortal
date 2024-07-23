import { useMemo } from "react";
import PropTypes from "prop-types";

const Facebook = ({
  className = "",
  logosfacebook,
  facebook,
  prop,
  propBackgroundColor,
}) => {
  const facebookStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  return (
    <div
      className={`flex-[0.7854] rounded-3xs bg-just-white box-border flex flex-col items-start justify-start py-[17px] px-7 gap-[80px] min-w-[260px] max-w-[265px] text-left text-lg text-text-colors font-title-medium border-[2px] border-solid border-outline mq450:gap-[40px] mq450:flex-1 ${className}`}
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
        <div className="self-stretch h-[39px] relative leading-[28px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] flex items-center shrink-0 mq450:text-5xl mq450:leading-[17px] mq825:text-13xl mq825:leading-[22px]">
          {prop}
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
  prop: PropTypes.string,

  /** Style props */
  propBackgroundColor: PropTypes.any,
};
export default Facebook;