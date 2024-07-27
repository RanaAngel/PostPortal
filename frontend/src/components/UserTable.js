import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm';
import CreateUserForm from './CreateUserForm';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://44.207.233.50:5000/admin/get_users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://44.207.233.50:5000/admin/delete_user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
    setEditingUser(null);
  };

  const handleCreate = () => {
    setCreatingUser(true);
  };

  const handleCreateSave = (newUser) => {
    setUsers([...users, newUser]);
    setCreatingUser(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setCreatingUser(false);
  };

  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <AdminSidebar />
    <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
        <AdminNavbar
            gettingStarted="Getting Started"
            mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-[15px] px-[49px] pb-[98px] box-border gap-[10px] max-w-full lg:pt-5 lg:pb-16 lg:box-border mq825:pb-[42px] mq825:box-border mq1400:pl-6 mq1400:pr-6 mq1400:box-border">
        <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Users Table</h2>
      {creatingUser ? (
        <CreateUserForm onSave={handleCreateSave} onCancel={handleCancel} />
      ) : editingUser ? (
        <EditUserForm user={editingUser} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div>
          <button
            onClick={handleCreate}
            className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create User
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-left text-gray-500">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Organization Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">User Type</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.firstName}</td>
                    <td className="px-4 py-2">{user.lastName}</td>
                    <td className="px-4 py-2">{user.organizationName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{user.usertype}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </section>
    </main>
    </div>
  );
};

export default UserTable;
