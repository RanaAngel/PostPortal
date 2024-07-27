import { useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
      case "/post-analytics/:postId":
        return "Analytics";
      case "/channels":
        return "Channels";
        case "/pricing":
        return "Pricing";
        case "/post":
        return "ViewPost";
        case "/profile":
        return "Profile";
        case "/getting-started":
        return "Get Started";
      default:
        return "";
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Display a success message
    toast.success('You have been logged out successfully.');

    // Redirect after a short delay to allow the toast to be visible
    setTimeout(() => {
      navigate("/");
    }, 800);
    
};
  const handleProfile = () => {
    navigate('/profile'); // Change this to your profile route
  };

  return (
    <header
      className={`self-stretch bg-color box-border flex flex-row items-start justify-end pt-2.5 px-0 pb-2 top-[0] z-[99] max-w-full text-left text-xl font-poppins border-b-[2px] border-solid border-gainsboro-100 mq1050:max-w-[800] mq1000:max-w-[750] ${className}`}
    > <ToastContainer
    style={{ fontSize: '1rem' }} // Adjust the font size as needed
/>
      <div className="w-full flex flex-row items-center justify-between py-0 pr-20 pl-5 box-border gap-[2px] min-w-1/2">
        <div className="flex flex-row items-center justify-start py-2.5 px-0">
          <a className="[text-decoration:none] relative leading-[42px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] whitespace-nowrap">
            {getTitle()}
          </a>
        </div>
        <div className="flex space-x-4">
          <img
            className="h-full w-full rounded-full"
            alt=""
            src="/mingcuteuser4Line.svg"
          />
          <Dropdown
            overlay={
              <Menu className="w-full">
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
            <Button onClick={(e) => e.preventDefault()} className="text-black min-w-full">
              User <DownOutlined />
            </Button>
          </Dropdown>
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