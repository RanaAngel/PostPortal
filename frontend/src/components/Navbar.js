import PropTypes from "prop-types";

const Navbar = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-white box-border flex flex-row items-start justify-end pt-2.5 px-1.5 pb-2 shrink-0 sticky top-[0] z-[99] max-w-full text-left text-13xl font-poppins border-b-[1px] border-solid border-gainsboro-100 mq1050:max-w-[800] mq1000:max-w-[750] ${className}`}
    >
      <div className="w-[1632px] flex flex-row items-center justify-between py-0 pr-0 pl-5 box-border gap-[20px] max-w-full">
        <div className="flex flex-row items-center justify-start py-2.5 pr-[33px] pl-0">
          <h1 className="m-0 relative text-inherit leading-[42px] font-medium font-inherit text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] whitespace-nowrap">
            Getting Started
          </h1>
        </div>
        <div className="flex flex-row items-start justify-start py-6 pr-3.5 pl-0 text-base mq450:hidden">
          <div className="flex flex-row items-center justify-start py-px pr-0.5 pl-0 gap-[12px]">
            <img
              className="h-10 w-10 relative overflow-hidden shrink-0"
              alt=""
              src="/mingcuteuser4line-2.svg"
            />
            <div className="overflow-hidden flex flex-row items-center justify-start gap-[4px]">
              <a className="[text-decoration:none] relative leading-[24px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[36px]">
                User
              </a>
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                alt=""
                src="/user-options.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;
