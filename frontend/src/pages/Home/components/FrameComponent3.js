import PropTypes from "prop-types";

const FrameComponent3 = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-between  gap-[43px] max-w-full text-left text-45xl text-black-main-background font-body-body1-regular mq900:gap-[21px] mq1650:flex-wrap ${className}`}
    >
      <div className="w-[50%] flex flex-col items-start justify-start pt-[69px] px-0 pb-0 box-border max-w-full mq900:pt-[45px] mq900:box-border mq900:w-full mq1650:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-[30px] max-w-full">
          <div className="self-stretch w-full flex flex-row items-start justify-start py-0 px-px box-border max-w-full">
            <h1 className="self-stretch m-0 flex-1 relative text-inherit tracking-[0.02em] font-extrabold font-inherit whitespace-pre-wrap inline-block max-w-full mq450:text-19xl mq900:text-32xl">
              MANAGE YOUR POSTS WITH POST PORTAL
            </h1>
          </div>
          <h3 className="m-0 self-stretch relative text-5xl font-medium font-inherit text-gray-100 text-justify mq450:text-lgi">
            Streamline your social media management efforts and unlock the full potential of your online presence with PostPortal. Our all-in-one solution empowers individuals and businesses to plan, schedule, analyze, and optimize their social media activities effortlessly.
          </h3>
        </div>
      </div>
      <div className="w-[60%]  items-end justify-start max-w-full mq900:w-full mq1300:items-center mq1300:justify-start">
        <div className="w-full h-[787px] flex flex-col items-end justify-start pt-[141px] px-[57px] pb-[125px] box-border relative max-w-full mq450:pt-[60px] mq450:pb-[53px] mq450:box-border mq900:pt-[92px] mq900:px-7 mq900:pb-[81px] mq900:box-border">
          <div className="w-full flex-1 flex flex-col items-start justify-start py-[77px] px-[73px] box-border gap-[10px]  max-w-full z-[1] mq450:pt-[50px] mq450:pb-[50px] mq450:box-border mq900:w-full mq900:pl-[90px] mq900:pt-[88px] mq900:pr-[90px] mq900:box-border">
            <div className="self-stretch h-[249px] flex flex-col items-center justify-right relative gap-[10px] ">
  
              <img
                className="w-[143.6px] h-[116.5px] relative object-contain z-[1]"
                loading="lazy"
                alt=""
                src="/00946387da8d7278971a45a96268961d-2@2x.png"
              />
              <img
                className="w-[169.7px] gap-[100px]  h-[163.4px] absolute !m-[0] top-[-42px] left-[11.8px] object-contain z-[2]"
                loading="lazy"
                alt=""
                src="/00946387da8d7278971a45a96268961d-3@2x.png"
              />
            </div>
          </div>
          <div className="w-full h-full absolute !m-[0] top-[0px] right-[0.7px] bottom-[0px] left-[0px]">
            <img
              className="absolute justify-between top-[-50px] left-[0px] w-full h-full"
              alt=""
              src="Image-wrapper1.png"
            />
            <div className="absolute top-[262px] left-[221.6px] w-[206.6px] flex flex-row items-start justify-start">
              <img
                className="h-[329.1px] w-[336.9px] absolute !m-[0] top-[-191px] left-[-277px] object-contain z-[1]"
                alt=""
                src="/00946387da8d7278971a45a96268961d-9@2x.png"
              />
              <img
                className="h-[309px] w-[367.3px] absolute !m-[0] bottom-[-289px] left-[-329.3px] object-contain z-[1]"
                alt=""
                src="/00946387da8d7278971a45a96268961d-5@2x.png"
              />
              <img
                className="h-[200px] flex-1 relative max-w-full overflow-hidden object-cover z-[3]"
                alt=""
                src="/00946387da8d7278971a45a96268961d-4@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent3;
