import PropTypes from "prop-types";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SocialMediaHeading = ({ className = "" }) => {
  
  const navigate = useNavigate();

  const onButtonContainerClick6 = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <section
      className={`w-[1699px] flex flex-row items-start justify-start pt-0 px-2.5 pb-[51px] box-border max-w-full text-left text-lg text-gray-100 font-body-body1-regular mq900:pb-[33px] mq900:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[74px] max-w-full mq450:gap-[18px] mq900:gap-[37px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[17.5px] max-w-full">
          <div className="flex flex-row items-start justify-start py-0 px-1">
            <div className="relative font-medium">SERVICE PRICING</div>
          </div>
          <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black" />
          <div className="w-[1666px] flex flex-row items-start justify-start py-0 px-1 box-border max-w-full text-11xl text-black-main-background">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq1650:flex-wrap">
              <div className="w-[565px] flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border max-w-full">
                <h2
                  className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-lg mq900:text-5xl"
                  data-scroll-to="cHOOSEAPLAN"
                >{`CHOOSE A PLAN. WE OFFER OUR SERVICE IN AFFORDABLE PRICE `}</h2>
              </div>
              <div className="w-[1009px] relative text-xl font-medium text-gray-100 inline-block shrink-0 max-w-full mq450:text-base">
                Choose a plan that suits your needs and budget. we offer our
                services at affordable prices, ensuring that you get the best
                value for your money. Whether you're a small business or a large
                corporation, we have plans designed to fit your requirements
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1608.4px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-41xl text-gray-300">
          <div className="w-[1106.4px] flex flex-row items-start justify-between max-w-full gap-[20px] mq1300:flex-wrap">
            <div className="w-[432.4px] shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(250,_250,_250,_0.2),_rgba(0,_0,_0,_0.2))] flex flex-col items-start justify-start pt-[98px] px-0 pb-px box-border gap-[154px] min-w-[432.4px] shrink-0 max-w-full mq450:gap-[77px] mq900:pt-16 mq900:pb-5 mq900:box-border mq900:min-w-full mq1300:flex-1">
              <div className="self-stretch h-[478px] relative shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(250,_250,_250,_0.2),_rgba(0,_0,_0,_0.2))] hidden" />
              <div className="w-[322.2px] h-[82px] flex flex-row items-start justify-start py-0 px-[42px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[7px]">
                    <h1 className="m-0 h-[82px] flex-1 relative text-inherit font-extrabold font-inherit inline-block z-[1] mq450:text-17xl mq900:text-29xl">
                      <p className="m-0">&nbsp;</p>
                      <p className="m-0">FREE</p>
                    </h1>
                  </div>
                  <b className="relative text-base tracking-[0.08em] inline-block text-palevioletred min-w-[122px] z-[1] mt-[-40px]">
                    {" "}
                    * START FOR
                  </b>
                </div>
              </div>
              <div className="self-stretch rounded-xl bg-whitesmoke-200 flex flex-row items-end justify-start pt-[21px] pb-7 pr-[35px] pl-[41px] box-border gap-[11.2px] max-w-full z-[1] text-base mq450:flex-wrap">
                <div className="h-[143px] w-[432.4px] relative rounded-xl bg-whitesmoke-200 hidden max-w-full" />
                <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[3px]">
                  <div className="flex flex-col items-start justify-start gap-[5.3px]">
                    <img
                      className="w-[18.1px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect.svg"
                    />
                    <img
                      className="w-[18.1px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect.svg"
                    />
                    <img
                      className="w-[18.1px] h-[17px] relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-2.svg"
                    />
                    <div className="flex flex-row items-start justify-start py-0 pr-0.5 pl-px">
                      <img
                        className="h-[13px] w-[15.1px] relative overflow-hidden shrink-0 z-[2]"
                        loading="lazy"
                        alt=""
                        src="/makicross.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[3.5px] min-w-[212px] max-w-full">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full">
                    <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
                      <div className="flex flex-col items-start justify-start pt-[13px] px-0 pb-0">
                        <div className="flex flex-col items-start justify-start gap-[3px] shrink-0">
                          <div className="relative font-semibold inline-block min-w-[113.9px] z-[2]">
                            User Analytics
                          </div>
                          <div className="relative font-semibold inline-block min-w-[99.8px] z-[2]">
                            Data Metrics
                          </div>
                        </div>
                      </div>
                      <button className="cursor-pointer [border:none] pt-2 px-[34px] pb-[7px] bg-slateblue rounded-11xl flex flex-row items-start justify-start shrink-0 z-[2] hover:bg-mediumslateblue-200">
                        <div className="h-[35px] w-[110.9px] relative rounded-11xl bg-slateblue hidden" />
                        <b className="relative text-base inline-block font-body-body1-regular text-black-main-text text-left min-w-[41.3px] z-[1]">
                          FREE
                        </b>
                      </button>
                    </div>
                  </div>
                  <div className="relative font-semibold z-[2]">
                    Post Management Dashboard
                  </div>
                  <div className="relative leading-[16px] font-semibold inline-block min-w-[112.9px] z-[2]">
                    Schedule Post
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[429px] shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.2),_rgba(0,_0,_0,_0.2))] flex flex-col items-start justify-start pt-[93px] px-0 pb-0 box-border gap-[174px] min-w-[429px] shrink-0 max-w-full mq450:gap-[87px] mq900:pt-[60px] mq900:box-border mq900:min-w-full mq1300:flex-1">
              <div className="self-stretch h-[478px] relative shadow-[2px_2px_20px_20px_rgba(0,_0,_0,_0.2)] rounded-xl [background:linear-gradient(180deg,_rgba(255,_255,_255,_0.2),_rgba(0,_0,_0,_0.2))] hidden" />
              <div className="w-[253px] flex flex-row items-start justify-start py-0 px-[35px] box-border">
                <div className="flex-1 flex flex-col items-start justify-start">
                  <div className="self-stretch h-[66px] relative font-extrabold inline-block shrink-0 z-[1] mq450:text-17xl mq900:text-29xl">
                    <p className="m-0">&nbsp;</p>
                    <p className="m-0">$ 100</p>
                  </div>
                  <b className="w-[179px] relative text-base tracking-[0.08em] inline-block text-palevioletred z-[1] mt-[-17px]">
                    {" "}
                    * BUY PREMIUM
                  </b>
                </div>
              </div>
              <div className="self-stretch rounded-xl bg-whitesmoke-200 flex flex-row items-start justify-start pt-[22px] pb-[29px] pr-5 pl-[35px] box-border gap-[2px] max-w-full z-[1] text-base mq450:flex-wrap">
                <div className="h-[143px] w-[429px] relative rounded-xl bg-whitesmoke-200 hidden max-w-full" />
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <div className="flex flex-col items-start justify-start gap-[8px]">
                    <img
                      className="w-[18px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-3.svg"
                    />
                    <img
                      className="w-[18px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-3.svg"
                    />
                    <img
                      className="w-[18px] h-4 relative overflow-hidden shrink-0 z-[2]"
                      loading="lazy"
                      alt=""
                      src="/iconparkcorrect-3.svg"
                    />
                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px">
                      <img
                        className="h-4 w-[18px] relative overflow-hidden shrink-0 z-[2]"
                        loading="lazy"
                        alt=""
                        src="/iconparkcorrect-3.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border min-w-[160px]">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
                    <div className="w-[150px] flex flex-row items-start justify-start py-0 px-0.5 box-border">
                      <div className="flex-1 relative font-semibold whitespace-pre-wrap z-[2]">
                        {" "}
                        User Analytics
                      </div>
                    </div>
                    <div className="flex flex-row items-start justify-start py-0 px-[11px]">
                      <div className="relative font-semibold inline-block min-w-[107px] z-[2]">
                        Data Metrics
                      </div>
                    </div>
                    <div className="self-stretch relative font-semibold whitespace-pre-wrap z-[2]">
                      {" "}
                      Post Management Dashboard
                    </div>
                    <div className="w-[154px] flex flex-row items-start justify-start py-0 px-px box-border">
                      <div className="h-2.5 flex-1 relative font-semibold whitespace-pre-wrap inline-block z-[2]">
                        {" "}
                        Schedule Post
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={onButtonContainerClick6} className="cursor-pointer [border:none] pt-[9px] pb-2 pr-8 pl-[35px] bg-slateblue rounded-11xl flex flex-row items-start justify-start z-[2] hover:bg-mediumslateblue-200">
                  <div className="h-[35px] w-[104.4px] relative rounded-11xl bg-slateblue hidden" />
                  <b className="relative text-base inline-block font-body-body1-regular text-black-main-text text-left min-w-[37px] z-[3]">
                    BUY
                  </b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SocialMediaHeading.propTypes = {
  className: PropTypes.string,
};

export default SocialMediaHeading;