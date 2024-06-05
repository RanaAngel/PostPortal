import PropTypes from "prop-types";
const ContactUs = ({ className = "" }) => {
    return (
      <section
        className={`self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[131px] box-border gap-[36px] max-w-full text-left text-xl text-black-sub-text font-inter mq900:gap-[18px] mq900:pb-[85px] mq900:box-border mq450:gap-[18px] ${className}`}
      >
        <div className="self-stretch h-[52px] overflow-hidden shrink-0 flex flex-col items-center justify-start pt-0 px-5 pb-7 box-border gap-[28px] max-w-full">
          <div className="w-[1780px] relative font-medium inline-block max-w-full mq450:text-base">
            CONTACT US
          </div>
          <div className="w-[1780px] h-0 relative box-border max-w-full shrink-0 border-t-[1px] border-solid border-black-main-text" />
        </div>
        <div className="self-stretch h-[300px] flex flex-row flex-wrap items-start justify-start relative gap-[76px_499px] max-w-full mq1800:h-auto mq1800:min-h-[300] mq1650:h-auto mq1650:min-h-[300]">
          <h2 className="!m-[0] flex-1 absolute top-[0px] left-[96px] text-11xl tracking-[0.04em] font-extrabold font-inherit text-black-main-text mq900:text-5xl mq450:text-lg">
            WE MAKE SURE TO PROVIDE QUALITY AND DESIRABLE SERVICE FOR POST
            MANAGEMENT
          </h2>
          <div className="w-[472px] !m-[0] absolute right-[96px] bottom-[186px] flex flex-col items-start justify-start min-h-[114px] max-w-full">
            <div className="w-[385.4px] flex flex-col items-start justify-start py-0 pr-5 pl-0 box-border gap-[18px] max-w-full">
              <div className="self-stretch relative [text-decoration:underline] font-medium mq450:text-base">
                <p className="m-0">&nbsp;</p>
                <p className="m-0">&nbsp;</p>
                <p className="m-0">+977-987654321</p>
              </div>
              <div className="w-[258.8px] relative [text-decoration:underline] font-medium inline-block mq450:text-base">
                01-5678923
              </div>
            </div>
            <u className="relative [text-decoration:underline] font-medium whitespace-nowrap mt-[-111px] mq450:text-base">
              postportal@gmail.com
            </u>
          </div>
          <div className="w-full !m-[0] absolute top-[190px] left-[96px] overflow-hidden shrink-0 flex flex-row items-start justify-start py-3 px-[62px] box-border gap-[76px] max-w-full mq450:gap-[19px] mq1800:flex-wrap mq1300:gap-[38px] mq1300:pl-[31px] mq1300:pr-[31px] mq1300:box-border mq1650:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start pt-7 px-0 pb-0 box-border min-w-[716px] max-w-full mq900:min-w-full">
              <div className="self-stretch relative font-semibold mq450:text-base">
                MAKE SURE YOU GET UPDATED. FOLLOW US ON
              </div>
            </div>
            <img
              className="w-[522px] relative max-h-full max-w-full"
              loading="lazy"
              alt=""
              src="/group-164.svg"
            />
          </div>
        </div>
      </section>
    );
  };
  
  ContactUs.propTypes = {
    className: PropTypes.string,
  };
  
  export default ContactUs;