// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import EditUserForm from './EditUserForm';
// import CreateUserForm from './CreateUserForm';
// import AdminNavbar from '../components/AdminNavbar';
// import AdminSidebar from '../components/AdminSidebar';

// const UserTable = () => {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [creatingUser, setCreatingUser] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/admin/get_users');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     try {
//       await axios.delete(`http://localhost:5000/admin/delete_user/${userId}`);
//       setUsers(users.filter(user => user._id !== userId));
//       alert('User deleted successfully');
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//   };

//   const handleSave = (updatedUser) => {
//     setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
//     setEditingUser(null);
//   };

//   const handleCreate = () => {
//     setCreatingUser(true);
//   };

//   const handleCreateSave = (newUser) => {
//     setUsers([...users, newUser]);
//     setCreatingUser(false);
//   };

//   const handleCancel = () => {
//     setEditingUser(null);
//     setCreatingUser(false);
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10; // Number of posts per page

//   // Calculate indices for slicing the posts array
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;

//   // Slice the posts array to include only posts for the current page
//   const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Generate page numbers
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }
//   return (
//     <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
//     <AdminSidebar />
//     <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
//         <AdminNavbar
//             gettingStarted="Getting Started"
//             mingcuteuser4Line="/mingcuteuser4line-1.svg"
//         />
//         <section className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-[15px] px-[49px] pb-[98px] box-border gap-[10px] max-w-full lg:pt-5 lg:pb-16 lg:box-border mq825:pb-[42px] mq825:box-border mq1400:pl-6 mq1400:pr-6 mq1400:box-border">
//       <div className="bg-white p-4 rounded-md shadow-md w-full">
//         <div className="flex justify-between items-center mb-4">
//           <input
//             type="text"
//             placeholder="Search by user name"
//             className="p-2 border rounded-md"
//           />
//           <button
//             onClick={handleCreate}
//             className="bg-button text-white px-4 py-2 rounded-md hover:bg-purple-600 cursor-pointer"
//           >
//             + Add User
//           </button>
//         </div>
//         <h2 className="text-xl font-bold mb-4">Users Table</h2>
//         {creatingUser ? (
//           <CreateUserForm onSave={handleCreateSave} onCancel={handleCancel} />
//         ) : editingUser ? (
//           <EditUserForm user={editingUser} onSave={handleSave} onCancel={handleCancel} />
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white text-left text-gray-500">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2">User ID</th>
//                   <th className="px-4 py-2">Email</th>
//                   <th className="px-4 py-2">First Name</th>
//                   <th className="px-4 py-2">Last Name</th>
//                   <th className="px-4 py-2">Organization</th>
//                   <th className="px-4 py-2">User Type</th>
//                   <th className="px-4 py-2">Phone</th>
//                   <th className="px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, index) => (
//                   <tr key={user._id} className="border-t">
//                     <td className="px-4 py-2">{index + 1}</td>
//                     <td className="px-4 py-2">{user.email}</td>
//                     <td className="px-4 py-2">{user.firstName}</td>
//                     <td className="px-4 py-2">{user.lastName}</td>
//                     <td className="px-4 py-2">{user.organizationName}</td>
//                     <td className="px-4 py-2">{user.usertype}</td>
//                     <td className="px-4 py-2">{user.phone}</td>
//                     <td className="px-4 py-2 flex gap-2">
//                       <button
//                         onClick={() => handleEdit(user)}
//                         className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
//                       >
//                         <i className="fas fa-edit"></i>
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <div className="flex justify-between items-center mt-4">
//           <button className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer">
//             &larr; Previous
//           </button>
//           <ul className="flex list-style-none">
//             {pageNumbers.map((number) => (
//               <li key={number} className={`mx-1`}>
//                 <button
//                   onClick={() => handlePageChange(number)}
//                   className={`px-4 py-2 rounded-md text-sm font-medium ${
//                     number === currentPage
//                       ? 'bg-button text-white cursor-pointer hover:bg-purple-600'
//                       : 'text-white bg-button border border-blue-500 hover:bg-purple-600 cursor-pointer'
//                   }`}
//                 >
//                   {number}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer">
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     </section>
//     </main>
//     </div>
//   );
// };

// export default UserTable;
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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Number of posts per page

  // Calculate indices for slicing the posts array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Slice the posts array to include only posts for the current page
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
    <AdminSidebar />
    <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
        <AdminNavbar
            gettingStarted="Getting Started"
            mingcuteuser4Line="/mingcuteuser4line-1.svg"
        />
        <section className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-[15px] px-[49px] pb-[98px] box-border gap-[10px] max-w-full lg:pt-5 lg:pb-16 lg:box-border mq825:pb-[42px] mq825:box-border mq1400:pl-6 mq1400:pr-6 mq1400:box-border">
      <div className="bg-white p-4 rounded-md shadow-md w-full">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by user name"
            className="p-2 border rounded-md"
          />
          <button
            onClick={handleCreate}
            className="bg-button text-white px-4 py-2 rounded-md hover:bg-purple-600 cursor-pointer"
          >
            + Add User
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Users Table</h2>
        {creatingUser ? (
          <CreateUserForm onSave={handleCreateSave} onCancel={handleCancel} />
        ) : editingUser ? (
          <EditUserForm user={editingUser} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          
          <div className="overflow-x-auto rounded-t-lg">
            <div className="rounded-lg border border-gray-200"></div>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold text-gray-900">User ID</th>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold text-gray-900">Email</th>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold  text-gray-900">First Name</th>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold  text-gray-900">Last Name</th>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold  text-gray-900">Organization</th>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold  text-gray-900">User Type</th>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold  text-gray-900">Phone</th>
                  <th className="whitespace-nowrap px-2 py-2 font-Bold  text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {users.map((user, index) => (
                  <tr key={user._id} className="border-t">
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{index + 1}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.firstName}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.lastName}</td>
                    <td className="pwhitespace-nowrap px-4 py-2 text-gray-700">{user.organizationName}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.usertype}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.phone}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
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
        <div className="flex justify-between items-center mt-4">
          <button className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer">
            &larr; Previous
          </button>
          <ul className="flex list-none">
            {pageNumbers.map((number) => (
              <li key={number} className={`mx-1`}>
                <button
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    number === currentPage
                      ? 'bg-button text-white cursor-pointer hover:bg-purple-600'
                      : 'text-white bg-button border border-blue-500 hover:bg-purple-600 cursor-pointer'
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
          <button className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer">
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
    </main>
    </div>
  );
};

export default UserTable;
