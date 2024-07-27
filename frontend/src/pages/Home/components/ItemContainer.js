import PropTypes from "prop-types";

const ItemContainer = ({
  className = "",
  firstCardImage,
  weOfferDashboardToManageY,
}) => {
  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start min-w-[392px] max-w-full text-justify text-base text-gray-100 font-body-body1-regular mq900:min-w-full ${className}`}
    >
      <div className="self-stretch h-[297.1px] relative rounded-xl max-w-full shrink-0 flex items-center justify-center">
        <img
          className="self-stretch h-full overflow-hidden shrink-0 object-contain absolute left-[5px] top-[-5px] w-full [transform:scale(1.135)]"
          loading="lazy"
          alt=""
          src={firstCardImage}
        />
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-1.5 box-border shrink-0 max-w-full mt-[-37.1px]">
        <div className="flex-1 shadow-[0px_-20px_20px_rgba(0,_0,_0,_0.3)] rounded-xl bg-whitesmoke-200 flex flex-row items-start justify-start py-[41px] px-[43px] box-border min-h-[156px] shrink-0 max-w-full z-[1] mq900:pl-[21px] mq900:pr-[21px] mq900:box-border">
          <div className="h-[156px] w-[594px] relative shadow-[0px_-20px_20px_rgba(0,_0,_0,_0.3)] rounded-xl bg-whitesmoke-200 hidden max-w-full" />
          <div className="flex-1 relative font-medium whitespace-pre-wrap inline-block max-w-full z-[2]">
            {weOfferDashboardToManageY}
          </div>
        </div>
      </div>
    </div>
  );
};

ItemContainer.propTypes = {
  className: PropTypes.string,
  firstCardImage: PropTypes.string,
  weOfferDashboardToManageY: PropTypes.string,
};

export default ItemContainer;