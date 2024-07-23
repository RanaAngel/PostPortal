import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPost = ({ closeViewPostModal }) => {
    const [userpost, setUserPost] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/dashboard/get_post');
            setUserPost(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    const filteredPosts = userpost.filter(post => {
        return (
            (filter === 'all' || post.platform === filter) &&
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full mx-auto">
                    <div className="bg-gray-50 px-4 py-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.75 1.75 0 01-3.5 0V5.882M2.807 6.22a1.75 1.75 0 01-.53-.193l-.75-.312m15.44 7.159V19.24a1.75 1.75 0 01-3.5 0V13.382m.53-.193l.75-.312" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    View All Posts
                                </h3>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="Search By Post Name"
                                        className="flex-grow p-2 border border-gray-300 rounded-md"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <select
                                        className="ml-4 p-2 border border-gray-300 rounded-md"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    >
                                        <option value="all">All</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="facebook">Facebook</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-4 py-3 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                            {filteredPosts.map((post) => (
                                <div key={post.userID} className="bg-white p-4 rounded-lg shadow-md">
                                    <img
                                        src={post.imageURL || "/path-to-your-image.jpg"}
                                        alt={post.title}
                                        className="w-full h-40 object-cover rounded-md mb-2"
                                    />
                                    <h2 className="text-lg font-bold">{post.content}</h2>
                                    <p className="text-gray-600">{new Date(post.postedAt).toLocaleString()}</p>
                                    <div className="mt-2 flex justify-end space-x-2">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:py-4">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closeViewPostModal}
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPost;
