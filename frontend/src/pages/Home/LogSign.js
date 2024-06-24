import ContentArea from "./ContentArea";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
const LogSign = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch flex flex-row items-start justify-center pt-0 pb-3 pr-3 pl-6 box-border max-w-full text-left text-lg text-black-main-text font-inter ${className}`}
    >
      <div className="w-[1700px] flex flex-row items-end justify-between max-w-full gap-[26px] mq1350:flex-wrap">
        <div className="h-[170px] w-[376px] flex flex-col items-start justify-end pt-0 px-0 pb-5 box-border max-w-full">
          <div className="self-stretch flex-1 flex flex-row items-end justify-start max-w-full">
            <img
              className="h-20 relative max-w-full overflow-hidden object-fill"
              loading="lazy"
              alt=""
              src="/95ba66434f85ea111bc97dcb33d85d72-1@2x.png"
            />
          </div>
        </div>
        <ContentArea />
        <div className="w-[450.5px] flex flex-row items-start justify-start pb-2 max-w-full mq450:gap-[20px]">
          <div className="w-[140.5px] flex flex-col items-start justify-start pt-[29px] px-8 pb-0 box-border">
            <div className="self-stretch relative font-medium whitespace-nowrap">
            <Link to="/login" className="text-black-main-text no-underline">LOG IN</Link>
            </div>
          </div>
          <div className="flex-1 flex flex-row items-start justify-start p-3">
            <div className="rounded-11xl bg-button  items-start justify-start pt-5 px-[40px] pb-[19px] whitespace-nowrap">
              <div className="h-[61px] w-[165.5px] relative rounded-11xl bg-button hidden" />
              <div className="relative font-medium inline-block min-w-[123px] z-[1]">
              <Link to="/signup" className="text-black-main-text no-underline">GET STARTED</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

LogSign.propTypes = {
  className: PropTypes.string,
};

export default LogSign;