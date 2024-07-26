import ItemContainer from "./ItemContainer";
import PropTypes from "prop-types";

const FrameComponent2 = ({ className = "" }) => {
  return (
    <div
      className={`w-[1679px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full text-justify text-base text-gray-100 font-body-body1-regular ${className}`}
    >
      <div className="w-[1311px] flex flex-col items-start justify-start gap-[90.6px] max-w-full mq450:gap-[23px] mq900:gap-[45px]">
        <div className="self-stretch flex flex-row flex-wrap items-end justify-start gap-[108px] max-w-full mq450:gap-[27px] mq900:gap-[54px]">
          <ItemContainer
            firstCardImage="/rectangle-27@2x.png"
            weOfferDashboardToManageY="We offer dashboard to manage your post in social medias with analytic widgets to track  user post engagement with valuable data insights."
          />
          <div className="flex-1 flex flex-col items-start justify-start min-w-[392px] max-w-full mq900:min-w-full">
            <div className="self-stretch h-[268.9px] relative rounded-xl max-w-full shrink-0 flex items-center justify-center">
              <img
                className="self-stretch h-full overflow-hidden shrink-0 object-contain absolute left-[5px] top-[-5px] w-full [transform:scale(1.149)]"
                loading="lazy"
                alt=""
                src="/rectangle-14@2x.png"
              />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-2.5 box-border max-w-full mt-[-7.2px]">
              <div className="flex-1 shadow-[0px_-20px_20px_rgba(0,_0,_0,_0.3)] rounded-xl bg-whitesmoke-200 flex flex-row items-start justify-start py-[39px] pr-8 pl-[33px] box-border min-h-[154px] max-w-full z-[1]">
                <div className="h-[154px] w-[593px] relative shadow-[0px_-20px_20px_rgba(0,_0,_0,_0.3)] rounded-xl bg-whitesmoke-200 hidden max-w-full" />
                <div className="flex-1 relative font-medium inline-block max-w-full z-[2]">
                  <p className="m-0">{`Want to add posts in different social medias? our social media management software allows to create post and posts you `}</p>
                  <p className="m-0"> in your desired platform in one click</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-end justify-start gap-[108px] max-w-full mq450:gap-[27px] mq900:gap-[54px]">
          <ItemContainer
            firstCardImage="/rectangle-29@2x.png"
            weOfferDashboardToManageY="We offer dashboard to manage your posts and to give upcoming post’s details. Also scheduling of the posts"
          />
          <ItemContainer
            firstCardImage="/rectangle-28@2x.png"
            weOfferDashboardToManageY="We offer engagement analytics so that the posts can be refined and can attract more customers."
          />
        </div>
      </div>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
