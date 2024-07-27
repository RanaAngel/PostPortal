// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AdminNavbar from '../components/AdminNavbar';
// import AdminSidebar from '../components/AdminSidebar';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const UserPost = () => {
//   const [userpost, setUserPost] = useState([]);
//   const [users, setUsers] = useState({});

//   useEffect(() => {
//     fetchUserPosts();
//     fetchUsers();
//   }, []);

//   const fetchUserPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/admin/get_post');
//       setUserPost(response.data);
//     } catch (error) {
//       console.error('Error fetching user posts:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/admin/get_users');
//       const usersMap = response.data.reduce((acc, user) => {
//         acc[user._id] = user;
//         return acc;
//       }, {});
//       setUsers(usersMap);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       await axios.delete(`http://localhost:5000/admin/delete_post/${postId}`);
//       setUserPost(userpost.filter(post => post._id !== postId));
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   const showToast = (message, onConfirm, onCancel) => {
//     toast(
//       ({ closeToast }) => (
//         <div className="flex flex-col items-start p-4">
//           <p className="mb-2">{message}</p>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => {
//                 onConfirm();
//                 closeToast();
//               }}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Confirm
//             </button>
//             <button
//               onClick={() => {
//                 onCancel();
//                 closeToast();
//               }}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ),
//       { closeOnClick: false, autoClose: false }
//     );
//   };

//   const confirmDelete = (postId) => {
//     showToast(
//       'Do you really want to delete this post?',
//       () => handleDelete(postId),
//       () => console.log('Delete cancelled')
//     );
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;

//   // Calculate indices for slicing the posts array
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;

//   // Slice the posts array to include only posts for the current page
//   const currentPosts = userpost.slice(indexOfFirstPost, indexOfLastPost);

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Generate page numbers
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(userpost.length / postsPerPage); i++) {
//     pageNumbers.push(i);
//   }
//   return (
//     <div className="w-full relative bg-color overflow-hidden flex flex-row items-start justify-start tracking-[normal] leading-[normal] mq1050:pr-5 mq1050:box-border">
//       <AdminSidebar />
//       <main className="flex-1 flex flex-col items-end justify-start gap-[4px] max-w-[calc(100%_-_222px)] lg:max-w-full">
//         <AdminNavbar
//           gettingStarted="Getting Started"
//           mingcuteuser4Line="/mingcuteuser4line-1.svg"
//         />
//         <section className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-[15px] px-[49px] pb-[98px] box-border gap-[10px] max-w-full lg:pt-5 lg:pb-16 lg:box-border mq825:pb-[42px] mq825:box-border mq1400:pl-6 mq1400:pr-6 mq1400:box-border">
//         <ToastContainer />
//       <div className="bg-white p-4 rounded-md shadow-md w-full">
//         <h2 className="text-xl font-bold mb-4">User's Post Table</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-gray-500">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">UserId</th>
//                 <th className="px-4 py-2">User</th>
//                 <th className="px-4 py-2">Post Content</th>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentPosts.map((post, index) => {
//                 const user = users[post.userID] || {};
//                 const displayDate = post.scheduledAt ? post.scheduledAt : post.postedAt;
//                 return (
//                   <tr key={post._id} className="border-t border-gray-200">
//                     <td className="px-4 py-2">{indexOfFirstPost + index + 1}</td>
//                     <td className="px-4 py-2">{`${user.firstName || ''} ${user.lastName || ''}`}</td>
//                     <td className="px-4 py-2">{post.content}</td>
//                     <td className="px-4 py-2">{new Date(displayDate).toLocaleString()}</td>
//                     <td className="px-4 py-2">
//                       <button className="px-2 py-1 bg-green-500 text-white cursor-pointer rounded-md mr-2 hover:bg-green-600">Edit</button>
//                       <button className="px-2 py-1 bg-red-500 text-white cursor-pointer rounded-md hover:bg-red-600" onClick={() => confirmDelete(post._id)}>Delete</button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer"
//           >
//             &larr; Previous
//           </button>
//           <ul className="flex list-style-none">
//             {pageNumbers.map((number) => (
//               <li key={number} className={`mx-1`}>
//                 <button
//                   onClick={() => handlePageChange(number)}
//                   className={`px-4 py-2 rounded-md text-sm font-medium ${
//                     number === currentPage
//                       ? 'bg-button text-white'
//                       : 'bg-button text-white border border-blue-500 hover:bg-purple-600 cursor-pointer'
//                   }`}
//                 >
//                   {number}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === pageNumbers.length}
//             className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer"
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     </section>
//       </main>
     
//     </div>
//   );
// };

// export default UserPost;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPost = () => {
  const [userpost, setUserPost] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetchUserPosts();
    fetchUsers();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/get_post');
      setUserPost(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/get_users');
      const usersMap = response.data.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setUsers(usersMap);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete_post/${postId}`);
      setUserPost(userpost.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

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
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                onCancel();
                closeToast();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { closeOnClick: false, autoClose: false }
    );
  };

  const confirmDelete = (postId) => {
    showToast(
      'Do you really want to delete this post?',
      () => handleDelete(postId),
      () => console.log('Delete cancelled')
    );
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Calculate indices for slicing the posts array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Slice the posts array to include only posts for the current page
  const currentPosts = userpost.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userpost.length / postsPerPage); i++) {
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
        <ToastContainer />
      <div className="bg-white p-4 rounded-md shadow-md w-full">
        <h2 className="text-xl font-bold mb-4">User's Post Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-500">
            <thead>
              <tr>
                <th className="px-4 py-2">UserId</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Post Content</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => {
                const user = users[post.userID] || {};
                const displayDate = post.scheduledAt ? post.scheduledAt : post.postedAt;
                return (
                  <tr key={post._id} className="border-t border-gray-200">
                    <td className="px-4 py-2">{indexOfFirstPost + index + 1}</td>
                    <td className="px-4 py-2">{`${user.firstName || ''} ${user.lastName || ''}`}</td>
                    <td className="px-4 py-2 ">{post.content}</td>
                    <td className="px-4 py-2">{new Date(displayDate).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <div className='Flex1 Flex flex-wrap justify-between'>
                      <button className="px-2 py-1 bg-red-500 text-white cursor-pointer rounded-md hover:bg-red-600" onClick={() => confirmDelete(post._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer"
          >
            &larr; Previous
          </button>
          <ul className="flex list-none">
            {pageNumbers.map((number) => (
              <li key={number} className={`mx-1`}>
                <button
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    number === currentPage
                      ? 'bg-button text-white'
                      : 'bg-button text-white border border-blue-500 hover:bg-purple-600 cursor-pointer'
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className="px-4 py-2 bg-button text-white border border-gray-300 rounded-md hover:bg-purple-600 cursor-pointer"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </section>
      </main>
     
    </div>
  );
};

export default UserPost;