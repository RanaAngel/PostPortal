import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useCallback } from "react";

import axios from 'axios';
import Calendar from 'react-calendar';

import { jwtDecode } from 'jwt-decode';


import Facebook from "../components/Facebook";

import UpgradePlan from '../components/UpgradePlan';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import 'react-calendar/dist/Calendar.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register the necessary components from Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  
  const [postData, setPostData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const [value, setValue] = useState(new Date());

  const onChange = (newValue) => {
    setValue(newValue);
  };
  const [isFacebookConnected, setIsFacebookConnected] = useState(false);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);
  const [pinSubmitted, setPinSubmitted] = useState(false);
//Session
  const [lastActivityTime, setLastActivityTime] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();

  const [postCounts, setPostCounts] = useState({
    facebook: 0,
    instagram: 0,
    linkedin: 0,
    twitter: 0,
  });
  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId; // Adjust based on your token structure
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  

   // Fetch post counts when the component mounts
   useEffect(() => {
    const fetchPostCounts = async () => {
      const token = localStorage.getItem('token');
      const userId = getUserIdFromToken(token);

      try {
        const response = await axios.get(`http://localhost:5000/dashboard/post-counts/${userId}`);
        console.log(response.data);
        setPostCounts(response.data);
      } catch (error) {
        console.error('Error fetching post counts:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchPostCounts();
  }, []);

// BarChart
useEffect(() => {
  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken(token); // Function to decode token and get userId

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/dashboard/posts/${userId}`); // Adjust the URL as needed
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPostData(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);
const onGroupClick = useCallback(() => {
  // Please sync "Landing Page" to the project
  navigate('/channels')
}, [navigate]);


useEffect(() => {
  if (postData.length > 0) {
    const counts = Array(12).fill(0); // Initialize an array with 12 zeros (one for each month)
    postData.forEach(post => {
      const date = new Date(post.postedAt);
      const month = date.getMonth(); // Get the month (0-11)
      counts[month]++;
    });

    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Posts per Month",
          backgroundColor: "#7F5AF0", // Set bar color here
            borderColor: "#7F5AF0", 
          data: counts,
        },
      ],
    };

    setChartData(data);
  }
}, [postData]);

// if (loading) {
//   return <div>Loading...</div>; // Add a loading indicator
// }
const formatDate = (date) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options); // 'en-GB' format: 13 Jan 2024
};

const today = new Date();
const formattedDate = formatDate(today);


  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <Sidebar />
    <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
        <Navbar
            gettingStarted="Getting Started"
            mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-[15px] px-[49px] pb-[98px] box-border gap-[10px] max-w-full lg:pt-5 lg:pb-16 lg:box-border mq825:pb-[42px] mq825:box-border mq1400:pl-6 mq1400:pr-6 mq1400:box-border">
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-0 gap-[3px] text-left text-base text-secondary-secondary400 font-title-medium">
                <div className="flex flex-row items-center justify-center p-2.5">
                    <a className="[text-decoration:none] relative leading-[28px] font-medium text-[inherit]">
                        Media Posts View
                    </a>
                </div>
                <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-[3.5px] px-[27px] gap-[6px] text-lg text-text-colors mq825:gap-[30px] mq1400:flex-wrap">
                <Facebook logosfacebook="/logosfacebook.svg" facebook="Facebook" prop={postCounts.facebook} />
      <Facebook logosfacebook="/skilliconsinstagram.svg" facebook="Instagram" prop={postCounts.instagram} />
      <Facebook logosfacebook="/skilliconslinkedin.svg" facebook="LinkedIn" prop={postCounts.linkedin} />
      <Facebook logosfacebook="/logostwitter.svg" facebook="Twitter" prop={postCounts.twitter} />
                    <div className="flex-1 rounded-3xs bg-just-white box-border overflow-hidden flex flex-row items-end justify-end min-w-[260px] max-w-[265px] text-xl text-secondary-secondary900 border-[2px] border-solid border-low-opq-color">
                        <div className="h-[306px] flex-1 flex flex-col items-center justify-start">
                            <div className="self-stretch flex-1 flex flex-col items-start justify-between">
                                <div className="self-stretch flex flex-col items-center justify-center py-5 px-[30px] gap-[30px] mq450:gap-[15px]">
                                    <div className="self-stretch flex flex-row items-center justify-start py-0 px-0">
                                        <h3 className="m-0 w-[222px] relative text-inherit tracking-[0.02em] leading-[28px] font-semibold font-inherit inline-block shrink-0 mq450:text-base mq450:leading-[22px]">
                                            Connected Channels
                                        </h3>
                                    </div>
                                    <div className="self-stretch flex flex-col items-center justify-start gap-[20px] text-sm text-text-colors">
                                        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-3.5 pl-0 gap-[20px]">
                                            <div className="flex flex-row items-center justify-start gap-[20px]">
                                                <img className="h-6 w-[25.8px] relative overflow-hidden shrink-0" loading="lazy" alt="" src="/logosfacebook-1.svg" />
                                                <div className="relative leading-[28px] font-medium inline-block min-w-[69px]">Facebook</div>
                                            </div>
                                            <a className="[text-decoration:none] relative text-3xs leading-[28px] font-medium text-success-success200 inline-block min-w-[56px]">Connected</a>
                                        </div>
                                        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-0 gap-[20px]">
                                            <div className="flex flex-row items-center justify-start gap-[20px]">
                                                <img className="h-6 w-6 relative overflow-hidden shrink-0" loading="lazy" alt="" src="/skilliconsinstagram-1.svg" />
                                                <div className="relative leading-[28px] font-medium inline-block min-w-[74px]">Instagram</div>
                                            </div>
                                            <div className="relative text-3xs leading-[28px] font-medium text-success-success200 inline-block min-w-[56px]">Connected</div>
                                        </div>
                                        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-0 gap-[20px]">
                                            <div className="flex flex-row items-center justify-start gap-[20px]">
                                                <img className="h-6 w-6 relative overflow-hidden shrink-0" loading="lazy" alt="" src="/skilliconslinkedin.svg" />
                                                <div className="relative leading-[28px] font-medium inline-block min-w-[74px]">LinkedIn</div>
                                            </div>
                                            <div className="relative text-3xs leading-[28px] font-medium text-success-success200 inline-block min-w-[56px]">Connected</div>
                                        </div>
                                        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[11px] pl-0 gap-[20px]">
                                            <div className="flex flex-row items-center justify-start gap-[20px]">
                                                <img className="h-6 w-6 relative overflow-hidden shrink-0" loading="lazy" alt="" src="/frame.svg" />
                                                <div className="relative leading-[28px] font-medium inline-block min-w-[74px]">Twitter</div>
                                            </div>
                                            <div className="relative text-3xs leading-[28px] font-medium text-success-success200 inline-block min-w-[56px]">Connected</div>
                                        </div>
                                    </div>
                                </div>
                                <button className="cursor-pointer [border:none] py-[1.5px] px-[52px] bg-button self-stretch overflow-hidden flex flex-col items-end justify-between box-border min-h-[51px] mq450:pl-5 mq450:pr-5 mq450:box-border">
                                    <button onClick={onGroupClick} className="justify-center cursor-pointer [border:none] py-2.5 px-0 bg-[transparent] self-stretch flex flex-row items-center justify-center gap-[10px]">
                                        <div className="relative text-sm leading-[28px] font-medium font-title-medium text-white text-left">Add More Channels</div>
                                        <img className="h-6 w-6 relative overflow-hidden shrink-0" alt="" src="/icroundadd.svg" />
                                    </button>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start pt-2.5 px-0 pb-0 box-border gap-[7.7px] max-w-full text-left text-base text-secondary-secondary400 font-title-medium">
                <div className="w-[1112px] flex flex-row items-start justify-start py-0 px-[23px] box-border max-w-full">
                    <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq450:flex-wrap">
                        <div className="relative leading-[28px] font-medium">Scheduled Post View</div>
                        <div className="flex flex-col items-start justify-start pt-[9.3px] px-0 pb-0 mq1400:hidden">
                            <div className="relative leading-[28px] font-medium">Post Creation Timeline</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start gap-[10px] max-w-full text-lg text-secondary-title-color mq1400:flex-wrap">
                <div className="w-[427px] rounded-xl bg-just-white box-border overflow-hidden shrink-0 flex flex-col items-end justify-start pt-[19px] px-[19px] pb-[35px] gap-[18.5px] min-h-[300px] max-w-full border-[1px] border-solid border-outline mq450:pt-5 mq450:pb-[50px] mq450:box-border">
      <div className="self-stretch flex flex-col items-start justify-start gap-[6px] text-primary-subtitle-color">
        <div className="self-stretch flex flex-row items-center justify-between gap-[20px] z-[1] mq450:flex-wrap">
          <div className="w-[200px] relative leading-[28px] font-medium text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0">
            Posts Available
          </div>
          <div className="rounded bg-just-white flex flex-row items-center justify-center py-0 px-[17px] text-xs font-roboto border-[1px] border-solid border-whitesmoke">
            <div className="h-[27px] flex flex-row items-center justify-center py-0 px-0.5 box-border">
              <div className="relative leading-[28px] inline-block min-w-[104px]">
                Today, {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="relative text-xs leading-[28px] inline-block min-w-[60px] z-[1]">This Week</div>
      </div>
      <div className="overflow-y-auto w-full" style={{ maxHeight: '200px' }}>
        {postData.map((post) => (
          <div key={post._id} className="self-stretch rounded-md bg-background-color overflow-hidden flex flex-row items-start justify-start py-[9px] px-[5px] gap-[1px] z-[1] text-base border-[0.5px] border-solid border-outline mq450:flex-wrap mb-1">
            <div className="flex-1 flex flex-col items-start justify-start gap-[6px] min-w-[184px]">
              <div className="self-stretch relative leading-[24px]">{post.title}</div>
              <div className="w-[258px] relative text-3xs font-inter text-primary-subtitle-color inline-block whitespace-nowrap">
                {new Date(post.postedAt).toLocaleString()}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[9px] px-0 pb-0">
              <div className="flex flex-row items-start justify-start gap-[20px]">
                <img className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]" loading="lazy" alt="" src="/icnotifications.svg" />
                <img className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]" loading="lazy" alt="" src="/ichorizontal-menu.svg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
                    <div className="w-[438px] flex flex-col items-start justify-start py-0 pr-7 pl-0 box-border max-w-full text-sm text-base-base-black font-plus-jakarta-sans">
                        <Calendar onChange={onChange} value={value} />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start pt-[5.8px] px-0 pb-0 box-border min-w-[462px] max-w-full text-xs text-text-colors mq825:min-w-full">
                    <div className="flex-1 flex flex-col items-start justify-start pt-[5.8px] px-0 pb-0 box-border min-w-[462px] max-w-full text-xs text-text-colors mq825:min-w-full">
      <div className="self-stretch rounded-3xs overflow-hidden flex flex-col items-end justify-start py-3 px-3.5 gap-[10px] border-[1px] border-solid border-outline">
       
        {chartData && (
          <div className="w-full" style={{ position: 'relative', width: '600px' , height: '300px'}}>
            <Bar 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false, // Allow chart to scale beyond the container
                scales: {
                  x: {
                    ticks: {
                      autoSkip: false, // Show all x-axis labels
                      maxRotation: 90, // Rotate x-axis labels if needed
                    },
                  },
                },
              }} 
            />
          </div>
        )}
      </div>
    </div>
    </div>
                </div>
            </div>
        </section>
    </main>
</div>

  );
};

export default Dashboard;