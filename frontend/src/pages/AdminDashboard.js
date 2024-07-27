import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import UserAltFillIcon from '../components/UserAltFillIcon';
import ReactApexChart from 'react-apexcharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [totalUsers, setTotalUsers] = useState(null);
  const [freeUsersCount, setFreeUsersCount] = useState(null);
  const [premiumUsersCount, setPremiumUsersCount] = useState(null);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Total Users',
        data: []
      },
      {
        name: 'Active Users',
        data: []
      },
      {
        name: 'Free Users',
        data: []
      },
      {
        name: 'Premium Users',
        data: []
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'User Statistics',
        align: 'left'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login again.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://52.20.87.194:5000/dashboard/total-users');
        const data = await response.json();
        setTotalUsers(data.totalUsers);
        
        const freeResponse = await fetch('http://52.20.87.194:5000/dashboard/free-users');
        const freeData = await freeResponse.json();
        setFreeUsersCount(freeData.freeUsersCount);

        const premiumResponse = await fetch('http://52.20.87.194:5000/dashboard/premium-users');
        const premiumData = await premiumResponse.json();
        setPremiumUsersCount(premiumData.premiumUsersCount);
        
        // Set dummy data for chart
        setChartData({
          ...chartData,
          series: [
            {
              name: 'Total Users',
              data: Array(12).fill(data.totalUsers) // Replace with actual monthly data if available
            },
            {
              name: 'Active Users',
              data: Array(12).fill(data.totalUsers)// Replace with actual monthly data if available
            },
            {
              name: 'Free Users',
              data: Array(12).fill(freeData.freeUsersCount) // Replace with actual monthly data if available
            },
            {
              name: 'Premium Users',
              data: Array(12).fill(premiumData.premiumUsersCount) // Replace with actual monthly data if available
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  


  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
      <AdminSidebar />
      <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
        <AdminNavbar
          gettingStarted="Getting Started"
          mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="flex flex-row items-center justify-center py-0 pr-[16px] pl-[40px] mr-20 max-w-full text-center text-5xl text-color font-inter mq1250:pl-[130px] mq1250:pr-[133px] mq1250:box-border">
          <div className="flex-1 flex flex-col items- justify-start gap-[106px] max-w-1/2 mq450:gap-[26px] mq825:gap-[53px]">
            <div className="flex flex-row items-end justify-center gap-[10px] max-w-1/2 mq825:gap-[19px] mq1575:flex-wrap">
              <div className="rounded-3xs bg-button flex flex-row items-start justify-start py-[26.5px] px-5  max-w-full">
                <div className="h-[172px] flex flex-row items-end justify-start pt-0 pb-[34px] pr-[8px] pl-0 gap-[12px]">
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
              <div className="rounded-3xs bg-button flex flex-row items-start justify-start py-[26.5px] px-7 box-border max-w-full text-left text-5xl text-color font-inter">
                <div className="flex flex-row items-end justify-start py-0 pr-2 pl-0 gap-[21px] mq450:flex-wrap">
                  <img
                    className="h-[172px] w-[175px] relative mq450:flex-1"
                    loading="lazy"
                    alt=""
                    src="user.svg"
                  />
                  <div className="w-20px flex flex-col items-start justify-end pt-0 px-0 pb-7 box-border min-w-[40px] mq450:flex-1">
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
              <div className="rounded-3xs bg-button flex flex-row items-start justify-start py-[26.5px] px-7 box-border max-w-full text-left text-5xl text-color font-inter">
                <div className="flex flex-row items-end justify-start py-0 pr-2 pl-0 gap-[21px] mq450:flex-wrap">
                  <img
                    className="h-[172px] w-[175px] relative mq450:flex-1"
                    loading="lazy"
                    alt=""
                    src="/user-cicrle-duotone@2x.png"
                  />
                  <div className="w-[88px] flex flex-col items-start justify-end pt-0 px-0 pb-7 box-border min-w-[40px] mq450:flex-1">
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
                        Premium Users
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
            <footer className="self-stretch flex flex-row items-start justify-center pt-0 pb-[71px] px-0 box-border max-w-1/2 text-left text-lg text-text-colors font-inter mq825:pb-[46px] mq825:box-border">
              <div className="flex-1 flex flex-col items-center justify-center gap-[34px] max-w-full mq1250:gap-[171px] mq450:gap-[43px] mq825:gap-[86px]">
              </div>
              <div className="h-[369px] w-full flex flex-col items-center  justify-start pt-[51px] px-0 pb-0 box-border max-w-full ml-[-1508.5px]">
                <div className="self-stretch relative overflow-hidden border-[2px] border-solid border-low-opq-input">
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;