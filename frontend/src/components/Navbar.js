import { useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ className = "", mingcuteuser4Line }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/library":
        return "Library";
      case "/create-post":
        return "Create Post";
      case "/analytics":
        return "Analytics";
      case "/channels":
        return "Channels";
        case "/pricing":
        return "Pricing";
      default:
        return "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(true);
  };

  const handleProfile = () => {
    navigate('/profile'); // Change this to your profile route
  };

  return (
    <header
      className={`self-stretch bg-color box-border flex flex-row items-start justify-end pt-2.5 px-0 pb-2 sticky top-[0] z-[99] max-w-full text-left text-xl font-poppins border-b-[1px] border-solid border-gainsboro-100 mq1050:max-w-[800] mq1000:max-w-[750] ${className}`}
    >
      <div className="w-[1632px] flex flex-row items-center justify-between py-0 pr-1.5 pl-5 box-border gap-[20px] max-w-full">
        <div className="flex flex-row items-center justify-start py-2.5 px-0">
          <a className="[text-decoration:none] relative leading-[42px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] whitespace-nowrap">
            {getTitle()}
          </a>
        </div>
        <div className="w-[132px] flex flex-row items-start justify-start py-6 pr-3.5 pl-0 box-border mq450:hidden">
          <div className="flex-1 flex flex-row items-center justify-start py-px pr-0.5 pl-0 gap-[12px]">
            <img
              className="h-10 w-10 relative overflow-hidden shrink-0"
              alt=""
              src="/mingcuteuser4Line.svg"
            />
            <Dropdown
              className="h-6 flex-1"
              overlay={
                <Menu>
                  {[{ value: "Profile", action: handleProfile }, { value: "Logout", action: handleLogout }].map(
                    (option, index) => (
                      <Menu.Item key={index}>
                        <a onClick={(e) => {
                          e.preventDefault();
                          option.action();
                        }}>
                          {option.value || ""}
                        </a>
                      </Menu.Item>
                    )
                  )}
                </Menu>
              }
              trigger={["click"]}
            >
              <Button onClick={(e) => e.preventDefault()}>
                {`User `}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
  mingcuteuser4Line: PropTypes.string,
};

export default Navbar;
