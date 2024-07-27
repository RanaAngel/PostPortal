import React, { useState } from 'react';
import axios from 'axios';

const CreateUserForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    email: '',
    phone: '',
    password: '',  // Add password field
    usertype: '',  // Default to 'free'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/create_user', formData);
      onSave(response.data);
      alert('User created successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

<section className="w-full flex flex-row items-start justify-start py-0 px-8 lg:px-16 max-w-[1200px] mx-auto text-left text-sm text-color font-inter">
  <div className="flex-1 flex flex-col items-end justify-start gap-[20px] max-w-full lg:gap-[24px]">
    <div className="flex flex-row items-center justify-start cursor-pointer"onClick={onCancel}  >
      <div className="rounded-3xs bg-button flex flex-row items-center justify-end py-[8px] px-2">
        <div className="flex flex-row items-center justify-center p-2">
          <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[70px]">
            View Lists
          </a>
        </div>
      </div>
    </div>
    <div className="self-stretch flex flex-row items-start justify-start max-w-full text-[24px] text-text-colors">
      <div className="w-full flex flex-row items-start justify-start gap-[50px] flex-wrap">
        <div className="h-[400px] w-[300px] flex flex-col items-start justify-start pt-[60px] px-4 pb-0 box-border min-w-[300px] max-w-full lg:flex-1 lg:pt-[80px] lg:px-6">
          <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[10px]">
            <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
              <h2 className="m-0 relative text-inherit font-semibold font-inherit inline-block min-w-[108px] text-[20px]">
                Add User
              </h2>
            </div>
            <div className="self-stretch flex-1 flex flex-col items-center justify-center p-2.5">
              <img
                className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
                loading="lazy"
                alt=""
                src="/95ba66434f85ea111bc97dcb33d85d72-1@2x.png"
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="m-0 flex-1 flex flex-col items-end justify-center gap-[10px] min-w-[400px] max-w-full">
          <div className="self-stretch flex flex-col items-end justify-start max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full lg:self-stretch lg:w-auto">
              <div className="self-stretch flex flex-row items-center justify-start py-0 px-0 box-border gap-[10px] max-w-full flex-wrap">
                <div className="flex flex-row gap-[10px] w-full">
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-bold mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-1">Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-1">User Type</label>
                <select
                  name="usertype"
                  value={formData.usertype}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-end gap-[10px]">
            <button type="submit" className="rounded-3xs bg-button flex flex-row items-center justify-center py-[12px] px-4 hover:bg-button-hover cursor-pointer ">
              <div className="relative text-sm font-semibold text-color text-left inline-block min-w-[46px]">
                Create
              </div>
            </button>
            <button type="button" onClick={onCancel} className="rounded-3xs flex flex-row items-center justify-center py-2 px-4 border-[2px] border-solid border-button hover:border-button-hover cursor-pointer">
              <span className="relative text-sm font-semibold text-button text-left inline-block min-w-[48px] hover:text-button-hover">
                Cancel
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

 );
  };
 
export default CreateUserForm;