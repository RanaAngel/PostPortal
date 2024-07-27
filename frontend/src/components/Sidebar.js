import { useCallback,useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "antd/dist/reset.css";
import { Dropdown, Menu, Button } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";


const Sidebar = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [buttonState, setButtonState] = useState('Upgrade to PRO');
  
  const onGroupsClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onGroupsClick1 = useCallback(() => {
    navigate("/library");
  }, [navigate]);

  const onGroupsClick2 = useCallback(() => {
    navigate("/create-post");
  }, [navigate]);

  const onGroupsClick3 = useCallback(() => {
    navigate("/post-analytics/:postId");
  }, [navigate]);

  const onGroupsClick4 = useCallback(() => {
    navigate("/channels");
  }, [navigate]);

  const onGroupsClick5 = useCallback(() => {
    navigate("/pricing");
  }, [navigate]);

  const onGroupsClick0 = useCallback(() => {
    navigate("/getting-started");
  }, [navigate]);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(true);
  };

  const handleProfile = () => {
    navigate('/profile'); // Change this to your profile route
  };

  const getUserIdFromToken = (token) => {
    if (!token) {
        console.error('JWT token is missing');
        return null;
    }

    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        const { userId } = JSON.parse(decodedPayload);
        return userId;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
};

const [loading, setLoading] = useState(true); // For handling loading state

useEffect(() => {
  const fetchUserType = async () => {
    const userId = getUserIdFromToken(localStorage.getItem('token'));
    try {
      const response = await fetch(`http://localhost:5000/stripe/verify/${userId}`); // Update with your user endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      if (data.usertype === 'premium') {
        setButtonState('Premium');
      } else {
        setButtonState('Upgrade to PRO');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  fetchUserType();
}, []);
//Session
const [lastActivityTime, setLastActivityTime] = useState(new Date());

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login again.');
    navigate('/login');
  }
}, [navigate]);



  return (
    <div
      className={`self-stretch w-[233px] bg-white box-border overflow-hidden shrink-0 flex flex-col items-end justify-start pt-0 px-0 pb-[70px] gap-[235px] text-left text-lg text-gray-100 font-inter border-r-[1px] border-solid border-gainsboro-200 border-b-[1px] mq1050:flex mq1050:pb-[45px] mq1050:box-border mq450:flex mq450:w-[233px] mq725:w-[233px] mq725:self-stretch mq725:h-auto mq725:pb-[29px] mq725:box-border ${className}`}
    >
      <div className="self-stretch flex flex-col items-end justify-start py-0 pr-0 pl-px gap-[43px]">
        <a  onClick={onGroupsClick0} className="self-stretch text-white bg-white flex flex-row items-start justify-start py-12 px-2.5 cursor-pointer">
          <img
            className="h-[58px] w-[87px] relative object-cover"
            loading="lazy"
            alt=""
            src="/logo@2x.png"
          />
          <div className=" flex-1 flex flex-col items-start justify-start pt-[18px] px-0 pb-0 text-black">
            <div className="self-stretch relative text-[inherit]">
              Post Portal
            </div>
          </div>
        </a>
        <div className="self-stretch flex flex-row items-start justify-end py-0 pr-1 pl-[9px] mq450:items-start mq450:justify-start mq450:pl-px mq450:box-border">
          <div className="flex-1 flex flex-col items-start justify-start pt-0 px-2.5 pb-[23px] gap-[48px] mq450:w-20 mq450:items-start mq450:justify-start">
            <button 
              className={`group cursor-pointer [border:none] py-2.5 px-[39px] bg-[transparent] rounded-mid flex flex-col items-start justify-start ${isActive('/dashboard') ? 'bg-mediumslateblue-300' : 'bg-gray-1300 '} hover:bg-mediumslateblue-300 active:bg-button lg:hover:bg-mediumslateblue-300 mq450:self-stretch mq450:w-auto mq450:pl-7 mq450:box-border mq1050:hover:bg-mediumslateblue-300 mq1000:hover:bg-mediumslateblue-300`}
              onClick={onGroupsClick}
            >
              <a className="flex flex-row items-center justify-start py-0 px-0 gap-[20px]">
              <i className={`fa-solid fa-house text-black group-hover:text-white ${isActive('/dashboard') ? 'text-white' : 'text-black'}`}></i>
                <div className={`text-black group-hover:text-white h-6 relative  text-mini-5 font-body-body1-regular text-dimgray-200 text-left flex items-center min-w-[84px] ${isActive('/dashboard') ? 'text-white' : 'text-black'} `}>
                  Dashboard
                </div>
              </a>
            </button>
            <button
              className={`group cursor-pointer [border:none] py-[11px] px-[37px] bg-[transparent] self-stretch rounded-mid flex flex-col items-start justify-start ${isActive('/library') ? 'bg-mediumslateblue-300' : 'bg-gray-1300'} hover:bg-mediumslateblue-300 lg:hover:bg-mediumslateblue-300 mq450:pl-7 mq450:box-border mq1050:hover:bg-mediumslateblue-300 mq1000:hover:bg-mediumslateblue-300`}
              onClick={onGroupsClick1}
            >
              <div className=" w-[108px] flex flex-row items-center justify-start py-0 pr-[15px] pl-0 box-border gap-[20px]">
              <i className={`fa-solid fa-book text-black group-hover:text-white ${isActive('/library') ? 'text-white' : 'text-black'}`}></i>
                <div className={`text-black group-hover:text-white h-6 relative  text-mini-5 font-body-body1-regular text-dimgray-200 text-left flex items-center min-w-[84px] ${isActive('/library') ? 'text-white' : 'text-black'} `}>
                  Library
                </div>
              </div>
            </button>
            <button
              className={`group cursor-pointer [border:none] py-2.5 px-[39px] bg-[transparent] rounded-mid flex flex-col items-start justify-start ${isActive('/create-post') ? 'bg-mediumslateblue-300' : 'bg-gray-1300'} hover:bg-mediumslateblue-300 lg:hover:bg-mediumslateblue-300 mq450:self-stretch mq450:w-auto mq450:pl-7 mq450:box-border mq1050:hover:bg-mediumslateblue-300 mq1000:hover:bg-mediumslateblue-300`}
              onClick={onGroupsClick2}
            >
              <div className="flex flex-row items-center justify-start py-0 px-0 gap-[20px]">
              <i className={`fa-solid fa-circle-plus text-black group-hover:text-white ${isActive('/create-post') ? 'text-white' : 'text-black'}`}></i>
                <div className={`text-black group-hover:text-white h-6 relative  text-mini-5 font-body-body1-regular text-dimgray-200 text-left flex items-center min-w-[84px] ${isActive('/create-post') ? 'text-white' : 'text-black'} `}>
                  Create Post
                </div>
              </div>
            </button>
            <button
              className={`group cursor-pointer [border:none] py-2.5 pr-[39px] bg-[transparent] pl-10 self-stretch rounded-mid flex flex-col items-start justify-start ${isActive('/post-analytics/:postId') ? 'bg-mediumslateblue-300' : 'bg-gray-1300'} hover:bg-mediumslateblue-300 lg:hover:bg-mediumslateblue-300 mq450:pl-7 mq450:box-border mq1050:hover:bg-mediumslateblue-300 mq1000:hover:bg-mediumslateblue-300`}
              onClick={onGroupsClick3}
            >
              <div className="flex flex-row items-center justify-start gap-[20px]">
              <i className={`fa-solid fa-chart-line text-black group-hover:text-white ${isActive('/post-analytics/:postId') ? 'text-white' : 'text-black'}`}></i>
                <div className={`text-black group-hover:text-white h-6 relative  text-mini-5 font-body-body1-regular text-dimgray-200 text-left flex items-center min-w-[84px] ${isActive('/post-analytics/:postId') ? 'text-white' : 'text-black'} `}>
                  Analytics
                </div>
              </div>
            </button>
            <button
              className={`group cursor-pointer [border:none] py-2.5 pr-[27px] bg-[transparent] pl-10 self-stretch rounded-mid flex flex-col items-start justify-start ${isActive('/channels') ? 'bg-mediumslateblue-300' : 'bg-gray-1300'} hover:bg-mediumslateblue-300 lg:hover:bg-mediumslateblue-300 mq450:items-start mq450:justify-start mq450:pl-7 mq450:box-border mq1050:hover:bg-mediumslateblue-300 mq1000:hover:bg-mediumslateblue-300`}
              onClick={onGroupsClick4}
            >
              <div className="flex flex-row items-center justify-start gap-[20px]">
              <i className={`fa-solid fa-photo-film text-black group-hover:text-white ${isActive('/channels') ? 'text-white' : 'text-black'}`}></i>
                <div className={`text-black group-hover:text-white h-6 relative  text-mini-5 font-body-body1-regular text-dimgray-200 text-left flex items-center min-w-[84px] ${isActive('/channels') ? 'text-white' : 'text-black'} `}>
                  Channels
                </div>
              </div>
            </button>
            <div className="self-stretch rounded-mid bg-gray-1300 hidden flex-col items-start justify-start py-2.5 px-[35px] mq450:flex mq450:pl-7 mq450:box-border mq725:flex mq1000:hidden">
              
              <div className="flex flex-row items-center justify-start py-1 pr-1.5 pl-0 gap-[12px]">
              <img
              className="h-10 w-10 relative overflow-hidden shrink-0"
              alt=""
              src="/mingcuteuser4Line.svg"
            />
                
                <Dropdown
                  className="h-[18px]"
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
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-end py-0 pr-9 pl-[37px] mq450:items-start mq450:justify-start mq450:pl-[11px] mq450:box-border">
    <button
        onClick={buttonState !== 'Premium' ? onGroupsClick5 : null}
        className={`cursor-pointer [border:none] py-2 px-1 ${buttonState === 'Premium' ? 'bg-green-500 pointer-events-none' : 'bg-sandybrown'} flex-1 rounded-xl flex flex-row items-start justify-start whitespace-nowrap hover:bg-chocolate mq450:items-start mq450:justify-start mq450:pl-[5px] mq450:pr-px mq450:box-border`}
    >
        <div className="flex-1 relative text-base leading-[24px] font-m3-label-large text-gray-1200 text-center">
            {buttonState}
        </div>
    </button>
</div>

    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;