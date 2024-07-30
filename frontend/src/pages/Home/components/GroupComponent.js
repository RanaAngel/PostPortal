import { useMemo } from "react";
import PropTypes from "prop-types";

const GroupComponent = ({
  className = "",
  testimonialCardAvatarImag,
  binaLawati,
  usingTheirServicesHasBeen,
  propHeight,
}) => {
  const groupDivStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  return (
    <div
      className={`h-[469px] w-[360px] relative shrink-0 max-w-full text-left text-lg text-gray-300 font-body-body1-regular ${className}`}
      style={groupDivStyle}
    >
      <div className="absolute top-[30px] left-[0px] rounded-11xl bg-whitesmoke-100 w-[360px] h-[439px]" />
      <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start py-[86px] px-[63px] box-border gap-[21px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border">
        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5">
          <img
            className="h-[70px] w-[70px] relative rounded-[50%] object-cover"
            loading="lazy"
            alt=""
            src={testimonialCardAvatarImag}
          />
        </div>
        <div className="flex flex-row items-start justify-start py-0 pr-[67px] pl-[66px]">
          <div className="relative font-semibold inline-block min-w-[100px]">
            {binaLawati}
          </div>
        </div>
        <div className="self-stretch relative text-base font-medium text-gray-100 text-justify">
          {usingTheirServicesHasBeen}
        </div>
      </div>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
  testimonialCardAvatarImag: PropTypes.string,
  binaLawati: PropTypes.string,
  usingTheirServicesHasBeen: PropTypes.string,

  /** Style props */
  propHeight: PropTypes.any,
};

export default GroupComponent;