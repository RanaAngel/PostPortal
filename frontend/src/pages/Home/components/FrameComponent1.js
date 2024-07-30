import GroupComponent from "./GroupComponent";
import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section
      className={`w-[1685px] flex flex-row items-start justify-start pt-0 px-[3px] pb-[86px] box-border max-w-full text-left text-lg text-gray-100 font-body-body1-regular mq900:pb-14 mq900:box-border ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[17px] max-w-full">
        <div className="flex flex-row items-start justify-start py-0 px-0.5">
          <div className="relative font-medium">WHAT DO OUR CLIENTS SAY</div>
        </div>
        <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black" />
        <div className="flex flex-row items-start justify-start py-0 pr-0 pl-[13px] box-border max-w-full text-gray-300">
          <div className="w-[1666px] overflow-x-auto overflow-y-hidden scrollbar-hide shrink-0 flex flex-row items-end justify-start gap-[18px] max-w-full">
            <GroupComponent
              testimonialCardAvatarImag="/ellipse-13@2x.png"
              binaLawati="Bina Lawati"
              usingTheirServicesHasBeen="Using their services has been life changing. we can easily manage our contents now without having to face any challenges related to content distribution among the social medias."
            />
            <GroupComponent
              testimonialCardAvatarImag="/ellipse-13-1@2x.png"
              binaLawati="Krishna Rijal"
              usingTheirServicesHasBeen="Well let’s just say their software is worth it. a our work a lot more easier and is definitely reliable too. "
              propHeight="459px"
            />
            <GroupComponent
              testimonialCardAvatarImag="/ellipse-13-2@2x.png"
              binaLawati="Roshan Nyeupane"
              usingTheirServicesHasBeen="Managing posts was a huge hassle in the past but since using their product it has been an easy work. Also the metrics widgets is a great addition to the software and has helped to track customer engagement swiftly showing real time data. Dami xa la! the Best! "
              propHeight="469px"
            />
            <GroupComponent
              testimonialCardAvatarImag="/ellipse-13@2x.png"
              binaLawati="Bina Lawati"
              usingTheirServicesHasBeen="Using their services has been life changing. we can easily manage our contents now without having to face any challenges related to content distribution among the social medias."
              propHeight="469px"
            />
            <GroupComponent
              testimonialCardAvatarImag="/ellipse-13-1@2x.png"
              binaLawati="Krishna Rijal"
              usingTheirServicesHasBeen="Well let’s just say their software is worth it. a our work a lot more easier and is definitely reliable too. "
              propHeight="459px"
            />
            <GroupComponent
              testimonialCardAvatarImag="/ellipse-13-2@2x.png"
              binaLawati="Roshan Nyeupane"
              usingTheirServicesHasBeen="Managing posts was a huge hassle in the past but since using their product it has been an easy work. Also the metrics widgets is a great addition to the software and has helped to track customer engagement swiftly showing real time data. Dami xa la! the Best! "
              propHeight="469px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;