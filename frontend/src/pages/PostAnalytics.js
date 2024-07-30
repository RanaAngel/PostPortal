import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import axios from 'axios';
import Navbar from "../components/Navbar";
import ReactApexChart from 'react-apexcharts';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const PostAnalytics = () => {
  const [posts, setPosts] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState('facebook');
  const [selectedOption2, setSelectedOption2] = useState('page1');
  const [selectedOption3, setSelectedOption3] = useState('');

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Analytics by year',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      }
    }
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
   // Get userId from local storage or auth token

   useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      const userId = getUserIdFromToken(token);

      console.log('Selected Option 1:', selectedOption1); // Log selectedOption1
      try {
        const response = await axios.get('http://localhost:5000/post_analytics/postsview', {
          params: { userId, platform: selectedOption1 }
        });
        
      // Use the response data
      const fetchedPosts = response.data;
      
        const dummyData = fetchedPosts.map(post => ({
          _id: post._id,
          media: selectedOption1,
          page: selectedOption2,
          option: post.title,
          likes: Math.floor(Math.random() * 100) + 50,
          comments: Math.floor(Math.random() * 30) + 10,
          views: Math.floor(Math.random() * 200) + 100,
          months: Array.from({ length: 12 }, (_, index) => ({
            likes: Math.floor(Math.random() * 100) + 50,
            comments: Math.floor(Math.random() * 30) + 10,
            views: Math.floor(Math.random() * 200) + 100,
          }))
        }));

        setAnalytics(dummyData);
        setPosts(fetchedPosts);

      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Error fetching posts');
      }
    };

    fetchAnalytics();
  }, [selectedOption1]);

  useEffect(() => {
    const options = new Set();
    analytics.forEach(item => {
      if (item.media === selectedOption1 && item.page === selectedOption2) {
        options.add(item.option);
      }
    });
    setSelectedOption3('');
  }, [selectedOption1, selectedOption2, analytics]);

  useEffect(() => {
    const filteredData = getFilteredData();
    if (filteredData.length > 0) {
      const months = filteredData[0].months || [];
      setChartData({
        series: [
          {
            name: "Likes",
            data: months.map(month => month.likes || 0)
          },
          {
            name: "Comments",
            data: months.map(month => month.comments || 0)
          },
          {
            name: "Views",
            data: months.map(month => month.views || 0)
          }
        ],
        options: {
          ...chartData.options,
          xaxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          }
        }
      });
    }
  }, [selectedOption1, selectedOption2, selectedOption3, analytics]);

  const handleOption1Change = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleOption3Change = (event) => {
    setSelectedOption3(event.target.value);
  };

  const getFilteredData = () => {
    return analytics.filter(item =>
      item.media === selectedOption1 &&
      item.page === selectedOption2 &&
      item.option === selectedOption3
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="w-full flex flex-row items-start justify-start bg-color overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_233px)] mq1050:max-w-full">
        <Navbar
          gettingStarted="Getting Started"
          mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch flex flex-col items-center justify-center py-[87.9px] px-5 mq450:py-[29px] mq725:py-[37px] mq1000:py-11 w-full gap-[41px] mq450:gap-[20px]">
          <div className="flex flex-col items-center justify-center gap-[50px] mq750:gap-[25px] w-full">
            <div className="flex flex-col gap-[2rem] justify-cen items-center w-full">
              <div className="w-1/2 justify-center lg:w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Media
                </label>
                <select
                  className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  value={selectedOption1}
                  onChange={handleOption1Change}
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              
              <div className="w-1/2 lg:w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Connected Page
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  value={selectedOption2}
                  onChange={handleOption2Change}
                >
                  <option value="page1">PostPortal</option>
                </select>
              </div>
            </div>

            <div className="w-1/2 lg:w-1/3 mt-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Post
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                value={selectedOption3}
                onChange={handleOption3Change}
              >
                <option value="" disabled>Select a post</option>
                {posts.map((post) => (
                  <option key={post._id} value={post.title}>
                    {post.title}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedOption3 && filteredData.length > 0 && (
              <div className="w-full flex flex-wrap items-start gap-[2rem]">
                <div className="w-1/2 lg:w-1/2 px-2 mb-4">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <p className="text-xl font-semibold text-gray-800">Likes</p>
                    <p className="text-black font-bold text-xl mt-2">{filteredData[0].likes}</p>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/4 px-4 mb-4">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <p className="text-xl font-semibold text-gray-800">Comments</p>
                    <p className="text-black font-bold text-xl mt-2">{filteredData[0].comments}</p>
                  </div>
                </div>
                <div className="w-1/2 lg:w-1/4 px-4 mb-4">
                  <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                    <p className="text-xl font-semibold text-gray-800">Views</p>
                    <p className="text-black font-bold text-xl mt-2">{filteredData[0].views}</p>
                  </div>
                </div>
                <div className="w-full px-4 mb-4">
                  <ReactApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PostAnalytics;
