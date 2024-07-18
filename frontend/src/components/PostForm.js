// import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const PostForm = ({ className = "" }) => {
  return (
    <div
      className={`w-[1144px] flex flex-col items-start justify-start gap-[50px] max-w-full text-left text-smi-5 text-black-main-background font-body-body1-regular mq750:gap-[25px] ${className}`}
    >
      <div className="w-[905px] relative text-xl tracking-[0.04em] font-medium inline-block max-w-full mq450:text-base">
        Create Post
      </div>
      <div className="w-[905px] flex flex-col items-start justify-start gap-[10px] max-w-full">
        <div className="self-stretch relative font-semibold">Post Name</div>
        <input
          className="[outline:none] bg-[transparent] self-stretch h-[37px] [background:linear-gradient(#fefefe,_#fefefe),_rgba(0,_0,_0,_0)] box-border min-w-[250px] border-[1px] border-solid border-gray-200"
          placeholder="Title"
          type="text"
        />
      </div>
      <div className="w-[905px] flex flex-col items-start justify-start gap-[10px] max-w-full">
        <div className="self-stretch h-7 relative font-semibold flex items-center shrink-0">
          Content
        </div>
        <textarea
          className="bg-[transparent] h-[166.4px] w-auto [outline:none] self-stretch [background:linear-gradient(#fefefe,_#fefefe),_rgba(0,_0,_0,_0)] box-border flex flex-row items-start justify-start py-[21px] px-[31px] font-body-body1-regular text-smi-5 text-darkgray-100 border-[1px] border-solid border-gray-200"
          placeholder="What's on your mind?"
          rows={8}
          cols={45}
        />
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[19.5px] max-w-full text-base text-gray-200">
        <div className="w-[905px] relative font-medium inline-block max-w-full">
          CHOOSE MEDIA YOU WANT TO UPLOAD ON *
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-end justify-start gap-[70px] max-w-full text-black-main-background mq750:gap-[17px] mq1150:gap-[35px]">
          <div className="flex-1 flex flex-col items-start justify-start gap-[1.1px] min-w-[588px] max-w-full mq750:min-w-full">
            <div className="w-[554.1px] flex flex-row items-start justify-start gap-[30px] max-w-full mq750:flex-wrap">
              <div className="flex-1 flex flex-row items-start justify-start gap-[10px] min-w-[84px]">
                <input
                  className="cursor-pointer m-0 h-5 w-[19.8px] relative rounded-xl box-border border-[1px] border-solid border-black"
                  type="radio"
                />
                <div className="relative tracking-[0.04em] font-medium inline-block min-w-[100px]">
                  INSTAGRAM
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[10px]">
                <input
                  className="cursor-pointer m-0 h-5 w-[19.8px] relative rounded-xl box-border border-[1px] border-solid border-black"
                  type="radio"
                />
                <div className="relative tracking-[0.04em] font-medium inline-block min-w-[76px]">
                  TWITTER
                </div>
              </div>
              <div className="flex-1 flex flex-row items-start justify-start gap-[9.9px] min-w-[79px]">
                <input
                  className="cursor-pointer m-0 h-5 w-[19.8px] relative rounded-xl box-border border-[1px] border-solid border-black"
                  type="radio"
                />
                <div className="relative tracking-[0.04em] font-medium inline-block min-w-[91px]">
                  FACEBOOK
                </div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[9px]">
                <input
                  className="cursor-pointer m-0 h-5 w-[19.8px] relative rounded-xl box-border border-[1px] border-solid border-black"
                  type="radio"
                />
                <div className="relative tracking-[0.04em] font-medium inline-block min-w-[79px]">
                  LINKEDIN
                </div>
              </div>
            </div>
            <div className="self-stretch h-[302.1px] relative max-w-full text-gray-200 mq1050:h-auto mq1050:min-h-[302.09999999999854]">
              <div className="absolute top-[67.8px] left-[0px] font-medium whitespace-pre-wrap inline-block w-[905px]">
                CHOOSE FILE *
              </div>
              <img
                className="absolute top-[106.3px] left-[0px] w-[130px] h-[68.7px]"
                loading="lazy"
                alt=""
                src="/group-27.svg"
              />
              <div className="absolute top-[225px] left-[0px] w-full flex flex-row items-start justify-start gap-[20px] max-w-full text-sm-5 mq1050:flex-wrap">
                <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[0.1px] box-border gap-[10px] min-w-[287px] max-w-full">
                  <div className="self-stretch relative font-semibold">
                    Scheduled Date
                  </div>
                  <div className="self-stretch h-[50px] text-smi-5 text-darkgray-200">
                    <img
                      className="h-5 w-5 relative overflow-hidden shrink-0"
                      alt=""
                      src="/uiwdate.svg"
                    />
                    <div className="h-[15px] w-6 relative font-semibold flex items-center">
                      ----
                    </div>
                  </div>
                </div>
                <div className="flex-1 hidden flex-col items-start justify-start pt-0 px-0 pb-[0.1px] box-border gap-[10px] min-w-[287px] max-w-full mq750:hidden">
                  <div className="self-stretch relative font-semibold">
                    Time
                  </div>
                  <div className="self-stretch [background:linear-gradient(#fff,_#fff),_rgba(0,_0,_0,_0)] flex flex-row items-center justify-start py-2.5 pr-[326px] pl-[19px] gap-[14px] text-smi-5 text-darkgray-300 border-[2px] border-solid border-gray-200 mq450:pr-5 mq450:box-border">
                    <img
                      className="h-6 w-6 relative overflow-hidden shrink-0"
                      alt=""
                      src="/carbontime.svg"
                    />
                    <div className="flex-1 relative font-semibold">----</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[0px] left-[505px] rounded-9xl bg-color box-border w-[328px] hidden flex-col items-start justify-start pt-[21px] px-0 pb-0 gap-[20px] z-[1] text-center text-xs text-schemes-on-surface-variant font-m3-label-large border-[2px] border-solid border-low-opq-input mq750:hidden mq1150:hidden mq1050:hidden">
                <div className="flex flex-row items-start justify-start py-0 px-6 text-left">
                  <div className="relative tracking-[0.5px] leading-[16px] font-medium inline-block min-w-[60px]">
                    Enter time
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-0 px-6 text-26xl text-schemes-on-surface">
                  <div className="flex-1 flex flex-row items-start justify-start">
                    <div className="w-24 flex flex-col items-start justify-start gap-[7px] text-button">
                      <div className="self-stretch rounded-lg bg-schemes-primary-container flex flex-row items-start justify-start py-[7px] px-[19px] gap-[1px] border-[2px] border-solid border-low-opq-color">
                        <div className="relative leading-[52px] inline-block min-w-[51px] mq450:text-8xl mq450:leading-[31px] mq1050:text-17xl mq1050:leading-[42px]">
                          20
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
                          <div className="w-0.5 h-[42px] relative bg-button" />
                        </div>
                      </div>
                      <div className="self-stretch relative text-xs tracking-[0.4px] leading-[16px] text-schemes-on-surface-variant text-left">
                        Hour
                      </div>
                    </div>
                    <h1 className="m-0 h-[72px] w-6 relative text-38xl leading-[64px] font-normal font-inherit flex items-center justify-center shrink-0 mq450:text-15xl mq450:leading-[38px] mq1050:text-27xl mq1050:leading-[51px]">
                      :
                    </h1>
                    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-3 pl-0 gap-[7px]">
                      <div className="self-stretch rounded-lg bg-schemes-surface-container-highest flex flex-row items-start justify-start py-2.5 px-[22px]">
                        <div className="relative leading-[52px] inline-block min-w-[51px] mq450:text-8xl mq450:leading-[31px] mq1050:text-17xl mq1050:leading-[42px]">
                          00
                        </div>
                      </div>
                      <div className="self-stretch relative text-xs tracking-[0.4px] leading-[16px] text-schemes-on-surface-variant text-left">
                        Minute
                      </div>
                    </div>
                    <div className="rounded-lg bg-schemes-surface-container-high overflow-hidden flex flex-col items-start justify-start text-base text-schemes-on-tertiary-container border-[1px] border-solid border-schemes-outline">
                      <div className="bg-schemes-tertiary-container flex flex-col items-center justify-center border-b-[1px] border-solid border-schemes-outline">
                        <div className="flex flex-row items-center justify-center py-1.5 px-3">
                          <div className="relative tracking-[0.15px] leading-[24px] font-medium inline-block min-w-[27px]">
                            AM
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center text-schemes-on-surface-variant border-t-[1px] border-solid border-schemes-outline">
                        <div className="flex flex-row items-center justify-center py-1.5 px-[13px]">
                          <div className="w-[25px] relative tracking-[0.15px] leading-[24px] font-medium inline-block min-w-[25px]">
                            PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-center justify-between pt-0 pb-5 pr-6 pl-3 gap-[20px] text-sm text-button">
                  <div className="flex flex-col items-center justify-center p-1">
                    <div className="w-10 h-10 rounded-81xl overflow-hidden shrink-0 flex flex-row items-center justify-center">
                      <div className="flex flex-row items-center justify-center p-2">
                        <img
                          className="h-6 w-6 relative"
                          loading="lazy"
                          alt=""
                          src="/icon.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start gap-[8px]">
                    <div className="rounded-81xl overflow-hidden flex flex-col items-center justify-center">
                      <div className="flex flex-row items-center justify-center py-2.5 px-3">
                        <div className="w-11 relative tracking-[0.1px] leading-[20px] font-medium flex items-center justify-center min-w-[44px]">
                          Cancel
                        </div>
                      </div>
                    </div>
                    <div className="rounded-81xl overflow-hidden flex flex-col items-center justify-center">
                      <div className="flex flex-row items-center justify-center py-2.5 px-[11px]">
                        <div className="relative tracking-[0.1px] leading-[20px] font-medium inline-block min-w-[21px]">
                          OK
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.1px]">
            <button className="cursor-pointer [border:none] py-1 pr-0 pl-[58px] bg-button rounded-8xs flex flex-row items-start justify-start gap-[20px]">
              <div className="h-[50px] w-[169px] relative rounded-8xs bg-button hidden" />
              <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0">
                <div className="relative text-lg tracking-[0.04em] font-medium font-body-body1-regular text-black-main-text text-left inline-block min-w-[52px] z-[1]">
                  POST
                </div>
              </div>
              <div className="h-[42px] w-[39px] bg-button overflow-hidden shrink-0 flex flex-col items-center justify-center py-[11px] px-0 box-border z-[2]">
                <img
                  className="w-3.5 h-[8.2px] relative"
                  loading="lazy"
                  alt=""
                  src="/vector.svg"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  className: PropTypes.string,
};

export default PostForm;
