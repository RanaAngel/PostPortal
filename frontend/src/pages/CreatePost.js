import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePost() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [isSinglePlatform, setIsSinglePlatform] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // To store payment status
    const [loading, setLoading] = useState(true); // For handling loading state
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    let postTitle = '';
    const handlePost = async (scheduleDate) => {
        if (isSinglePlatform && selectedPlatforms.length === 0) {
            console.error('Please select a platform.');
            return;
        }
        for (const platform of selectedPlatforms) {
            switch (platform) {
                case 'linkedin':
                    postTitle = 'linkedin';
                    await handleLinkedInPost(postTitle, scheduleDate);
                    break;
                case 'twitter':
                    postTitle = 'twitter';
                    await handlePostTweet(postTitle, scheduleDate);
                    break;
                case 'facebook':
                    postTitle = 'facebook';
                    await handleFacebookPost(postTitle, scheduleDate);
                    break;
                case 'instagram':
                    postTitle = 'instagram';
                    await handleInstagramPost(postTitle, scheduleDate);
                    break;
                default:
                    console.error(`Unsupported platform: ${platform}`);
            }
        }
    };

    const handleCheckboxChange = (e, platform) => {
        if (e.target.checked) {
            setSelectedPlatforms(prevPlatforms => [...prevPlatforms, platform]);
        } else {
            setSelectedPlatforms(prevPlatforms => prevPlatforms.filter(p => p !== platform));
        }
    };

    const handleSinglePlatformChange = (e) => {
        setIsSinglePlatform(e.target.checked);
    };

    //Image Upload
    const handleImageUpload = (event) => {
      setSelectedImage(event.target.files[0]);
  };
  
  async function fetchImageFromImgBB(imageUrl) {
      try {
          const response = await fetch(imageUrl);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const imageBlob = await response.blob();
          return imageBlob;
      } catch (error) {
          console.error('Error fetching image:', error);
          return null;
      }
  }
    // Twitter
    const handlePostTweet = async (postTitle, scheduleDate) => {
      try {
          const userId = localStorage.getItem('twitter_user_id');
          const formData = new FormData();
          formData.append('postTitle', postTitle);
          formData.append('title', title);
          formData.append('text', text);
          formData.append('userId', userId);
          formData.append('scheduleDate', scheduleDate);

          if (selectedImage) {
              // Upload image to ImgBB
              const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
              const imageBBFormData = new FormData();
              imageBBFormData.append('image', selectedImage);

              const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
              const imageUrl = imageBBResponse.data.data.url;

              const imageBlob = await fetchImageFromImgBB(imageUrl);
              if (imageBlob) {
                  formData.append('imageFile', imageBlob, 'downloaded_image.jpg');
                  formData.append('imageURL', imageUrl);
              } else {
                  notifyError('Failed to download image from ImgBB');
                  return;
              }
          } else {
              notifyError('No image selected');
              return;
          }

          const response = await axios.post('http://44.207.233.50:5000/twitter/tweet', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          notifySuccess("Content shared successfully");
          console.log(JSON.stringify(response.data, undefined, 2));
      } catch (error) {
          notifyError('Error posting tweet: ' + error.message);
      }
  };
    
    

    // Facebook
    const handleFacebookPost = async (postTitle, scheduleDate) => {
      try {
          const jwtToken = localStorage.getItem('token');
          const formData = new FormData();
          formData.append('postTitle', postTitle);
          formData.append('title', title);
          formData.append('text', text);
          formData.append('token', jwtToken);
          formData.append('scheduleDate', scheduleDate);
          if (selectedImage) {
              formData.append('image', selectedImage);
          }

          const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
          const imageBBFormData = new FormData();
          imageBBFormData.append('image', selectedImage);
          
          const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
          const imageUrl = imageBBResponse.data.data.url;
          formData.append('imageUrl', imageUrl);

          const response = await axios.post('http://44.207.233.50:5000/api/facebook/post', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          notifySuccess('Post successful');
          console.log('Post successful:', response.data);
      } catch (error) {
          notifyError('Error posting content: ' + (error.response ? error.response.data : error.message));
      }
  };


    // Instagram
    const handleInstagramPost = async (postTitle, scheduleDate) => {
      try {
          const jwtToken = localStorage.getItem('token');
          const formData = new FormData();
          
          formData.append('title', title);
          formData.append('postTitle', postTitle);
          formData.append('text', text);
          formData.append('token', jwtToken);
          formData.append('scheduleDate', scheduleDate);
          if (selectedImage) {
              formData.append('image', selectedImage);
          }

          const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
          const imageBBFormData = new FormData();
          imageBBFormData.append('image', selectedImage);
          
          const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
          const imageUrl = imageBBResponse.data.data.url;
          formData.append('imageUrl', imageUrl);

          const response = await axios.post('http://44.207.233.50:5000/api/instagram/post', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          notifySuccess('Post successful');
          console.log('Post successful:', response.data);
      } catch (error) {
          notifyError('Error posting content: ' + (error.response ? error.response.data : error.message));
      }
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

    // LinkedIn
    const handleLinkedInPost = async (postTitle, scheduleDate) => {
      if (!selectedPlatforms.includes('linkedin')) {
          notifyError('Selected platform is not LinkedIn.');
          return;
      }
      try {
          const accessToken = localStorage.getItem('token');
          const userId = getUserIdFromToken(accessToken);

          if (!userId) {
              notifyError('Access token or User ID not found.');
              return;
          }
          
          const formData = new FormData();
          formData.append('postTitle', postTitle);
          formData.append('text', text);
          formData.append('title', title);
          formData.append('userId', userId);
          formData.append('scheduleDate', scheduleDate);
          if (selectedImage) {
              const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';
              const imageBBFormData = new FormData();
              imageBBFormData.append('image', selectedImage);

              const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, imageBBFormData);
              const imageUrl = imageBBResponse.data.data.url;

              const imageBlob = await fetchImageFromImgBB(imageUrl);
              if (imageBlob) {
                  formData.append('imageFile', imageBlob, 'downloaded_image.jpg');
                  formData.append('imageURL', imageUrl);
              } else {
                  notifyError('Failed to download image from ImgBB');
                  return;
              }
          } else {
              notifyError('No image selected');
              return;
          }

          const response = await axios.post(
              'http://44.207.233.50:5000/sharePost/postContent',
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'multipart/form-data',
                  },
              }
          );
          notifySuccess('Content shared successfully on LinkedIn');
      } catch (error) {
          notifyError('Error posting content on LinkedIn: ' + error.message);
      }
  };



  const [userType, setUserType] = useState(null); // Declare userType state
  const onButtonClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  
  const onSchedulePostClick = () => {
    setScheduleDate(new Date());
    setIsScheduled(true);
    setDropdownVisible(false); // Hide the dropdown when date picker is shown
  };
  
  const onPostClick = () => {
    setIsScheduled(false);
    setDropdownVisible(false); // Hide the dropdown when switching back to post
    setScheduleDate(null); // Clear the schedule date
  };
  
  useEffect(() => {
    const fetchUserType = async () => {
      const userId = getUserIdFromToken(localStorage.getItem('token'));
      try {
        const response = await fetch(`http://44.207.233.50:5000/stripe/verify/${userId}`); // Update with your user endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUserType(data.usertype); // Assuming your backend sends `usertype` in the response
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false); // End loading state
      }
    };
  
    fetchUserType();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>; // Optional loading indicator
  }
    
    return (
      <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_233px)] mq1050:max-w-full">
        
        <Navbar
          gettingStarted="Getting Started"
          mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch flex flex-row items-center justify-center py-[87.9px] px-5 box-border max-w-full shrink-0 mq450:pt-[29px] mq450:pb-[29px] mq450:box-border mq725:pt-[37px] mq725:pb-[37px] mq725:box-border mq1000:pt-11 mq1000:pb-11 mq1000:box-border">
        <ToastContainer /> 
        <div className="flex-1 flex flex-col items-start justify-start gap-[50px] max-w-full mq750:gap-[25px] ">
          
          <div className="self-stretch flex flex-col items-start justify-start gap-[10px] max-w-full">
            <div className="self-stretch relative font-semibold">Post Name</div>
            <input
              className="[outline:none] bg-[transparent] self-stretch h-[37px] [background:linear-gradient(#fefefe,_#fefefe),_rgba(0,_0,_0,_0)] box-border min-w-[250px] border-[2px] border-solid border-outline"
              placeholder="Post Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[10px] max-w-full">
            <div className="self-stretch h-7 relative font-semibold flex items-center shrink-0">
              Content
            </div>
            <textarea
              className="bg-[transparent] [outline:none] self-stretch h-[166.4px] [background:linear-gradient(#fefefe,_#fefefe),_rgba(0,_0,_0,_0)] box-border flex flex-row items-start justify-start py-[21px] px-[31px] font-inter text-smi-5 text-darkgray border-[2px] border-solid border-outline box-border"
              placeholder="What's on your mind"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start pt-0 px-0 pb-[9.5px] box-border gap-[19.5px] max-w-full text-base text-black-card">
            <div className="self-stretch relative font-medium">
              CHOOSE MEDIA YOU WANT TO UPLOAD ON *
            </div>
            <div className="w-full flex flex-row flex-wrap items-start justify-start gap-[30px] max-w-full text-black-main-background-200">
              {['instagram', 'twitter', 'facebook', 'linkedin'].map(platform => (
                <div key={platform} className="flex-1 flex flex-row items-start justify-start gap-[10px] min-w-[84px]">
                  <input
                    className="cursor-pointer m-0 h-5 w-[19.8px] relative rounded-xl box-border border-[1px] border-solid border-black"
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={(e) => handleCheckboxChange(e, platform)}
                  />
                  <div className="relative tracking-[0.04em] font-medium inline-block min-w-[100px] capitalize">
                    {platform}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="self-stretch flex flex-row items-end justify-between gap-[20px] text-base text-black-theme-texts mq450:flex-wrap ">
          <input 
    className="relative font-medium inline-block min-w-[94px] p-1 text-sm" 
    type="file" 
    accept="image/*" 
    id="file-upload" 
    onChange={handleImageUpload} 
/>

<div className="flex justify-between">
    {scheduleDate && (
      <DatePicker
        selected={scheduleDate}
        onChange={(date) => setScheduleDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        className="block w-full pl-10 sm:text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select a date and time..."
      />
    )}
    <div className="w-[180px] flex flex-row items-end justify-start gap-[5px] max-w-full mq750:gap-[25px]">
      {isScheduled ? (
        <button
          className="cursor-pointer [border:none] pt-[12px] pb-[10px] pr-5 pl-[10px] bg-button rounded-8xs flex flex-row items-start justify-start hover:bg-mediumslateblue-50"
          onClick={() => handlePost(scheduleDate)}
        >
          <div className="relative text-sm tracking-[0.04em] font-medium font-inter text-white text-left inline-block min-w-[52px] z-[1]">
            Schedule Post
          </div>
        </button>
      ) : (
        <button
          className="cursor-pointer [border:none] pt-[12.4px] pb-[12.1px] pr-9 pl-[43px] bg-button rounded-8xs flex flex-row items-start justify-start hover:bg-mediumslateblue-50"
          onClick={() => handlePost(null)}
        >
          <div className="relative text-lg tracking-[0.04em] font-medium font-inter text-white text-left inline-block min-w-[52px] z-[1]">
            POST
          </div>
        </button>
      )}
      <div className="relative inline-block text-left">
        <div
          className="h-11 w-[39px] bg-button overflow-hidden flex flex-col items-center justify-center py-[11px] px-0 cursor-pointer"
          onClick={onButtonClick}
        >
          <img
            className="w-3.5 h-[8.2px]"
            alt=""
            src="/vector.svg"
          />
        </div>
        {isDropdownVisible && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 cursor-pointer">
            <div className="py-1">
              <a
                onClick={onPostClick}
                className="block px-4 py-2 text-gray-700 hover:bg-mediumslateblue-100"
              >
                POST
              </a>
              <a
                onClick={userType === 'premium' ? onSchedulePostClick : (e) => e.preventDefault()}
                className={`block px-4 py-2 ${userType === 'premium' ? 'text-gray-700 hover:bg-mediumslateblue-100' : 'text-gray-700 cursor-not-allowed'}`}
                title={userType === 'premium' ? '' : 'Unlock with PRO'}
              >
                SCHEDULE POST
              </a>
              {/* Add more dropdown items here */}
            </div>
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
}
{/* */}