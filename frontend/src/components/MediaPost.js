import { useCallback } from "react";
import Facebook from "./Facebook";
import PropTypes from "prop-types";

const MediaPost = ({ className = "" }) => {
  const onAddClick = useCallback(() => {
    // Please sync "Channels" to the project
  }, []);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start py-0 px-0 gap-[3px] text-left text-base text-secondary-secondary400 font-title-medium ${className}`}
    >
      <div className="flex flex-row items-center justify-center p-2.5">
        <a className="[text-decoration:none] relative leading-[28px] font-medium text-[inherit]">
          Media Posts View
        </a>
      </div>
      <div className="self-stretch flex flex-row items-center justify-center py-[3.5px] px-[27px] gap-[60px] text-lg text-text-colors mq825:gap-[30px] mq1400:flex-wrap">
        <Facebook
          logosfacebook="/logosfacebook.svg"
          facebook="Facebook"
          prop="24"
        />
        <Facebook
          logosfacebook="/skilliconsinstagram.svg"
          facebook="Instagram"
          prop="24"
          propBackgroundColor="unset"
        />
        <Facebook
          logosfacebook="/skilliconslinkedin.svg"
          facebook="LinkedIn"
          prop="0"
          propBackgroundColor="unset"
        />
        <Facebook
          logosfacebook="/logostwitter.svg"
          facebook="Twitter"
          prop="0"
          propBackgroundColor="unset"
        />
        <div className="flex-1 rounded-3xs bg-just-white box-border overflow-hidden flex flex-row items-end justify-end min-w-[260px] max-w-[265px] text-xl text-secondary-secondary900 border-[2px] border-solid border-low-opq-color">
          <div className="h-[306px] flex-1 flex flex-col items-center justify-start">
            <div className="self-stretch flex-1 flex flex-col items-start justify-between">
              <div className="self-stretch flex flex-col items-center justify-center py-5 px-[30px] gap-[30px] mq450:gap-[15px]">
                <div className="self-stretch flex flex-row items-center justify-start py-0 px-0">
                  <h3 className="m-0 w-[222px] relative text-inherit tracking-[0.02em] leading-[28px] font-semibold font-inherit inline-block shrink-0 mq450:text-base mq450:leading-[22px]">
                    Connected Channels
                  </h3>
                </div>
                <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-sm text-text-colors">
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-3.5 pl-0 gap-[20px]">
                    <div className="flex flex-row items-center justify-start gap-[20px]">
                      <img
                        className="h-6 w-[25.8px] relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/logosfacebook-1.svg"
                      />
                      <div className="relative leading-[28px] font-medium inline-block min-w-[69px]">
                        Facebook
                      </div>
                    </div>
                    <a className="[text-decoration:none] relative text-3xs leading-[28px] font-medium text-success-success200 inline-block min-w-[56px]">
                      Connected
                    </a>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-0 gap-[20px]">
                    <div className="flex flex-row items-center justify-start gap-[20px]">
                      <img
                        className="h-6 w-6 relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/skilliconsinstagram-1.svg"
                      />
                      <div className="relative leading-[28px] font-medium inline-block min-w-[74px]">
                        Instagram
                      </div>
                    </div>
                    <div className="relative text-3xs leading-[28px] font-medium text-success-success200 inline-block min-w-[56px]">
                      Connected
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="cursor-pointer [border:none] py-[1.5px] px-[52px] bg-button self-stretch overflow-hidden flex flex-col items-start justify-between box-border min-h-[51px] mq450:pl-5 mq450:pr-5 mq450:box-border"
                onClick={onAddClick}
              >
                <button className="cursor-pointer [border:none] py-2.5 px-0 bg-[transparent] self-stretch flex flex-row items-center justify-center gap-[10px]">
                  <div className="relative text-sm leading-[28px] font-medium font-title-medium text-just-white text-left">
                    Add More Channels
                  </div>
                  <img
                    className="h-6 w-6 relative overflow-hidden shrink-0"
                    alt=""
                    src="/icroundadd.svg"
                  />
                </button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MediaPost.propTypes = {
  className: PropTypes.string,
};
export default MediaPost;