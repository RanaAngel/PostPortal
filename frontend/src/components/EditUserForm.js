import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.firstName) {
      formIsValid = false;
      errors.firstName = 'First Name is required';
    }

    if (!formData.lastName) {
      formIsValid = false;
      errors.lastName = 'Last Name is required';
    }

    if (!formData.organizationName) {
      formIsValid = false;
      errors.organizationName = 'Organization Name is required';
    }

    if (!formData.email) {
      formIsValid = false;
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors.email = 'Email is not valid';
    }

    if (!formData.phone) {
      formIsValid = false;
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      formIsValid = false;
      errors.phone = 'Phone number should be 10 digits';
    }

    if (!formData.usertype) {
      formIsValid = false;
      errors.usertype = 'User Type is required';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      onSave(formData);
    } else {
      console.log('Form has errors.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Organization Name</label>
        <input
          type="text"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">User Type</label>
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
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
