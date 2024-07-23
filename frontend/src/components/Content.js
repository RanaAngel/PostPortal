import PropTypes from "prop-types";

const Content = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-start gap-[69px] max-w-full text-left text-6xl text-darkslategray font-inter mq450:gap-[17px] mq725:gap-[34px] ${className}`}
    >
      <div className="w-[349px] flex flex-row items-center justify-start max-w-full">
        <img
          className="h-[503.2px] flex-1 relative max-w-full overflow-hidden object-cover"
          loading="lazy"
          alt=""
          src="/image@2x.png"
        />
      </div>
      <div className="flex flex-row items-center justify-center">
        <h3 className="m-0 relative text-inherit font-normal font-inherit mq450:text-xl">
          Ready to grow your audience on social media?
        </h3>
      </div>
      <div className="flex flex-col items-center justify-center text-mid text-dimgray-200">
        <div className="relative">First, let's connect a social account.</div>
        <div className="w-[233px] bg-gray-300 flex flex-col items-center justify-center py-3 px-0 box-border gap-[4px] text-lg text-white">
          <div className="self-stretch rounded-[3.75px] bg-button flex flex-row items-center justify-between py-[18px] pr-3.5 pl-5 whitespace-nowrap gap-[0px] [row-gap:20px] text-white">
            <div className="h-[25px] relative flex items-center">
              Connect an Account
            </div>
            <img
              className="h-4 w-[19px] relative object-contain"
              alt=""
              src="/image-1@2x.png"
            />
          </div>
          <div className="relative text-2xs-5 text-slategray-100 text-center">
            (this takes less than a minute)
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
