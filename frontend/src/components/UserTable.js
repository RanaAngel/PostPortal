import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm';
import CreateUserForm from './CreateUserForm';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/get_users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete_user/${userId}`);
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
          <table className="w-full text-left text-gray-500">
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
                <tr key={user._id}>
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
                      className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
