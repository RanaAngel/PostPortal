import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <section
      className={`w-[1685px] flex flex-row items-start justify-start py-0 px-[3px] box-border max-w-full text-left text-lg text-gray-100 font-body-body1-regular ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[57px] max-w-full mq900:gap-[28px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[17.5px] max-w-full">
          <div className="flex flex-row items-start justify-start py-0 px-0.5">
            <div className="relative font-medium inline-block min-w-[121px]">
              CONTACT US
            </div>
          </div>
          <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black" />
          <div className="w-[1665px] flex flex-row items-start justify-between py-0 pr-5 pl-0 box-border max-w-full gap-[20px] text-11xl text-black-main-background mq1300:flex-wrap">
            <h2 className="m-0 w-[633px] relative text-inherit tracking-[0.04em] font-extrabold font-inherit inline-block shrink-0 max-w-full mq450:text-lg mq900:text-5xl">
              WE MAKE SURE TO PROVIDE QUALITY AND DESIRABLE SERVICE FOR POST
              MANAGEMENT
            </h2>
            <div className="flex flex-col items-start justify-start gap-[27.5px] text-lg text-gray-100">
              <div className="flex flex-row items-start text-2xl justify-start py-0 pr-0 pl-[5px]">
                <a
                  className="relative [text-decoration:underline] font-normal text-black whitespace-nowrap"
                  href="mailto:postportal@gmail.com"
                >
                  postportal@gmail.com
                </a>
              </div>
              <a
                className="relative text-2xl [text-decoration:underline] font-medium text-black whitespace-nowrap"
                href="tel:+977987654321"
              >
                +977-987654321
              </a>
              <div className="flex flex-row items-start justify-start py-0 px-[5px]">
                <a
                  className="relative text-black text-2xl [text-decoration:underline] font-medium inline-block min-w-[107px]"
                  href="https://www.google.com/maps/search/?api=1&query=01-5678923"
                  target="_blank"
                  rel=""
                >
                  New Baneshwor, kathmandu
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[911px] flex flex-row items-start justify-start py-0 px-[5px] box-border max-w-full">
          <div className="flex-1 flex flex-row flex-wrap items-start justify-start gap-[72px] max-w-full mq450:gap-[18px] mq1300:gap-[36px]">
            <div className="flex-1 flex flex-col items-start justify-start pt-[39px] px-0 pb-0 box-border min-w-[313px] max-w-full">
              <div className="self-stretch relative font-semibold">
                MAKE SURE YOU GET UPDATED. FOLLOW US ON
              </div>
            </div>
            <div className="w-[348px] flex flex-row items-end justify-start relative gap-[2px] max-w-full mq450:flex-wrap">
              <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[9.3px]">
                <img
                  className="w-20 h-20 relative rounded-[50%] object-cover"
                  loading="lazy"
                  alt=""
                  src="/ellipse-6@2x.png"
                />
              </div>
              <img
                className="h-[calc(100%_-_11.5px)] w-[109px] absolute !m-[0] top-[8px] right-[0px] bottom-[3.5px] rounded-16xl max-h-full object-contain z-[1]"
                loading="lazy"
                alt=""
                src="/00946387da8d7278971a45a96268961d-5-1@2x.png"
              />
              <div className="h-[99.3px] w-[173.5px] relative">
                <img
                  className="absolute h-full top-[0px] bottom-[0px] left-[0px] rounded-116xl-3 max-h-full w-[78.7px] object-contain"
                  alt=""
                  src="/00946387da8d7278971a45a96268961d-5-2@2x.png"
                />
                <img
                  className="absolute h-[calc(100%_-_3.7px)] top-[3px] bottom-[0.7px] left-[71px] rounded-7xl max-h-full w-[102.5px] object-contain"
                  alt=""
                  src="/00946387da8d7278971a45a96268961d-4-1@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;