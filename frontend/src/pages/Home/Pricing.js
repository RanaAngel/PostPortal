import PropTypes from "prop-types";
const Pricing = ({ className = "" }) => {
    return (
      <section
        className={`self-stretch flex flex-col items-start justify-start gap-[15px] max-w-full text-left text-xl text-black-sub-text font-inter ${className}`}
      >
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 px-24 box-border max-w-full mq900:pl-6 mq900:pr-6 mq900:box-border mq450:pl-6 mq450:pr-6 mq450:box-border mq1350:pl-12 mq1350:pr-12 mq1350:box-border mq1300:pl-12 mq1300:pr-12 mq1300:box-border">
          <div className="flex-1 flex flex-col items-start justify-start gap-[26.5px] max-w-full">
            <div className="w-[451.9px] relative font-medium inline-block max-w-full mq450:text-base">
              SERVICE PRICING
            </div>
            <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black-main-text" />
            <div className="w-[1755.1px] flex flex-row items-start justify-between max-w-full gap-[20px] text-11xl text-black-main-text mq1800:flex-wrap">
              <h2 className="m-0 h-36 w-[626.9px] relative text-inherit tracking-[0.04em] font-extrabold font-inherit inline-block shrink-0 min-w-[574.8px] max-w-full mq900:text-5xl mq900:min-w-full mq450:text-lg mq1800:flex-1 mq1650:flex-1">{`CHOOSE A PLAN. WE OFFER OUR SERVICE IN AFFORDABLE PRICE `}</h2>
              <div className="w-[815.6px] relative text-xl font-medium text-black-sub-text inline-block shrink-0 max-w-full mq450:text-base">
                Choose a plan that suits your needs and budget. we offer our
                services at affordable prices, ensuring that you get the best
                value for your money. Whether you're a small business or a large
                corporation, we have plans designed to fit your requirements
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center max-w-full text-41xl text-black-main-text">
          <div className="w-[1780px] flex flex-row items-start justify-start pt-[98px] px-[10%] pb-[51px] box-border gap-[320px] max-w-full mq900:gap-[80px] mq900:pt-16 mq900:pb-[33px] mq900:box-border mq1350:flex-wrap mq1350:gap-[160px] mq1300:flex-wrap mq1300:gap-[160px]">
            <div className="h-[351px] w-[259px] flex flex-col items-start justify-start gap-[188px] mq450:gap-[94px]">
              <div className="w-[238px] flex-1 flex flex-row items-start justify-start py-0 px-px box-border">
                <div className="self-stretch flex-1 flex flex-col items-start justify-start z-[1]">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[7px]">
                    <h1 className="m-0 h-[82px] flex-1 relative text-inherit font-extrabold font-inherit inline-block mq900:text-29xl mq450:text-17xl">
                      <p className="m-0">&nbsp;</p>
                      <p className="m-0">FREE</p>
                    </h1>
                  </div>
                  <b className="relative text-base tracking-[0.08em] leading-[16px] inline-block text-palevioletred min-w-[121px] mt-[-40px]">
                    {" "}
                    * START FOR
                  </b>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-start justify-start relative text-base">
                <div className="h-[478px] w-[429px] absolute !m-[0] top-[-368px] right-[-129px] shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(217,_217,_217,_0.2),_rgba(217,_217,_217,_0))]" />
                <div className="h-[143px] w-[429px] absolute !m-[0] top-[-34px] right-[-129px] rounded-xl bg-gainsboro z-[1]" />
                <button className="cursor-pointer [border:none] pt-2 px-[34px] pb-[7px] bg-[transparent] !m-[0] absolute top-[-13px] right-[-94px] flex flex-row items-start justify-start z-[2]">
                  <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-11xl bg-button" />
                  <b className="relative text-base inline-block font-inter text-black-main-text text-left min-w-[41px] z-[1]">
                    FREE
                  </b>
                </button>
                <div className="flex-1 flex flex-col items-start justify-start gap-[2px] z-[3]">
                  <div className="flex flex-row items-start justify-start gap-[12px]">
                    <img
                      className="h-4 w-[18px] relative overflow-hidden shrink-0"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect.svg"
                    />
                    <div className="relative font-semibold inline-block min-w-[113px]">
                      User Analytics
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[11px]">
                    <div className="h-14 w-[18px] relative">
                      <img
                        className="absolute top-[0px] left-[0px] w-[18px] h-4 overflow-hidden"
                        loading="lazy"
                        alt=""
                        src="/iconparkcorrect.svg"
                      />
                      <img
                        className="absolute top-[21px] left-[0px] w-[18px] h-[17px] overflow-hidden"
                        loading="lazy"
                        alt=""
                        src="/iconparkcorrect-2.svg"
                      />
                      <img
                        className="absolute top-[43px] left-[1px] w-[15px] h-[13px] overflow-hidden"
                        loading="lazy"
                        alt=""
                        src="/makicross.svg"
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start gap-[1.5px]">
                      <div className="flex flex-row items-start justify-start py-0 px-px">
                        <div className="relative font-semibold inline-block min-w-[99px]">
                          Data Metrics
                        </div>
                      </div>
                      <div className="relative font-semibold">
                        Post Management Dashboard
                      </div>
                      <div className="relative leading-[16px] font-semibold inline-block min-w-[112px]">
                        Schedule Post
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[301px] flex flex-col items-start justify-start pt-[9px] px-0 pb-0 box-border text-21xl">
              <div className="self-stretch flex flex-row items-start justify-start">
                <div className="flex-1 flex flex-col items-start justify-start pt-[43px] pb-[23px] pr-[11px] pl-[21px] relative gap-[121px] mq450:gap-[60px]">
                  <div className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl [background:linear-gradient(180deg,_rgba(217,_217,_217,_0.2),_rgba(217,_217,_217,_0))]" />
                  <div className="w-full h-[93px] absolute !m-[0] right-[0px] bottom-[0px] left-[0px] rounded-xl bg-gainsboro z-[1]" />
                  <div className="w-[210px] h-[66px] flex flex-row items-start justify-start py-0 px-3 box-border">
                    <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[3px]">
                        <div className="h-[66px] flex-1 relative font-extrabold inline-block z-[1] mq900:text-13xl mq450:text-5xl">
                          <p className="m-0">&nbsp;</p>
                          <p className="m-0">$ 100</p>
                        </div>
                      </div>
                      <b className="relative text-xs tracking-[0.08em] inline-block text-palevioletred min-w-[112px] z-[1] mt-[-43px]">
                        {" "}
                        * BUY PREMIUM
                      </b>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[27px] text-3xs mq450:flex-wrap">
                    <div className="flex-1 flex flex-col items-start justify-start gap-[3px] min-w-[107px]">
                      <div className="flex flex-row items-start justify-start gap-[9px]">
                        <img
                          className="h-[11px] w-[11px] relative overflow-hidden shrink-0 min-h-[11px] z-[2]"
                          loading="lazy"
                          alt=""
                          src="/iconparkcorrect-3.svg"
                        />
                        <div className="relative font-semibold inline-block min-w-[71px] z-[2]">
                          User Analytics
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-[9px]">
                        <img
                          className="h-2.5 w-[11px] relative overflow-hidden shrink-0 z-[2]"
                          loading="lazy"
                          alt=""
                          src="/iconparkcorrect-4.svg"
                        />
                        <div className="relative font-semibold inline-block min-w-[63px] z-[2]">
                          Data Metrics
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-[8px]">
                        <img
                          className="h-2.5 w-[11px] relative overflow-hidden shrink-0 z-[2]"
                          loading="lazy"
                          alt=""
                          src="/iconparkcorrect-4.svg"
                        />
                        <div className="relative font-semibold z-[2]">
                          Post Management Dashboard
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-[8px]">
                        <img
                          className="h-2.5 w-[11px] relative overflow-hidden shrink-0 min-h-[10px] z-[2]"
                          loading="lazy"
                          alt=""
                          src="/iconparkcorrect-4.svg"
                        />
                        <div className="relative leading-[10px] font-semibold inline-block min-w-[71px] z-[2]">
                          Schedule Post
                        </div>
                      </div>
                    </div>
                    <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[78px] flex flex-row items-start justify-start z-[2]">
                      <div className="h-[30px] flex-1 relative">
                        <div className="absolute top-[0px] left-[0px] rounded-11xl bg-button w-full h-full" />
                      </div>
                      <div className="w-[53px] flex flex-col items-start justify-start pt-[9px] px-0 pb-0 box-border ml-[-49px]">
                        <b className="self-stretch relative text-xs font-inter text-black-main-text text-left z-[1]">
                          BUY
                        </b>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
 Pricing.propTypes = {
    className: PropTypes.string,
  };
  
  export default Pricing;