import PropTypes from "prop-types";

const Schedule = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border gap-[7.7px] max-w-full text-left text-base text-secondary-secondary400 font-title-medium ${className}`}
    >
      <div className="w-[1112px] flex flex-row items-start justify-start py-0 px-[23px] box-border max-w-full">
        <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
          <div className="relative leading-[28px] font-medium">
            Scheduled Post View
          </div>
          <div className="flex flex-col items-start justify-start pt-[9.3px] px-0 pb-0 mq1400:hidden">
            <div className="relative leading-[28px] font-medium">
              Post Creation Timeline
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[10px] max-w-full text-lg text-secondary-title-color mq1400:flex-wrap">
        <div className="w-[427px] rounded-xl bg-just-white box-border overflow-hidden shrink-0 flex flex-col items-end justify-start pt-[19px] px-[19px] pb-[178px] gap-[18.5px] min-h-[424px] max-w-full border-[1px] border-solid border-outline mq450:pt-5 mq450:pb-[116px] mq450:box-border">
          <div className="w-[427px] h-[424px] relative rounded-xl bg-just-white box-border hidden max-w-full border-[1px] border-solid border-outline" />
          <div className="self-stretch flex flex-col items-start justify-start gap-[6px] text-primary-subtitle-color">
            <div className="self-stretch flex flex-row items-center justify-between gap-[20px] z-[1] mq450:flex-wrap">
              <div className="w-[200px] relative leading-[28px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0">
                Upcoming Post
              </div>
              <div className="rounded bg-just-white flex flex-row items-center justify-center py-0 px-[17px] text-xs font-roboto border-[1px] border-solid border-whitesmoke">
                <div className="h-[27px] flex flex-row items-center justify-center py-0 px-0.5 box-border">
                  <div className="relative leading-[28px] inline-block min-w-[104px]">
                    Today, 13 Jan 2024
                  </div>
                </div>
              </div>
            </div>
            <div className="relative text-xs leading-[28px] inline-block min-w-[60px] z-[1]">
              This Week
            </div>
          </div>
          <div className="self-stretch rounded-md bg-background-color overflow-hidden flex flex-row items-start justify-start py-[9px] px-[15px] gap-[4px] z-[1] text-base border-[0.5px] border-solid border-outline mq450:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start gap-[6px] min-w-[184px]">
              <div className="self-stretch relative leading-[24px]">
                Dashain Upahaar
              </div>
              <div className="w-[258px] relative text-3xs font-inter text-primary-subtitle-color inline-block whitespace-nowrap">
                July 12th 2024, 1:01 pm
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[9px] px-0 pb-0">
              <div className="flex flex-row items-start justify-start gap-[20px]">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                  loading="lazy"
                  alt=""
                  src="/icnotifications.svg"
                />
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                  loading="lazy"
                  alt=""
                  src="/ichorizontal-menu.svg"
                />
              </div>
            </div>
          </div>
          <div className="self-stretch rounded-md bg-background-color overflow-hidden flex flex-row items-start justify-start py-[9px] px-[15px] gap-[4px] z-[1] text-mini border-[0.5px] border-solid border-outline mq450:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start gap-[6px] min-w-[184px]">
              <div className="self-stretch relative leading-[24px]">
                Lifewell : Live a better Life
              </div>
              <div className="w-[258px] relative text-3xs font-inter text-primary-subtitle-color inline-block whitespace-nowrap">
                July 13th 2024, 1:01 pm
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[9px] px-0 pb-0">
              <div className="flex flex-row items-start justify-start gap-[20px]">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                  loading="lazy"
                  alt=""
                  src="/icnotifications.svg"
                />
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                  loading="lazy"
                  alt=""
                  src="/ichorizontal-menu.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[438px] flex flex-col items-start justify-start py-0 pr-7 pl-0 box-border max-w-full text-sm text-base-base-black font-plus-jakarta-sans">
        
        </div>
        <div className="flex-1 flex flex-col items-start justify-start pt-[5.8px] px-0 pb-0 box-border min-w-[462px] max-w-full text-xs text-text-colors mq825:min-w-full">
          <div className="self-stretch rounded-3xs overflow-hidden flex flex-col items-end justify-start py-3 px-3.5 gap-[10px] border-[1px] border-solid border-outline">
            <div className="self-stretch flex flex-row items-center justify-end py-0 pr-0 pl-[490px] gap-[16px] mq450:pl-5 mq450:box-border mq825:flex-wrap mq825:pl-[245px] mq825:box-border">
              <div className="flex flex-row items-center justify-center py-0 px-2.5">
                <div className="relative leading-[28px] inline-block min-w-[33px]">
                  Week
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-0 px-2.5">
                <div className="relative leading-[28px] inline-block min-w-[38px]">
                  Month
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-0 px-2.5">
                <div className="relative leading-[28px] inline-block min-w-[28px]">
                  Year
                </div>
              </div>
            </div>
            <textarea
              className="bg-[transparent] h-[333px] w-auto [outline:none] self-stretch rounded-3xs box-border overflow-hidden shrink-0 border-[1px] border-solid border-secondary-secondary300"
              rows={17}
              cols={34}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Schedule.propTypes = {
  className: PropTypes.string,
};
export default Schedule;