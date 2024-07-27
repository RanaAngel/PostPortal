// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import UserAltFillIcon from '../components/UserAltFillIcon';




const AdminDashboard = () => {
  const navigate = useNavigate();
  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [totalUsers, setTotalUsers] = useState(null);
  const [freeUsersCount, setFreeUsersCount] = useState(null);
  const [premiumUsersCount, setPremiumUsersCount] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login again.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('http://44.207.233.50:5000/dashboard/total-users');
        const data = await response.json();
        setTotalUsers(data.totalUsers);
         // Fetch free users excluding admins
         const freeResponse = await fetch('http://44.207.233.50:5000/dashboard/free-users');
         const freeData = await freeResponse.json();
         setFreeUsersCount(freeData.freeUsersCount);

         const premiumResponse = await fetch('http://44.207.233.50:5000/dashboard/premium-users');
         const premiumData = await premiumResponse.json();
         setPremiumUsersCount(premiumData.premiumUsersCount);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };
    

    fetchTotalUsers();
  }, []);

  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <AdminSidebar />
    <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
        <AdminNavbar
            gettingStarted="Getting Started"
            mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch flex flex-row items-start justify-start py-0 pr-[67px] pl-[60px] box-border max-w-full text-center text-5xl text-color font-inter mq1250:pl-[30px] mq1250:pr-[33px] mq1250:box-border">
          <div className="flex-1 flex flex-col items-start justify-start gap-[106px] max-w-full mq450:gap-[26px] mq825:gap-[53px]">
            <div className="flex flex-row items-start justify-center gap-[38px] max-w-full mq825:gap-[19px] mq1575:flex-wrap">
              <div className="rounded-3xs bg-button flex flex-row items-start justify-start py-[26.5px] px-7 box-border max-w-full">
                <div className="h-[172px] flex flex-row items-end justify-start pt-0 pb-[34px] pr-[18px] pl-0 box-border gap-[12px]">
                  <UserAltFillIcon />
                  <div className="w-[99px] flex flex-col items-start justify-start gap-[5.5px]">
      <h2 className="m-0 self-stretch relative text-inherit font-semibold font-inherit mq450:text-lg">
        Total Users
      </h2>
      <div className="flex flex-row items-start justify-start py-0 pr-[41px] pl-10 text-left text-8xl">
        <div className="relative font-semibold inline-block min-w-[18px] mq450:text-3xl">
          {totalUsers !== null ? totalUsers : 'Loading...'}
        </div>
      </div>
    </div>
                </div>
              </div>
              <div
      className={`rounded-3xs bg-button flex flex-row items-start justify-start py-[26.5px] px-7 box-border max-w-full text-left text-5xl text-color font-inter`}
    >
      <div className="flex flex-row items-end justify-start py-0 pr-2 pl-0 gap-[21px] mq450:flex-wrap">
        <img
          className="h-[172px] w-[175px] relative mq450:flex-1"
          loading="lazy"
          alt=""
          src="user.svg"
        />
        <div className="w-[88px] flex flex-col items-start justify-end pt-0 px-0 pb-7 box-border min-w-[88px] mq450:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start gap-[21.5px]">
            <h2 className="m-0 self-stretch relative text-inherit font-semibold font-inherit mq450:text-lgi">
              Active Users
            </h2>
            <div className="flex flex-row items-start justify-start py-0 pr-[41px] pl-10 text-left text-8xl">
        <div className="relative font-semibold inline-block min-w-[18px] mq450:text-3xl">
          {totalUsers !== null ? totalUsers : 'Loading...'}
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
              
              <div
      className={`rounded-3xs bg-button flex flex-row items-start justify-start py-[26.5px] px-7 box-border max-w-full text-left text-5xl text-color font-inter`}
    >
      <div className="flex flex-row items-end justify-start py-0 pr-2 pl-0 gap-[21px] mq450:flex-wrap">
        <img
          className="h-[172px] w-[175px] relative mq450:flex-1"
          loading="lazy"
          alt=""
          src="/user-cicrle-duotone@2x.png"
        />
        <div className="w-[88px] flex flex-col items-start justify-end pt-0 px-0 pb-7 box-border min-w-[88px] mq450:flex-1">
          <div className="self-stretch flex flex-col items-start justify-start gap-[21.5px]">
            <h2 className="m-0 self-stretch relative text-inherit font-semibold font-inherit mq450:text-lgi">
              Free Users
            </h2>
            <div className="flex flex-row items-start justify-start py-0 px-[19px] text-8xl">
            <div className="relative font-semibold inline-block min-w-[18px] mq450:text-3xl">
              {freeUsersCount}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
              <div className="rounded-3xs bg-button flex flex-row items-start justify-start py-[26.5px] px-7 box-border max-w-full">
                <div className="h-[172px] flex flex-row items-start justify-start pt-0 px-0 pb-[34px] box-border gap-[9px]">
                  <img
                    className="h-[184px] w-[166px] relative"
                    loading="lazy"
                    alt=""
                    src="/user-fill.svg"
                  />
                  <div className="w-[116px] flex flex-col items-start justify-start pt-[31.5px] px-0 pb-0 box-border">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[15.5px]">
                      <h2 className="m-0 self-stretch relative text-inherit font-semibold font-inherit mq450:text-lgi">
                        Premiums Users
                      </h2>
                      <div className="flex flex-row items-start justify-start py-0 px-10 text-left text-8xl">
                        <div className="relative font-semibold inline-block min-w-[18px] mq450:text-3xl">
                        {premiumUsersCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="self-stretch flex flex-row items-start justify-start pt-0 pb-[71px] px-0 box-border max-w-full text-left text-lg text-text-colors font-inter mq825:pb-[46px] mq825:box-border">
              <div className="flex-1 flex flex-col items-end justify-start gap-[343px] max-w-full mq1250:gap-[171px] mq450:gap-[43px] mq825:gap-[86px]">
                <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[35.5px] max-w-full mq825:gap-[18px]">
                  <div className="flex-1 flex flex-row items-start justify-start gap-[8px] min-w-[922px] max-w-full mq1250:flex-wrap mq1250:min-w-full">
                    <div className="flex-1 flex flex-row items-center justify-between min-w-[863px] max-w-full gap-[20px] mq1250:min-w-full mq825:flex-wrap">
                      <div className="relative font-semibold">
                        Customer Analytics
                      </div>
                      <div className="flex flex-row items-center justify-start gap-[30px] max-w-full text-black-sub-text mq825:flex-wrap">
                        <div className="flex flex-row items-center justify-center p-2.5">
                          <div className="relative font-semibold inline-block min-w-[91px]">
                            12 months
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-center p-2.5">
                          <div className="relative font-semibold inline-block min-w-[70px]">
                            30 days
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-center p-2.5">
                          <div className="relative font-semibold inline-block min-w-[57px]">
                            7 days
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-center p-2.5">
                          <div className="relative font-semibold inline-block min-w-[78px]">
                            24 hours
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0 text-xs text-black-sub-text">
                      <div className="flex flex-row items-start justify-start gap-[5px]">
                        <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
                          <div className="w-3 h-3 relative rounded-[50%] bg-button" />
                        </div>
                        <div className="relative font-semibold inline-block min-w-[66px]">
                          This period
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0 text-xs text-black-sub-text">
                    <div className="flex flex-row items-start justify-start gap-[5px]">
                      <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
                        <div className="w-3 h-3 relative rounded-[50%] bg-black-sub-text" />
                      </div>
                      <div className="relative font-semibold inline-block min-w-[91px]">
                        Previous period
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[1510.5px] flex flex-row items-start justify-end py-0 px-0.5 box-border max-w-full text-center text-sm">
                  <div className="flex-1 bg-white flex flex-row items-start justify-start py-[9px] px-[33px] box-border max-w-full">
                    <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq825:flex-wrap">
                      <div className="relative font-semibold inline-block min-w-[25px]">
                        Jan
                      </div>
                      <div className="relative font-semibold inline-block min-w-[25px]">
                        Feb
                      </div>
                      <div className="relative font-semibold inline-block min-w-[27px]">
                        Mar
                      </div>
                      <div className="relative font-semibold inline-block min-w-[25px]">
                        Apr
                      </div>
                      <div className="relative font-semibold inline-block min-w-[29px]">
                        May
                      </div>
                      <div className="relative font-semibold inline-block min-w-[25px]">
                        Jun
                      </div>
                      <div className="relative font-semibold inline-block min-w-[21px]">
                        Jul
                      </div>
                      <div className="relative font-semibold inline-block min-w-[28px]">
                        Aug
                      </div>
                      <div className="relative font-semibold inline-block min-w-[27px]">
                        Sep
                      </div>
                      <div className="relative font-semibold inline-block min-w-[25px]">
                        Oct
                      </div>
                      <div className="relative font-semibold inline-block min-w-[27px]">
                        Nov
                      </div>
                      <div className="relative font-semibold inline-block min-w-[27px]">
                        Dec
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[369px] w-[1506px] flex flex-col items-start justify-start pt-[51px] px-0 pb-0 box-border max-w-full ml-[-1508.5px]">
                <div className="self-stretch flex-1 relative overflow-hidden border-[2px] border-solid border-low-opq-input" />
              </div>
            </footer>
          </div>
        </section>
</main>
</div>
  )
}
export default AdminDashboard;