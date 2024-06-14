import React from 'react'

export default function CreatePost() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white-100 p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="file" className="block mb-2 text-gray-700 font-bold">
              Choose File
            </label>
            <input
              type="file"
              id="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2 text-gray-700 font-bold">
              Post Description
            </label>
            <textarea
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-700 font-bold">
              Post Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="date" className="block mb-2 text-gray-700 font-bold">
                Insert Date
              </label>
              <input
                type="date"
                id="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input type="radio" id="instagram" name="platform" />
              <label htmlFor="instagram" className="text-gray-700 font-bold">
              Instagram
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="twitter" name="platform" />
              <label htmlFor="twitter" className="text-gray-700 font-bold">
                Twitter
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="facebook" name="platform" />
              <label htmlFor="facebook" className="text-gray-700 font-bold">
                Facebook
              </label>
            </div>
          </div>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}