import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Services = ({ className = "" }) => {
  const navigate = useNavigate();

  const onLOGINTextClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <section
      className={`w-[1702px] flex flex-row items-end justify-between max-w-full gap-[20px] text-left text-21xl text-gray-200 font-body-body1-regular mq1500:flex-wrap ${className}`}
    >
      <div className="w-[654px] flex flex-col items-start justify-start pt-0 px-0 pb-[97px] box-border min-w-[654px] min-h-[583px] max-w-full mq1225:min-w-full mq850:pb-[63px] mq850:box-border mq1500:flex-1">
        <div className="self-stretch flex flex-col items-start justify-start gap-[147px] max-w-full mq450:gap-[37px] mq850:gap-[73px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[46px] max-w-full mq850:gap-[23px]">
            <h1 className="m-0 self-stretch relative text-inherit tracking-[0.04em] font-extrabold font-inherit mq450:text-5xl mq850:text-13xl">
              CARE TO EXPLORE OUR SERVICES? GET TO MANAGE POSTS IN SINGLE CLICK
            </h1>
            <div className="w-[596px] relative text-xl font-medium inline-block max-w-full mq450:text-base">
              Gain access to powerful tools and features designed to streamline
              your social media workflow and boost your online presence.
            </div>
          </div>
          <div className="w-[292px] flex flex-row items-start justify-start">
            <button className="cursor-pointer [border:none] pt-[27px] px-[33px] pb-[26px] bg-button w-[153.8px] rounded-11xl overflow-hidden shrink-0 flex flex-row items-start justify-start box-border whitespace-nowrap z-[1] hover:bg-mediumslateblue-100">
              <div className="relative text-xl font-semibold font-body-body1-regular text-black-main-text text-left inline-block min-w-[81px]">
                SIGN UP
              </div>
            </button>
            <button className="cursor-pointer [border:none] pt-[27px] px-[30px] pb-[26px] bg-lightslategray-200 flex-1 rounded-11xl overflow-hidden flex flex-row items-start justify-end shrink-0 whitespace-nowrap ml-[-63.8px] hover:bg-mediumslateblue-300 active:bg-button mq1225:hover:bg-mediumslateblue-300 mq1225:active:bg-button mq850:hover:bg-mediumslateblue-300 mq850:active:bg-button mq1500:hover:bg-mediumslateblue-300 mq1500:active:bg-button">
              <a
                className="[text-decoration:none] w-[81px] relative text-xl font-semibold font-body-body1-regular text-gray-200 text-left inline-block shrink-0 cursor-pointer hover:text-color active:text-color mq1225:hover:text-color mq1225:active:text-color mq850:hover:text-color mq850:active:text-color mq1500:hover:text-color mq1500:active:text-color"
                onClick={onLOGINTextClick}
              >
                LOG IN
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[664px] flex flex-col items-end justify-start min-w-[664px] max-w-full mq1225:min-w-full mq1500:flex-1">
        <div className="self-stretch h-[115.1px] flex flex-row items-start justify-center py-0 pr-5 pl-[21px] box-border">
          <div className="self-stretch w-[114.9px] flex flex-row items-start justify-center relative gap-[10px] shrink-0 z-[1]">
            <div className="self-stretch flex-1 relative rounded-[50%] bg-neutral-main-50" />
            <div className="h-[91px] w-[calc(100%_-_24.1px)] absolute !m-[0] top-[12.8px] right-[12.8px] left-[11.3px] rounded-[50%] bg-lightslategray-200 z-[1]" />
            <img
              className="h-[37px] w-[42px] absolute !m-[0] top-[39px] left-[36px] overflow-hidden shrink-0 z-[2]"
              loading="lazy"
              alt=""
              src="/clarityaddline.svg"
            />
          </div>
        </div>
        <form className="m-0 self-stretch rounded-xl bg-lightslategray-200 flex flex-col items-start justify-start pt-[122px] pb-[79px] pr-[45px] pl-[46px] box-border gap-[37px] shrink-0 max-w-full mt-[-75.1px] mq850:gap-[18px] mq850:pl-[23px] mq850:pr-[22px] mq850:pb-[51px] mq850:box-border">
          <img
            className="w-[664px] h-[678px] relative rounded-xl hidden max-w-full"
            alt=""
            src="/logincontainer.svg"
          />
          <div className="self-stretch flex flex-col items-start justify-start gap-[11px] max-w-full">
            <div className="self-stretch flex flex-row items-start justify-start p-2.5 box-border max-w-full z-[1]">
              <input
                className="w-full [outline:none] bg-gainsboro-200 h-[50px] flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-[15px] px-4 pb-4 font-body-body1-regular font-medium text-base text-gray-200 min-w-[250px] max-w-full border-[1px] border-solid border-gray-200"
                placeholder="FULL NAME *"
                type="text"
              />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start p-2.5 box-border max-w-full z-[1]">
              <input
                className="w-full [outline:none] bg-gainsboro-200 flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 font-body-body1-regular font-medium text-base text-gray-200 min-w-[250px] max-w-full border-[1px] border-solid border-gray-200"
                placeholder="ORGANIZATION NAME *"
                type="text"
              />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
              <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
                <input
                  className="w-full [outline:none] bg-gainsboro-200 flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 font-body-body1-regular font-medium text-base text-gray-200 min-w-[250px] max-w-full border-[1px] border-solid border-gray-200"
                  placeholder="WORK EMAIL*"
                  type="text"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
              <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
                <input
                  className="w-full [outline:none] bg-gainsboro-200 flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 font-body-body1-regular font-medium text-base text-gray-200 min-w-[250px] max-w-full border-[1px] border-solid border-gray-200"
                  placeholder="PHONE *"
                  type="text"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-start max-w-full z-[1]">
              <div className="flex-1 flex flex-row items-start justify-start p-2.5 box-border max-w-full">
                <input
                  className="w-full [outline:none] bg-gainsboro-200 flex-1 rounded-8xs box-border flex flex-row items-start justify-start pt-[17px] px-4 pb-2.5 font-body-body1-regular font-medium text-base text-gray-200 min-w-[250px] max-w-full border-[1px] border-solid border-gray-200"
                  placeholder="PASSWORD *"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-2.5 box-border max-w-full">
            <button className="cursor-pointer [border:none] py-[11px] px-5 bg-button flex-1 rounded-8xs overflow-hidden flex flex-row items-start justify-center box-border max-w-full z-[1] hover:bg-mediumslateblue-100">
              <div className="relative text-xl font-medium font-body-body1-regular text-black-main-text text-left inline-block min-w-[78px] mq450:text-base">
                SUBMIT
              </div>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

Services.propTypes = {
  className: PropTypes.string,
};

export default Services;
