// ContactTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/get_contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="bg-white text-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Contacts Table</h2>
      <table className="w-full text-left text-gray-500">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{contact.firstName}</td>
              <td className="px-4 py-2">{contact.lastName}</td>
              <td className="px-4 py-2">{contact.email}</td>
              <td className="px-4 py-2">{contact.message}</td>
              <td className="px-4 py-2">
                <button className="px-2 py-1 bg-green-500 text-white rounded-md mr-2">Edit</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
