import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { jwtDecode } from 'jwt-decode';

const Library = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('All');

  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      console.log('User ID:', userId); // Log user ID
      return userId;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleClick = async (platform) => {
    setActiveButton(platform);

    const token = localStorage.getItem('token');
    const userId = getUserIdFromToken(token);

    try {
      const response = await axios.post('http://localhost:5000/api/facebook/filter', { platform, userId });
      const filteredPosts = response.data.posts.filter(post => 
        post.status !== 'draft' && 
        !(post.status === 'scheduled' && post.scheduledAt==='null')
      );
      setPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching filtered posts:', error);
    }
  };

  useEffect(() => {
    handleClick('All');
  }, []);

  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
      <Sidebar />
      <main className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_233px)] mq1050:max-w-full">
        <Navbar
          gettingStarted="Getting Started"
          mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch flex flex-row items-center justify-between py-[20.9px] px-5 box-border max-w-full shrink-0 mq450:pt-[29px] mq450:pb-[29px] mq450:box-border mq725:pt-[37px] mq725:pb-[37px] mq725:box-border mq1000:pt-11 mq1000:pb-11 mq1000:box-border">
          <div className="w-[1612px] flex flex-col items-start justify-start py-0 px-[37px] box-border max-w-full text-left text-xl text-gray-200 font-inter">
            <div className="flex-1 flex flex-col items-start justify-start gap-[69px] max-w-full mq450:gap-[17px] mq725:gap-[34px]">
              <div className="self-stretch flex flex-row items-start justify-between py-0 pr-0 pl-3.5 box-border max-w-full">
                <div className="flex flex-row items-start justify-between max-w-full gap-[300px] mq1000:flex-wrap">
                  <div className="w-[198px] flex flex-col items-start justify-start pt-[19px] pb-0 pr-5 pl-0 box-border">
                    <h3 className="m-0 relative text-nowrap tracking-[0.04em] font-medium font-inherit mq450:text-base">
                      View All Posts
                    </h3>
                  </div>
                  <nav className="m-0 w-full flex flex-col items-start justify-evenly pt-[15px] px-0 pb-0 box-border">
                    <nav className="m-0 gap-4 self-stretch flex flex-row items-start justify-evenly [row-gap:20px] whitespace-nowrap mq450:flex-wrap">
                      <button
                        onClick={() => handleClick('All')}
                        className={`cursor-pointer [border:none] py-[7.5px] px-[9px] rounded-mid flex flex-row items-start justify-start box-border ${
                          activeButton === 'All'
                            ? 'bg-[rgba(127,90,240,0.8)] text-white'
                            : 'bg-[transparent] text-gray-200 hover:bg-[rgba(127,90,240,0.8)] hover:text-white'
                        }`}
                      >
                        <div className="relative text-sm tracking-[0.04em] font-medium font-inter inline-block min-w-[19px]">
                          All
                        </div>
                      </button>
                      <button
                        onClick={() => handleClick('twitter')}
                        className={`cursor-pointer [border:none] py-[7.5px] px-[9px] rounded-mid flex flex-row items-start justify-start ${
                          activeButton === 'twitter'
                            ? 'bg-[rgba(127,90,240,0.8)] text-white'
                            : 'bg-[transparent] text-gray-200 hover:bg-[rgba(127,90,240,0.8)] hover:text-white'
                        }`}
                      >
                        <a className="[text-decoration:none] relative text-sm tracking-[0.04em] font-medium font-inter inline-block min-w-[52px]">
                          Twitter
                        </a>
                      </button>
                      <button
                        onClick={() => handleClick('facebook')}
                        className={`cursor-pointer [border:none] py-[7.5px] px-[9px] rounded-mid flex flex-row items-start justify-start ${
                          activeButton === 'facebook'
                            ? 'bg-[rgba(127,90,240,0.8)] text-white'
                            : 'bg-[transparent] text-gray-200 hover:bg-[rgba(127,90,240,0.8)] hover:text-white'
                        }`}
                      >
                        <a className="[text-decoration:none] relative text-sm tracking-[0.04em] font-medium font-inter inline-block min-w-[71px]">
                          Facebook
                        </a>
                      </button>
                      <button
                        onClick={() => handleClick('instagram')}
                        className={`cursor-pointer [border:none] py-[7.5px] px-[9px] rounded-mid flex flex-row items-start justify-start ${
                          activeButton === 'instagram'
                            ? 'bg-[rgba(127,90,240,0.8)] text-white'
                            : 'bg-[transparent] text-gray-200 hover:bg-[rgba(127,90,240,0.8)] hover:text-white'
                        }`}
                      >
                        <div className="relative text-sm tracking-[0.04em] font-medium font-inter inline-block min-w-[73px]">
                          Instagram
                        </div>
                      </button>
                      <button
                        onClick={() => handleClick('linkedin')}
                        className={`cursor-pointer [border:none] py-[7.5px] px-[9px] rounded-mid flex flex-row items-start justify-start ${
                          activeButton === 'linkedin'
                            ? 'bg-[rgba(127,90,240,0.8)] text-white'
                            : 'bg-[transparent] text-gray-200 hover:bg-[rgba(127,90,240,0.8)] hover:text-white'
                        }`}
                      >
                        <div className="relative text-sm tracking-[0.04em] font-medium font-inter inline-block min-w-[73px]">
                          LinkedIn
                        </div>
                      </button>
                    </nav>
                  </nav>
                  <div className="w-full flex flex-row items-end justify-between gap-[7px] max-w-full mq450:flex-wrap">
                    <input
                      className="w-full rounded-lg [outline:none] bg-white flex-1 box-border flex flex-row items-start justify-start py-[15px] px-4 font-inter font-semibold text-xs-5 text-lightgray min-w-[62px] border-[1px] border-solid border-black-card"
                      placeholder="Search..."
                      type="text"
                    />
                    <button className="cursor-pointer [border:none] py-4 px-[13px] bg-button h-[50px] rounded-3xs flex flex-row items-center justify-center box-border">
                      <div className="h-6 w-[25px] relative overflow-hidden shrink-0">
                        <img
                          className="h-6 w-6  relative overflow-hidden shrink-0"
                          alt=""
                          src="/icsharpsearch.svg"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-start gap-[14px] max-w-full text-xs-5 text-dimgray-100">
                {posts.length === 0 ? (
                  <p>No posts available</p>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post._id}
                      onClick={() => handlePostClick(post._id)}
                      className="flex-none rounded-xl bg-just-white border-[2px] border-solid border-outline box-border flex flex-col items-start justify-start pt-[13px] pb-[34px] pr-[10px] pl-[10px] gap-[19px] min-w-[211px] text-left text-xs-5 text-dimgray-100 font-inter cursor-pointer"
                    >
                      <div className="self-stretch h-[154px] flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch flex flex-row items-start justify-start py-0 px-[11px]">
                          <div className="flex-1 flex flex-row items-start justify-between gap-[4px] z-[1]">
                            <a className="[text-decoration:none] flex-1 relative font-semibold text-[inherit] text-lg">
                              {post.title}
                            </a>
                            {post.status === 'scheduled' && post.scheduledAt && (
                              <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
                                <img
                                  className="w-[15px] h-[15px] relative overflow-hidden shrink-0"
                                  loading="lazy"
                                  alt=""
                                  src="/icon.svg" // replace with your icon
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <img
                          className="self-stretch flex-1 relative rounded-8xs max-w-full overflow-hidden max-h-full object-cover z-[1]"
                          loading="lazy"
                          alt=""
                          src={post.imageURL} // Assuming you have an imageURL field
                        />
                      </div>
                      <div className="w-full flex flex-row items-start justify-start py-0 px-1.5 box-border text-3xs-5 text-darkgray text-lg">
                        {post.status === 'scheduled' && post.scheduledAt ? (
                          <div className="flex-1 relative font-semibold z-[1]">
                            Scheduled Date: {new Date(post.scheduledAt).toLocaleString()}
                          </div>
                        ) : post.status === 'published' && post.postedAt ? (
                          <div className="flex-1 relative font-semibold z-[1]">
                            Posted Date: {new Date(post.postedAt).toLocaleString()}
                          </div>
                        ) : (
                          <div className="flex-1 relative font-semibold z-[1]">Date not available</div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Library;
