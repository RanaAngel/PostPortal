
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Slidebar = ({ className = "" }) => {
  const navigate = useNavigate();

  const onGroupsContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onGroupsContainerClick1 = useCallback(() => {
    navigate("/dashboard");
  }, []);

  const onGroupsContainerClick2 = useCallback(() => {
    navigate("/library");
  }, []);

  const onGroupsContainerClick3 = useCallback(() => {
    navigate("/channels");
  }, []);

  return (
    <div
      className={`self-stretch w-[233px] bg-white box-border overflow-hidden shrink-0 flex flex-col items-end justify-start pt-0 px-0 pb-[70px] relative gap-[235px] text-center text-base text-gray-200 font-roboto border-r-[1px] border-solid border-gainsboro-200 border-b-[1px] mq1050:flex mq1050:pb-[45px] mq1050:box-border mq450:flex mq450:w-20 mq725:self-stretch mq725:h-auto mq725:pb-[29px] mq725:box-border ${className}`}
    >
      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-px gap-[43px] text-left text-lg text-gray-100 font-inter">
        <div
          className="self-stretch bg-gray-300 flex flex-row items-start justify-start py-12 px-2.5 cursor-pointer"
          onClick={onGroupsContainerClick}
        >
          <img
            className="h-[58px] w-[87px] relative object-cover"
            loading="lazy"
            alt=""
            src="/logo@2x.png"
          />
          <div className="flex-1 flex flex-col items-start justify-start pt-[18px] px-0 pb-0">
            <a className="[text-decoration:none] self-stretch relative text-[inherit]">
              Post Portal
            </a>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-1 pl-[9px] text-mini-5 text-dimgray-300">
          <div className="flex-1 flex flex-col items-start justify-start pt-0 px-2.5 pb-[23px] gap-[48px]">
            <div
              className="rounded-mid bg-gray-300 flex flex-col items-start justify-start py-2.5 px-[39px] cursor-pointer"
              onClick={onGroupsContainerClick1}
            >
              <div className="flex flex-row items-center justify-start py-0 pr-[5px] pl-0 gap-[13px]">
                <img
                  className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                  alt=""
                  src="/magedashboard2.svg"
                />
                <a className="[text-decoration:none] h-6 relative text-[inherit] flex items-center min-w-[84px]">
                  Dashboard
                </a>
              </div>
            </div>
            <div onClick={onGroupsContainerClick2} className="self-stretch rounded-mid flex flex-col items-start justify-start py-[11px] px-[37px] text-dimgray-100 cursor-pointer">
              <div className="w-[108px] flex flex-row items-center justify-start py-0 pr-[22px] pl-0 box-border gap-[13px]">
                <img
                  className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                 
                  alt=""
                  src="/solarlibrarylinear.svg"
                />
                <a className="[text-decoration:none] flex-1 relative text-[inherit]">
                  Library
                </a>
              </div>
            </div>
            <div
              className="rounded-mid bg-gray-300 flex flex-col items-start justify-start py-2.5 px-[39px] cursor-pointer"
              
            >
              <div className="flex flex-row items-center justify-start py-0 pr-[3px] pl-0 gap-[13px]">
                <img
                  className="h-5 w-5 relative overflow-hidden shrink-0"
                  alt=""
                  src="/ioncreatesharp.svg"
                />
                <div className="h-6 relative flex items-center min-w-[84px]">
                  Create Post
                </div>
              </div>
            </div>
            <div
              className="self-stretch rounded-mid bg-gray-300 flex flex-col items-start justify-start py-2.5 px-[39px] cursor-pointer"
             
            >
              <div className="flex flex-row items-center justify-start gap-[13px]">
                <img
                  className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/tdesignchartanalytics.svg"
                />
                <div className="h-[23px] relative flex items-center min-w-[65px]">
                  Analytics
                </div>
              </div>
            </div>
            <div onClick={onGroupsContainerClick3} className="self-stretch rounded-mid bg-gray-300 flex flex-col items-start justify-start py-2.5 px-[27px] text-slategray-200 cursor-pointer">
              <div className="flex flex-row items-center justify-start py-0 px-[11px] gap-[13px]">
                <img
                  className="h-4 w-4 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/fluentchannelshare16filled.svg"
                />
                <div className="h-6 relative flex items-center min-w-[73px]">
                  Channels
                </div>
              </div>
            </div>
            <div className="self-stretch rounded-mid bg-gray-300 hidden flex-col items-start justify-start py-2.5 px-[35px] text-base font-poppins mq725:flex">
              <div className="w-[104px] flex flex-row items-center justify-start py-1 pr-1.5 pl-0 box-border gap-[12px]">
                <img
                  className="h-[26px] w-7 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/mingcuteuser4line.svg"
                />
                <div className="h-[18px] flex-1 overflow-hidden flex flex-row items-center justify-start gap-[4px]">
                  <div className="h-6 w-9 relative leading-[24px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block">
                    User
                  </div>
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0"
                    alt=""
                    src="/user-options.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-end py-0 pr-9 pl-[37px]">
        <div className="flex-1 rounded-xl bg-sandybrown flex flex-row items-start justify-start py-2 px-1 whitespace-nowrap">
          <div className="flex-1 relative leading-[24px]">Upgrade to PRO</div>
        </div>
      </div>
      <div className="w-[97px] !m-[0] absolute h-full top-[0px] bottom-[0px] left-[1px] bg-white box-border overflow-hidden hidden flex-col items-end justify-start pt-12 pb-[72px] pr-[7px] pl-0 gap-[277px] z-[1] border-r-[1px] border-solid border-gainsboro-200 border-b-[1px] mq450:flex">
        <div className="self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-px gap-[90px]">
          <img
            className="self-stretch h-[58px] relative max-w-full overflow-hidden shrink-0 object-cover"
            alt=""
            src="/logo-1@2x.png"
          />
          <div className="flex flex-col items-end justify-start pt-2.5 pb-1 pr-[30px] pl-7 gap-[72.5px]">
            <div className="flex flex-row items-start justify-end py-0 pr-0.5 pl-[9px]">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                alt=""
                src="/magedashboard2.svg"
              />
            </div>
            <div className="flex flex-row items-start justify-end py-0 pr-1 pl-[7px]">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                alt=""
                src="/solarlibrarylinear.svg"
              />
            </div>
            <img
              className="w-5 h-5 relative overflow-hidden shrink-0"
              alt=""
              src="/ioncreatesharp.svg"
            />
            <div className="w-[18px] h-[18px] relative bg-white overflow-hidden shrink-0 hidden" />
            <div className="flex flex-row items-start justify-end py-0 pr-px pl-0">
              <div className="flex flex-col items-end justify-start gap-[75.8px]">
                <div className="w-7 flex flex-row items-start justify-end py-0 pr-[3px] pl-1.5 box-border">
                  <img
                    className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/tdesignchartanalytics-1.svg"
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-[79.8px]">
                  <div className="flex flex-row items-start justify-start py-0 px-1.5">
                    <img
                      className="h-4 w-4 relative overflow-hidden shrink-0"
                      alt=""
                      src="/fluentchannelshare16filled.svg"
                    />
                  </div>
                  <img
                    className="w-7 h-[26px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/mingcuteuser4line.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-end py-0 pr-1 pl-3">
          <div className="w-[70.8px] rounded-xl bg-sandybrown flex flex-row items-start justify-start py-[3px] px-0 box-border whitespace-nowrap">
            <div className="ml-[-6px] w-[81px] relative leading-[24px] flex items-center justify-center shrink-0">{`Upgrade `}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Slidebar.propTypes = {
  className: PropTypes.string,
};

export default Slidebar;
