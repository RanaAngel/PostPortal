import PropTypes from "prop-types";

const FilterContent = ({ className = "" }) => {
  return (
    <div
      className={`w-[1448px] flex flex-col items-start justify-start gap-[44.9px] max-w-full text-left text-xl text-black-main-background font-body-body1-regular mq750:gap-[22px] ${className}`}
    >
      <div className="w-[283px] flex flex-row items-start justify-start py-0 px-[35px] box-border">
        <a className="[text-decoration:none] flex-1 relative tracking-[0.04em] font-medium text-[inherit] mq450:text-base">
          View All Posts
        </a>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-[27.7px] max-w-full text-base text-gray-900 lg:flex-wrap">
        <div className="flex-1 flex flex-col items-start justify-start gap-[69px] min-w-[512px] max-w-full mq450:gap-[17px] mq750:min-w-full mq1050:gap-[34px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[37.3px] max-w-full mq450:gap-[19px]">
            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full">
              <div className="flex-1 flex flex-row items-start justify-start gap-[77.1px] max-w-full mq450:gap-[19px] mq750:flex-wrap mq1050:gap-[39px]">
                <div className="flex-1 flex flex-row items-start justify-between pt-[16.6px] pb-[13.7px] pr-[30px] pl-[43px] box-border relative max-w-full gap-[20px] mq450:flex-wrap mq750:pl-[21px] mq750:box-border">
                  <input
                    className="w-[256.4px] [border:none] [outline:none] bg-[transparent] h-[29px] flex flex-col items-start justify-start pt-[2.8px] px-0 pb-0 box-border font-body-body1-regular font-medium text-base text-gray-800"
                    placeholder="Search By Post Name"
                    type="text"
                  />
                  <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl bg-lightslategray-200 z-[1]" />
                  <img
                    className="h-[34.5px] w-[36.4px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/quillsearch.svg"
                  />
                </div>
                <div className="w-[199.6px] flex flex-col items-start justify-start pt-[19.3px] px-0 pb-0 box-border">
                  <div className="self-stretch h-[26.2px] relative tracking-[0.04em] font-medium inline-block shrink-0">
                    Search by Media
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[725.5px] flex flex-row items-start justify-between gap-[20px] max-w-full mq750:flex-wrap">
              <div className="w-[304.5px] rounded-xl flex flex-col items-end justify-start pt-[13.8px] px-0 pb-0 box-border gap-[56.6px] bg-[url('/public/rectangle-108@2x.png')] bg-cover bg-no-repeat bg-[top] mq450:gap-[28px]">
                <img
                  className="self-stretch h-[284px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover hidden"
                  alt=""
                  src="/rectangle-108@2x.png"
                />
                <div className="flex flex-row items-start justify-end py-0 px-3.5">
                  <div className="flex flex-col items-start justify-start gap-[6.9px]">
                    <div className="w-[39.3px] h-[42.7px] relative rounded-8xs bg-brown box-border shrink-0 z-[1] border-[1px] border-solid border-indianred">
                      <div className="absolute top-[0px] left-[0px] rounded-8xs bg-brown box-border w-full h-full hidden border-[1px] border-solid border-indianred" />
                      <img
                        className="absolute top-[12.8px] left-[11.5px] w-[16.2px] h-[17.1px] overflow-hidden z-[1]"
                        loading="lazy"
                        alt=""
                        src="/materialsymbolslightdeleteoutline.svg"
                      />
                    </div>
                    <img
                      className="w-[39.3px] h-[42.7px] relative shrink-0 z-[1]"
                      loading="lazy"
                      alt=""
                      src="/group-91.svg"
                    />
                  </div>
                </div>
                <textarea
                  className="[border:none] bg-whitesmoke-200 h-[121.3px] w-auto [outline:none] self-stretch rounded-xl flex flex-col items-start justify-start pt-[26.2px] px-[18px] pb-[26px] box-border font-body-body1-regular font-medium text-xs text-gray-900 z-[1]"
                  placeholder="International c.."
                  rows={6}
                  cols={15}
                />
              </div>
              <div className="w-[304.5px] rounded-xl flex flex-col items-end justify-start pt-[13.8px] px-0 pb-0 box-border gap-[56.6px] bg-[url('/public/rectangle-1081@2x.png')] bg-cover bg-no-repeat bg-[top] mq450:gap-[28px]">
                <img
                  className="self-stretch h-[284px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover hidden"
                  alt=""
                  src="/rectangle-1081@2x.png"
                />
                <div className="flex flex-row items-start justify-end py-0 px-3.5">
                  <div className="flex flex-col items-start justify-start gap-[6.9px]">
                    <div className="w-[39.3px] h-[42.7px] relative rounded-8xs bg-brown box-border shrink-0 z-[1] border-[1px] border-solid border-indianred">
                      <div className="absolute top-[0px] left-[0px] rounded-8xs bg-brown box-border w-full h-full hidden border-[1px] border-solid border-indianred" />
                      <img
                        className="absolute top-[12.8px] left-[11.5px] w-[16.2px] h-[17.1px] overflow-hidden z-[1]"
                        alt=""
                        src="/materialsymbolslightdeleteoutline-1.svg"
                      />
                    </div>
                    <img
                      className="w-[39.3px] h-[42.7px] relative shrink-0 z-[1]"
                      alt=""
                      src="/group-91-1.svg"
                    />
                  </div>
                </div>
                <textarea
                  className="[border:none] bg-whitesmoke-200 h-[121.3px] w-auto [outline:none] self-stretch rounded-xl flex flex-col items-start justify-start pt-[26.2px] px-[18px] pb-[26px] box-border font-body-body1-regular font-medium text-xs text-gray-900 z-[1]"
                  placeholder="International c.."
                  rows={6}
                  cols={15}
                />
              </div>
            </div>
          </div>
          <div className="w-[733.5px] flex flex-row items-start justify-start py-0 px-px box-border max-w-full">
            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq750:flex-wrap">
              <div className="w-[304.5px] rounded-xl flex flex-col items-end justify-start pt-[13.7px] px-0 pb-0 box-border gap-[56.6px] bg-[url('/public/rectangle-1082@2x.png')] bg-cover bg-no-repeat bg-[top] mq450:gap-[28px]">
                <img
                  className="self-stretch h-[284px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover hidden"
                  alt=""
                  src="/rectangle-1082@2x.png"
                />
                <div className="flex flex-row items-start justify-end py-0 px-3.5">
                  <div className="flex flex-col items-start justify-start gap-[7px]">
                    <div className="w-[39.3px] h-[42.7px] relative rounded-8xs bg-brown box-border shrink-0 z-[1] border-[1px] border-solid border-indianred">
                      <div className="absolute top-[0px] left-[0px] rounded-8xs bg-brown box-border w-full h-full hidden border-[1px] border-solid border-indianred" />
                      <img
                        className="absolute top-[12.9px] left-[11.6px] w-[16.2px] h-[17.1px] overflow-hidden z-[1]"
                        alt=""
                        src="/materialsymbolslightdeleteoutline-1.svg"
                      />
                    </div>
                    <img
                      className="w-[39.3px] h-[42.7px] relative shrink-0 z-[1]"
                      alt=""
                      src="/group-91-1.svg"
                    />
                  </div>
                </div>
                <textarea
                  className="[border:none] bg-whitesmoke-200 h-[121.3px] w-auto [outline:none] self-stretch rounded-xl flex flex-col items-start justify-start pt-[26.2px] px-[18px] pb-[26px] box-border font-body-body1-regular font-medium text-xs text-gray-900 z-[1]"
                  placeholder="International c.."
                  rows={6}
                  cols={15}
                />
              </div>
              <div className="w-[304.5px] flex flex-col items-start justify-start pt-3 px-0 pb-0 box-border">
                <div className="self-stretch rounded-xl flex flex-col items-end justify-start pt-[13.8px] px-0 pb-0 gap-[56.6px] bg-[url('/public/rectangle-1083@2x.png')] bg-cover bg-no-repeat bg-[top] mq450:gap-[28px]">
                  <img
                    className="self-stretch h-[284px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover hidden"
                    alt=""
                    src="/rectangle-1083@2x.png"
                  />
                  <div className="flex flex-row items-start justify-end py-0 px-3.5">
                    <div className="flex flex-col items-start justify-start gap-[6.9px]">
                      <div className="w-[39.3px] h-[42.7px] relative rounded-8xs bg-brown box-border shrink-0 z-[1] border-[1px] border-solid border-indianred">
                        <div className="absolute top-[0px] left-[0px] rounded-8xs bg-brown box-border w-full h-full hidden border-[1px] border-solid border-indianred" />
                        <img
                          className="absolute top-[12.8px] left-[11.5px] w-[16.2px] h-[17.1px] overflow-hidden z-[1]"
                          alt=""
                          src="/materialsymbolslightdeleteoutline-1.svg"
                        />
                      </div>
                      <img
                        className="w-[39.3px] h-[42.7px] relative shrink-0 z-[1]"
                        alt=""
                        src="/group-91-1.svg"
                      />
                    </div>
                  </div>
                  <textarea
                    className="[border:none] bg-whitesmoke-200 h-[121.3px] w-auto [outline:none] self-stretch rounded-xl flex flex-col items-start justify-start pt-[26.2px] px-[18px] pb-[26px] box-border font-body-body1-regular font-medium text-xs text-gray-900 z-[1]"
                    placeholder="International c.."
                    rows={6}
                    cols={15}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[632.2px] flex flex-col items-start justify-start pt-[8.3px] px-0 pb-0 box-border min-w-[632.2px] max-w-full lg:flex-1 mq750:min-w-full">
          <div className="self-stretch flex flex-row items-end justify-between max-w-full gap-[20px]">
            <div className="w-[486.5px] flex flex-col items-start justify-start gap-[46.9px] max-w-[calc(100%_-_36px)] mq750:gap-[23px]">
              <div className="self-stretch flex flex-row items-start justify-start gap-[30.5px] mq450:flex-wrap mq750:gap-[15px]">
                <div className="flex-1 flex flex-row items-start justify-start py-0 pr-[7px] pl-0 box-border gap-[24.7px] min-w-[142px]">
                  <button className="cursor-pointer [border:none] pt-[11.1px] px-[42px] pb-[12.4px] bg-button flex-1 rounded-xl flex flex-row items-start justify-start hover:bg-mediumslateblue-100">
                    <div className="h-[46.9px] w-[112.2px] relative rounded-xl bg-button hidden" />
                    <div className="h-[23.4px] flex-1 relative text-sm tracking-[0.04em] font-medium font-body-body1-regular text-black-main-background text-left inline-block z-[1]">
                      All
                    </div>
                  </button>
                  <div className="w-[74.3px] flex flex-col items-start justify-start pt-[11.1px] px-0 pb-0 box-border">
                    <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch h-[23.4px] relative text-sm tracking-[0.04em] font-medium font-body-body1-regular text-black-main-background text-left inline-block shrink-0">
                      Twitter
                    </button>
                  </div>
                </div>
                <div className="w-[102px] flex flex-col items-start justify-start pt-[11.1px] px-0 pb-0 box-border">
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch h-[23.4px] relative text-sm tracking-[0.04em] font-medium font-body-body1-regular text-black-main-background text-left inline-block shrink-0">
                    Facebook
                  </button>
                </div>
                <div className="w-[104.9px] flex flex-col items-start justify-start pt-[11.1px] px-0 pb-0 box-border">
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch h-[23.4px] relative text-sm tracking-[0.04em] font-medium font-body-body1-regular text-black-main-background text-left inline-block shrink-0">
                    Instagram
                  </button>
                </div>
              </div>
              <div className="w-[388.7px] flex flex-row items-start justify-start py-0 px-[42px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="flex-1 flex flex-col items-start justify-start gap-[69px] mq450:gap-[34px]">
                  <div className="self-stretch rounded-xl flex flex-col items-end justify-start pt-[13.8px] px-0 pb-0 gap-[56.6px] bg-[url('/public/rectangle-1084@2x.png')] bg-cover bg-no-repeat bg-[top] mq450:gap-[28px]">
                    <img
                      className="self-stretch h-[284px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover hidden"
                      alt=""
                      src="/rectangle-1084@2x.png"
                    />
                    <div className="flex flex-row items-start justify-end py-0 px-3.5">
                      <div className="flex flex-col items-start justify-start gap-[6.9px]">
                        <div className="w-[39.3px] h-[42.7px] relative rounded-8xs bg-brown box-border shrink-0 z-[1] border-[1px] border-solid border-indianred">
                          <div className="absolute top-[0px] left-[0px] rounded-8xs bg-brown box-border w-full h-full hidden border-[1px] border-solid border-indianred" />
                          <img
                            className="absolute top-[12.8px] left-[11.5px] w-[16.2px] h-[17.1px] overflow-hidden z-[1]"
                            alt=""
                            src="/materialsymbolslightdeleteoutline-1.svg"
                          />
                        </div>
                        <img
                          className="w-[39.3px] h-[42.7px] relative shrink-0 z-[1]"
                          alt=""
                          src="/group-91-1.svg"
                        />
                      </div>
                    </div>
                    <textarea
                      className="[border:none] bg-whitesmoke-200 h-[121.3px] w-auto [outline:none] self-stretch rounded-xl flex flex-col items-start justify-start pt-[26.2px] px-[19px] pb-[26px] box-border font-body-body1-regular font-medium text-xs text-gray-900 z-[1]"
                      placeholder="International c.."
                      rows={6}
                      cols={15}
                    />
                  </div>
                  <div className="self-stretch rounded-xl flex flex-col items-end justify-start pt-[13.8px] px-0 pb-0 gap-[56.6px] bg-[url('/public/rectangle-1083@2x.png')] bg-cover bg-no-repeat bg-[top] mq450:gap-[28px]">
                    <img
                      className="self-stretch h-[284px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover hidden"
                      alt=""
                      src="/rectangle-1083@2x.png"
                    />
                    <div className="flex flex-row items-start justify-end py-0 px-3.5">
                      <div className="flex flex-col items-start justify-start gap-[6.9px]">
                        <div className="w-[39.3px] h-[42.7px] relative rounded-8xs bg-brown box-border shrink-0 z-[1] border-[1px] border-solid border-indianred">
                          <div className="absolute top-[0px] left-[0px] rounded-8xs bg-brown box-border w-full h-full hidden border-[1px] border-solid border-indianred" />
                          <img
                            className="absolute top-[12.8px] left-[11.5px] w-[16.2px] h-[17.1px] overflow-hidden z-[1]"
                            alt=""
                            src="/materialsymbolslightdeleteoutline-1.svg"
                          />
                        </div>
                        <img
                          className="w-[39.3px] h-[42.7px] relative shrink-0 z-[1]"
                          alt=""
                          src="/group-91-1.svg"
                        />
                      </div>
                    </div>
                    <textarea
                      className="[border:none] bg-whitesmoke-200 h-[121.3px] w-auto [outline:none] self-stretch rounded-xl flex flex-col items-start justify-start pt-[26.2px] px-[18px] pb-[26px] box-border font-body-body1-regular font-medium text-xs text-gray-900 z-[1]"
                      placeholder="International c.."
                      rows={6}
                      cols={15}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[26.2px]">
              <div className="w-4 h-[637px] relative rounded-xl bg-lightgray-100">
                <div className="absolute top-[0px] left-[0px] rounded-xl bg-lightgray-100 w-full h-full hidden" />
                <div className="absolute top-[559.8px] left-[0px] rounded-xl bg-linen w-4 h-[31.9px] z-[1]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FilterContent.propTypes = {
  className: PropTypes.string,
};

export default FilterContent;
