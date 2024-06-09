import PropTypes from "prop-types";
const ContentArea = ({ className = "" }) => {
    return (
      <section
        className={`flex-1 flex flex-col items-start justify-end pt-0 pb-5 pr-[73px] pl-0 box-border max-w-full text-left text-lg text-black-main-text font-inter mq1300:pl-9 mq1300:pr-9 mq1300:box-border ${className}`}
      >
        <div className="self-stretch flex flex-row items-start justify-center [row-gap:300px] mq450:flex-wrap">
            <div className="ml-[-8.5px] w-[151px] flex flex-row items-start justify-start p-2.5 box-border shrink-0 [debug_commit:bf4bc93]">
              <div className="flex-1 rounded-31xl bg-button flex flex-row items-start justify-end pt-[7px] px-[33px] pb-2.5">
                <div className="h-[39px] w-[131px] relative rounded-31xl bg-button hidden" />
                <div className="relative font-medium inline-block min-w-[51px] z-[1]">
                  HOME
                </div>
              </div>
            </div>
         
          <div className="flex flex-col items-start justify-start pt-[18.5px] px-0 pb-0">
            <div className="flex flex-row items-start justify-start py-0 px-[29px]">
              <div className="relative font-medium inline-block min-w-[75px]">
                PRICING
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[18.5px] px-0 pb-0">
            <div className="flex flex-row items-start justify-start py-0 px-[19px]">
              <div className="relative font-medium inline-block min-w-[96px]">
                FEATURES
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

ContentArea.propTypes = {
    className: PropTypes.string,
  };
  
  export default ContentArea;