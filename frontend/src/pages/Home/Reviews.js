import PropTypes from "prop-types";
const Reviews = ({ className = "" }) => {
    return (
      <section
        className={`self-stretch flex flex-col items-start justify-start gap-[1px] max-w-full text-left text-xl text-black-sub-text font-inter ${className}`}
      >
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 px-24 box-border max-w-full mq900:pl-6 mq900:pr-6 mq900:box-border mq450:pl-6 mq450:pr-6 mq450:box-border mq1350:pl-12 mq1350:pr-12 mq1350:box-border mq1300:pl-12 mq1300:pr-12 mq1300:box-border">
          <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-[6.3px] box-border gap-[6.7px] max-w-full">
            <div className="w-[597.1px] relative font-medium inline-block max-w-full mq450:text-base">
              WHAT DO OUR CLIENTS SAY
            </div>
            <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black-main-text" />
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 px-[100px] box-border max-w-full text-lg text-white mq900:pl-[25px] mq900:pr-[25px] mq900:box-border mq450:pl-[25px] mq450:pr-[25px] mq450:box-border mq1350:pl-[50px] mq1350:pr-[50px] mq1350:box-border mq1300:pl-[50px] mq1300:pr-[50px] mq1300:box-border">
          <div className="flex-1 overflow-x-auto flex flex-row items-end justify-start gap-[18px] max-w-full">
            <div className="h-[469px] w-[360px] relative shrink-0 [debug_commit:bf4bc93] max-w-full">
              <div className="absolute top-[30px] left-[0px] rounded-11xl bg-gray-200 w-[360px] h-[439px]" />
              <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start py-[86px] px-[63px] box-border gap-[21px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5">
                  <img
                    className="h-[70px] w-[70px] relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt=""
                    src="/ellipse-13@2x.png"
                  />
                </div>
                <div className="flex flex-row items-start justify-start py-0 pr-[67px] pl-[66px]">
                  <div className="relative font-semibold inline-block min-w-[100px]">
                    Bina Lawati
                  </div>
                </div>
                <div className="self-stretch relative text-base font-medium text-black-sub-text text-justify">
                  Using their services has been life changing. we can easily
                  manage our contents now without having to face any challenges
                  related to content distribution among the social medias.
                </div>
              </div>
            </div>
            <div className="h-[459px] w-[360px] relative shrink-0 [debug_commit:bf4bc93] max-w-full">
              <div className="absolute top-[20px] left-[0px] rounded-11xl bg-gray-200 w-[360px] h-[439px]" />
              <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start py-[114.5px] px-[58px] box-border gap-[21px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                  <img
                    className="h-[70px] w-[70px] relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt=""
                    src="/ellipse-13-1@2x.png"
                  />
                </div>
                <div className="flex flex-row items-start justify-start py-0 px-[68px]">
                  <div className="relative font-semibold inline-block min-w-[107px]">
                    Krishna Rijal
                  </div>
                </div>
                <div className="self-stretch relative text-base font-medium text-black-sub-text text-justify">{`Well let’s just say their software is worth it. Made our work a lot more easier and is definitely reliable too. `}</div>
              </div>
            </div>
            <div className="h-[469px] w-[360px] relative shrink-0 [debug_commit:bf4bc93] max-w-full">
              <div className="absolute top-[30px] left-[0px] rounded-11xl bg-gray-200 w-[360px] h-[439px]" />
              <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start pt-[57.5px] px-16 pb-[54.5px] box-border gap-[21px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                  <img
                    className="h-[70px] w-[70px] relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt=""
                    src="/ellipse-13-2@2x.png"
                  />
                </div>
                <div className="flex flex-row items-start justify-start py-0 px-[37px]">
                  <div className="relative font-semibold">Roshan Nyeupane</div>
                </div>
                <div className="self-stretch relative text-base font-medium text-black-sub-text text-justify">{`Managing posts was a huge hassle in the past but since using their product it has been an easy work. Also the metrics widgets is a great addition to the software and has helped to track customer engagement swiftly showing real time data. Dami xa la! the Best! `}</div>
              </div>
            </div>
            <div className="h-[469px] w-[360px] relative shrink-0 [debug_commit:bf4bc93] max-w-full">
              <div className="absolute top-[30px] left-[0px] rounded-11xl bg-gray-200 w-[360px] h-[439px]" />
              <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start py-[86px] px-[63px] box-border gap-[21px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5">
                  <img
                    className="h-[70px] w-[70px] relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt=""
                    src="/ellipse-131@2x.png"
                  />
                </div>
                <div className="flex flex-row items-start justify-start py-0 pr-[67px] pl-[66px]">
                  <div className="relative font-semibold inline-block min-w-[100px]">
                    Bina Lawati
                  </div>
                </div>
                <div className="self-stretch relative text-base font-medium text-black-sub-text text-justify">
                  Using their services has been life changing. we can easily
                  manage our contents now without having to face any challenges
                  related to content distribution among the social medias.
                </div>
              </div>
            </div>
            <div className="h-[459px] w-[360px] relative shrink-0 [debug_commit:bf4bc93] max-w-full">
              <div className="absolute top-[20px] left-[0px] rounded-11xl bg-gray-200 w-[360px] h-[439px]" />
              <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start py-[114.5px] px-[58px] box-border gap-[21px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                  <img
                    className="h-[70px] w-[70px] relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt=""
                    src="/ellipse-13-4@2x.png"
                  />
                </div>
                <div className="flex flex-row items-start justify-start py-0 px-[68px]">
                  <div className="self-stretch flex-1 relative font-semibold inline-block min-w-[107px]">
                    Krishna Rijal
                  </div>
                </div>
                <div className="self-stretch relative text-base font-medium text-black-sub-text text-justify">{`Well let’s just say their software is worth it. Made our work a lot more easier and is definitely reliable too. `}</div>
              </div>
            </div>
            <div className="h-[469px] w-[360px] relative shrink-0 [debug_commit:bf4bc93] max-w-full">
              <div className="absolute top-[30px] left-[0px] rounded-11xl bg-gray-200 w-[360px] h-[439px]" />
              <div className="absolute top-[0px] left-[0px] w-full flex flex-col items-start justify-start pt-[57.5px] px-16 pb-[54.5px] box-border gap-[21px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border">
                <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                  <img
                    className="h-[70px] w-[70px] relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt=""
                    src="/ellipse-13-2@2x.png"
                  />
                </div>
                <div className="self-stretch h-[22px] flex flex-row items-start justify-start py-0 px-[37px] box-border">
                  <div className="self-stretch flex-1 relative font-semibold">
                    Roshan Nyeupane
                  </div>
                </div>
                <div className="self-stretch relative text-base font-medium text-black-sub-text text-justify">{`Managing posts was a huge hassle in the past but since using their product it has been an easy work. Also the metrics widgets is a great addition to the software and has helped to track customer engagement swiftly showing real time data. Dami xa la! the Best! `}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
Reviews.propTypes = {
    className: PropTypes.string,
  };
  
  export default Reviews;