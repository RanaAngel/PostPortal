import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChangePassword from '../components/ChangePassword';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [image, setImage] = useState(null);
  const navigate=useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    email: '',
    phone: '',
    imageUrl: '',
  });
  const [showChangePassword, setShowChangePassword] = useState(false); // State to control the visibility of the ChangePassword component
  const handleChangePassword = () => {
    setShowChangePassword(false);
    navigate('/change')
  };

  // Function to get user ID from JWT token
  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      return userId;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/dashboard/profile?userId=${encodeURIComponent(userId)}`);
        setProfile(res.data);
        console.log(res.data);

      } catch (error) {
        console.error('Error fetching profile information', error);
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const imageBBApiKey = '8d7d3372506f50dc50891b45144e1bb8';

      try {
        const imageBBResponse = await axios.post('https://api.imgbb.com/1/upload?key=' + imageBBApiKey, formData);
        const imageUrl = imageBBResponse.data.data.url;

        const uploadRes = await axios.put('http://localhost:5000/dashboard/upload', {
          imageUrl: imageUrl,
          userId: userId
        });

        setProfile(uploadRes.data);
        toast.success('Image updated successfully');
        console.log('Profile image updated:', uploadRes.data);
      } catch (error) {
        console.error('Error uploading image', error);
        toast.error('Failed to upload image');
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const deleteRes = await axios.delete(`http://localhost:5000/dashboard/deleteImage?userId=${encodeURIComponent(userId)}`);
      toast.success('Deleted image successfully');
      console.log('Image deleted successfully:', deleteRes.data);
      setProfile({ ...profile, imageUrl: '' });
    } catch (error) {
      console.error('Error deleting image', error);
      toast.error('Failed to delete image');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const profileRes = await axios.put(`http://localhost:5000/dashboard/editProfile?userId=${encodeURIComponent(userId)}`, {
        profileData: profile,
      });
      setProfile(profileRes.data);
      toast.success('Profile updated successfully');
      console.log('Profile updated:', profileRes.data);
    } catch (error) {
      console.error('Error updating profile', error);
      toast.error('Failed to update profile');
    }
  };

  const removePremium = async () => {

    const showToast = (message, onConfirm, onCancel) => {
        toast(
            ({ closeToast }) => (
                <div className="flex flex-col items-start p-4">
                    <p className="mb-2">{message}</p>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                onConfirm();
                                closeToast();
                            }}
                            className="bg-green-500 font-normal text-lg text-white px-4 py-2 rounded"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => {
                                onCancel();
                                closeToast();
                            }}
                            className="bg-red-500 font-normal text-lg text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            { closeOnClick: false, autoClose: false }
        );
    };

    const onConfirmRemove = async () => {
        try {
            await axios.patch(`http://localhost:5000/dashboard/users/${userId}/remove-premium`);
            toast.success('Premium status removed successfully');
            // Optionally, navigate to another page or refresh the page
            setTimeout(() => {
              window.location.reload();
          }, 800);
             // Refresh the page to reflect changes
        } catch (error) {
            console.error('Error removing premium status:', error);
            toast.error('Failed to remove premium status');
        }
    };

    showToast(
        'Are you sure you want to remove your premium status?',
        onConfirmRemove,
        () => toast.info('Remove action canceled')
    );
};
  return (
    
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <Sidebar />
    <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
        <Navbar
            gettingStarted="Getting Started"
            mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        
        <section className="w-full flex flex-row items-start justify-start py-0 px-8 box-border max-w-full text-center text-[32px] font-poppins mq1325:flex-row mq1325:pl-2.5 mq1325:pr-2.5 mq1325:box-border">
          
      <div className="flex-1 flex flex-row items-start justify-start gap-[50px] max-w-full mq800:gap-[25px] mq1325:flex-wrap">
        <div className=" flex flex-col items-center justify-start pt-48 px-5 pb-[265px] box-border gap-[37px] min-w-[498px] max-w-full mq800:min-w-full mq1125:pt-[125px] mq1125:pb-[172px] mq1125:box-border mq450:gap-[18px] mq450:pt-[81px] mq450:pb-28 mq450:box-border mq1325:flex-1">
          <div className="flex flex-row items-start justify-start py-0 px-[18px]">
            <h1 className="m-0 relative text-inherit leading-[42px] font-medium font-inherit text-transparent !bg-clip-text [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#161e54] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] mq800:text-[26px] mq800:leading-[34px] mq450:text-[19px] mq450:leading-[25px]">
              Profile Preview
            </h1>
          </div>
          <img
            className="w-[278px] h-[285px] relative rounded-[50%] bg-gainsboro-200"
            src={profile.imageUrl || 'default-placeholder-image-url'} // Replace with a placeholder if needed
            
          />
          <input className=" text-sm justify-center gap-[10px]" type="file" onChange={handleImageChange} />
          <div className="flex flex-row items-center justify-center gap-[10px]">
            
            <button
              className="cursor-pointer [border:none] py-[15px] px-5 bg-button rounded-3xs flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumslateblue-100"
              onClick={handleImageUpload}
            >
              <div className="relative text-sm font-semibold font-inter text-color text-left inline-block min-w-[94px]">
                Upload Image
              </div>
            </button>
            <button  onClick={handleDeleteImage} className="cursor-pointer py-3 px-[18px] bg-[transparent] w-[84px] rounded-3xs box-border flex flex-row items-center justify-center border-[2px] border-solid border-button hover:bg-mediumslateblue-200 hover:box-border hover:border-[2px] hover:border-solid hover:border-mediumslateblue-100">
              <div className="relative text-sm font-semibold font-inter text-button text-left inline-block min-w-[44px]">
                Delete
              </div>
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-start justify-start pt-[82.5px] px-0 pb-0 box-border min-w-[498px] max-w-full mq800:pt-[54px] mq800:box-border mq800:min-w-full mq1325:flex-1">
        <div className="flex flex-row items-center justify-start gap-[20px]">
  <button  onClick={handleChangePassword}
    className="cursor-pointer [border:none] py-[15px] px-5 bg-button rounded-3xs flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumslateblue-100"
  > {showChangePassword && <ChangePassword />}
    <div className="relative text-sm font-semibold font-inter text-color text-left inline-block min-w-[123px]">
      Change Password
    </div>
  </button>
  <button onClick={removePremium}
    className="cursor-pointer [border:none] py-[15px] px-5 bg-button rounded-3xs flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumslateblue-100"
  >
    <div className="relative text-sm font-semibold font-inter text-color text-left inline-block min-w-[123px]">
      Remove Premium
    </div>
  </button>
</div>
          <form onSubmit={handleProfileUpdate} className="m-0 self-stretch flex flex-col items-start justify-start gap-[60px] max-w-full mq800:gap-[30px]">
            <div className="self-stretch flex flex-row items-center justify-end"></div>
            <div className="self-stretch flex flex-col items-end justify-start gap-[20px] max-w-full">
              <div className="self-stretch flex flex-col items-start justify-start gap-[30px] max-w-full">
                <div className="self-stretch flex flex-row items-center justify-start py-0 px-0 box-border gap-[10px] max-w-full mq800:flex-wrap">
                  <div className="flex-1 flex flex-col items-start justify-start py-0 pr-3 pl-0 box-border gap-[3px] min-w-[246px] max-w-full text-left text-sm text-darkgray font-inter">
                    <div className="flex flex-row items-center justify-start p-2.5">
                      <div className="relative font-semibold inline-block min-w-[74px]">
                        FirstName
                      </div>
                    </div>
                    <div className="self-stretch rounded-8xs box-border flex flex-row items-center justify-start py-[18px] px-[19px] max-w-full border-[2px] border-solid border-gray-600">
                      <input
                        className="w-full [border:none] [outline:none] bg-[transparent] h-[17px] flex-1 flex flex-row items-center justify-start font-inter font-normal text-sm text-black-sub-text min-w-[194px] max-w-full"
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start py-0 pr-3 pl-0 box-border gap-[3px] min-w-[246px] max-w-full text-left text-sm text-darkgray font-inter">
                    <div className="flex flex-row items-center justify-start p-2.5">
                      <div className="relative font-semibold inline-block min-w-[74px]">
                        LastName
                      </div>
                    </div>
                    <div className="self-stretch rounded-8xs box-border flex flex-row items-center justify-start py-[18px] px-[19px] max-w-full border-[2px] border-solid border-gray-600">
                      <input
                        className="w-full [border:none] [outline:none] bg-[transparent] h-[17px] flex-1 flex flex-row items-center justify-start font-inter font-normal text-sm text-black-sub-text min-w-[194px] max-w-full"
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[3px] max-w-full text-left text-sm text-darkgray font-inter">
                  <div className="self-stretch flex flex-row items-center justify-start p-2.5">
                    <div className="relative font-semibold">Organization Name</div>
                  </div>
                  <div className="self-stretch rounded-8xs box-border flex flex-row items-center justify-start py-[18px] px-[19px] max-w-full border-[2px] border-solid border-gray-600">
                    <input
                      className="w-full [border:none] [outline:none] bg-[transparent] h-[17px] flex-1 flex flex-row items-center justify-start font-inter font-normal text-sm text-black-sub-text min-w-[250px] max-w-full"
                      placeholder="Organization Name"
                      name="organizationName"
                      value={profile.organizationName}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[3px] max-w-full text-left text-sm text-darkgray font-inter">
                  <div className="self-stretch flex flex-row items-center justify-start p-2.5">
                    <div className="relative font-semibold">Email</div>
                  </div>
                  <div className="self-stretch rounded-8xs box-border flex flex-row items-center justify-start py-[18px] px-[19px] max-w-full border-[2px] border-solid border-gray-600">
                    <input
                      className="w-full [border:none] [outline:none] bg-[transparent] h-[17px] flex-1 flex flex-row items-center justify-start font-inter font-normal text-sm text-black-sub-text min-w-[250px] max-w-full"
                      placeholder="Email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[3px] max-w-full text-left text-sm text-darkgray font-inter">
                  <div className="self-stretch flex flex-row items-center justify-start p-2.5">
                    <div className="relative font-semibold">Phone</div>
                  </div>
                  <div className="self-stretch rounded-8xs box-border flex flex-row items-center justify-start py-[18px] px-[19px] max-w-full border-[2px] border-solid border-gray-600">
                    <input
                      className="w-full [border:none] [outline:none] bg-[transparent] h-[17px] flex-1 flex flex-row items-center justify-start font-inter font-normal text-sm text-black-sub-text min-w-[250px] max-w-full"
                      placeholder="Phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq450:flex-wrap">
                <button className="cursor-pointer [border:none] py-[15px] px-5 bg-button rounded-3xs flex flex-row items-center justify-center whitespace-nowrap hover:bg-mediumslateblue-100">
                  <div className="relative text-sm font-semibold font-inter text-color text-left inline-block min-w-[97px]">
                    Save Changes
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
        </main>
        </div>
  );
};

export default Profile;