import PropTypes from "prop-types";

const Content = ({ className = "" }) => {
  return (
    <section
      className={`w-[1628px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-right text-17xl text-gray-500 font-m3-label-large ${className}`}
    >
      <div className="w-[788px] flex flex-col items-end justify-start gap-[88px] max-w-full mq450:gap-[22px] mq1050:gap-[44px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[6px] max-w-full">
          <div className="w-[765px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <h1 className="m-0 w-[601px] relative text-inherit leading-[40px] font-bold font-inherit inline-block shrink-0 mq450:text-3xl mq450:leading-[24px] mq1050:text-10xl mq1050:leading-[32px]">
              Connect Your Social Media Channels
            </h1>
          </div>
          <div className="self-stretch relative text-lg leading-[28px] text-black text-center">
            Manage and schedule your content efficiently by connecting your
            social media accounts.
          </div>
        </div>
        <div className="w-[774px] flex flex-row items-start justify-end py-0 px-[25px] box-border max-w-full text-left text-base text-black">
          <div className="flex-1 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border gap-[30px] max-w-full">
            <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between py-[13px] px-[25px] gap-[20px] mq750:flex-wrap">
              <div className="w-[285.5px] flex flex-row items-start justify-start gap-[29.3px]">
                <img
                  className="h-[50px] w-[50px] relative overflow-hidden shrink-0 min-h-[50px]"
                  loading="lazy"
                  alt=""
                  src="/logosfacebook1.svg"
                />
                <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="w-[106.8px] relative leading-[24px] font-semibold inline-block">
                      Facebook
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start text-sm text-slategray-100">
                      <div className="relative leading-[20px] inline-block min-w-[96.7px] shrink-0">
                        Page or Group
                      </div>
                      <div className="flex-1 relative leading-[20px] text-dodgerblue shrink-0">
                        Most Popular
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                <button className="cursor-pointer [border:none] py-2 px-7 bg-button rounded flex flex-row items-start justify-start hover:bg-mediumslateblue-100">
                  <div className="relative text-sm leading-[20px] font-medium font-m3-label-large text-color text-center inline-block min-w-[53px]">
                    Connect
                  </div>
                </button>
              </div>
            </div>
            <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between py-[13px] pr-[25px] pl-[27px] box-border max-w-full gap-[20px] mq750:flex-wrap">
              <div className="w-[360.7px] flex flex-row items-start justify-start gap-[27.9px] max-w-full mq450:flex-wrap">
                <img
                  className="h-[50px] w-[50px] relative overflow-hidden shrink-0 min-h-[50px]"
                  loading="lazy"
                  alt=""
                  src="/skilliconsinstagram1.svg"
                />
                <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border min-w-[184px]">
                  <div className="self-stretch flex flex-col items-start justify-start">
                    <div className="w-[112.2px] relative leading-[24px] font-semibold inline-block">
                      Instagram
                    </div>
                    <div className="self-stretch relative text-sm leading-[20px] text-slategray-100">
                      Business or Creator accounts
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                <button className="cursor-pointer [border:none] py-2 px-7 bg-button rounded flex flex-row items-start justify-start hover:bg-mediumslateblue-100">
                  <div className="relative text-sm leading-[20px] font-medium font-m3-label-large text-color text-center inline-block min-w-[53px]">
                    Connect
                  </div>
                </button>
              </div>
            </div>
            <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between py-4 px-[25px] gap-[20px] mq750:flex-wrap">
              <div className="h-[62px] w-[260.9px] relative">
                <img
                  className="absolute h-full top-[0px] bottom-[0px] left-[0px] rounded-9980xl max-h-full w-[65px]"
                  loading="lazy"
                  alt=""
                  src="/frame.svg"
                />
                <div className="absolute top-[9px] left-[75px] w-[77.2px] flex flex-col items-start justify-start">
                  <a className="[text-decoration:none] self-stretch relative leading-[24px] font-semibold text-[inherit]">
                    Twitter
                  </a>
                  <div className="w-[68.2px] flex flex-row items-start justify-start text-sm text-slategray-100">
                    <div className="flex-1 relative leading-[20px] shrink-0">
                      Profile
                    </div>
                    <div className="flex flex-col items-start justify-start pt-px px-0 pb-0">
                      <img
                        className="w-[18px] h-[18px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/fluentemojiflattoparrow.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute top-[33px] left-[149.5px] text-sm leading-[20px] text-mediumspringgreen inline-block w-[111.4px]">
                  Top Connected
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[13px] px-0 pb-0">
                <button className="cursor-pointer [border:none] py-2 px-7 bg-button rounded flex flex-row items-start justify-start hover:bg-mediumslateblue-100">
                  <div className="relative text-sm leading-[20px] font-medium font-m3-label-large text-color text-center inline-block min-w-[53px]">
                    Connect
                  </div>
                </button>
              </div>
            </div>
            <div className="self-stretch shadow-[0px_1px_2px_-1px_rgba(0,_0,_0,_0.1),_0px_1px_3px_rgba(0,_0,_0,_0.1),_0px_0px_0px_#000,_0px_0px_0px_#000] rounded-lg bg-color overflow-hidden flex flex-row items-start justify-between pt-[26px] pb-[18px] pr-[25px] pl-8 gap-[20px] mq450:flex-wrap">
              <div className="w-[173.9px] flex flex-row items-end justify-start gap-[17px]">
                <img
                  className="h-[50px] w-[50px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/skilliconslinkedin1.svg"
                />
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="w-[72px] relative leading-[24px] font-semibold inline-block">
                    LinkedIn
                  </div>
                  <div className="self-stretch relative text-sm leading-[20px] text-slategray-100">
                    Page or Profile
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                <button className="cursor-pointer [border:none] py-2 px-7 bg-button rounded flex flex-row items-start justify-start hover:bg-mediumslateblue-100">
                  <div className="relative text-sm leading-[20px] font-medium font-m3-label-large text-color text-center inline-block min-w-[53px]">
                    Connect
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
