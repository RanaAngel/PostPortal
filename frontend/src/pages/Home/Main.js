import PropTypes from "prop-types";
const FooterElement= ({ className = "" }) => {
    return (
      <div
        className={`self-stretch flex flex-row items-start justify-start py-0 px-[73px] box-border max-w-full text-left text-41xl text-black-main-text font-inter mq1350:pl-9 mq1350:pr-9 mq1350:box-border ${className}`}
      >
        <div className="flex-1 flex flex-row flex-wrap items-start justify-start max-w-full [row-gap:20px]">
          <div className="flex-1 flex flex-col items-start justify-start pt-[150px] px-0 pb-0 box-border min-w-[593px] max-w-full mq900:pt-[150px] mq900:box-border mq900:min-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[41px] mq450:gap-[20px]">
              <h1 className="m-0 self-stretch relative text-inherit tracking-[0.02em] font-extrabold font-inherit whitespace-pre-wrap mq900:text-29xl mq450:text-17xl">
                MANAGE YOUR POSTS WITH POST PORTAL
              </h1>
              <div className="self-stretch h-[118px] relative text-xl font-medium text-black-sub-text inline-block shrink-0 mq450:text-base">
                Streamline your social media management efforts and unlock the
                full potential of your online presence with PostPortal. Our
                all-in-one solution empowers individuals and businesses to plan,
                schedule, analyze, and optimize their social media activities
                effortlessly.
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-start justify-start gap-[30.2px] min-w-[545px] max-w-full mq900:flex-wrap mq900:min-w-full mq450:gap-[15px]">
            <div className="h-[767.4px] flex-1 relative min-w-[532px] max-w-full mq900:min-w-full">
              <img
                className="absolute top-[310px] left-[639.7px] w-[178.6px] h-[131.8px] object-contain"
                loading="lazy"
                alt=""
                src="/00946387da8d7278971a45a96268961d 2.png"
              />
              <img
                className="absolute top-[130.8px] left-[534.6px] w-[211.2px] h-[184.8px] object-contain z-[1]"
                alt=""
                src="/00946387da8d7278971a45a96268961d 3.png"
              />
              <img
                className="absolute top-[269px] left-[376.2px] w-[219.2px] h-[200px] object-cover z-[2]"
                alt=""
                src="/00946387da8d7278971a45a96268961d 4.png"
              />
              <img
                className="absolute top-[0px] left-[60.2px] w-[420px] h-[380px] object-contain z-[3]"
                alt=""
                src="/00946387da8d7278971a45a96268961d 9.png"
              />
              <img
                className="absolute top-[400.8px] left-[0px] w-[457px] h-[349.6px] object-contain z-[3]"
                alt=""
                src="/00946387da8d7278971a45a96268961d 5.png"
              />
            </div>
            <div className="h-[300px] w-[64.5px] flex flex-col items-start justify-start pt-[244px] px-0 pb-0 box-border">
              <img
                className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                loading="lazy"
                alt=""
                src="/00946387da8d7278971a45a96268961d 6.png"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  FooterElement.propTypes = {
    className: PropTypes.string,
  };
  
  export default FooterElement;