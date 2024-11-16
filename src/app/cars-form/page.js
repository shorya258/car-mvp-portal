"use client"
import React from "react";


const carsForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("changes saved");
  };
  return (
    <div className="flex flex-col p-5 items-center bg-gray-300">
      <h1 className="text-4xl font-extrabold text-indigo-900">
        Enter the details of your car
      </h1>
      <form className="bg-white px-10 py-5">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      workcation.com/
                    </span>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          <div className="flex justify-evenly p-3">
            <button onClick={handleSubmit} type="submit" className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg  font-semibold leading-6 shadow-sm hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out " >
              Submit
            </button>
            <button className="flex w-1/2 mx-2 px-3 py-1.5 justify-center rounded-md border-2 border-solid border-gray-300 hover:border-none text-sm md:text-lg font-semibold leading-6 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:-translate-y-1 transition-transform duration-300 ease-in-out">
              Cancel
            </button>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default carsForm;
