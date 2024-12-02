import React, { useState } from 'react'

export default function NewPassword() {
  const [isLoading, setIsLoading] = useState(false);

  return <>
  

  <div className='pt-16 pb-80 w-full max-w-lg mx-auto'>
  <h2 className="text-3xl py-6 text-sky-700 font-bold">Create New Password</h2>
  <form className="mx-auto">

    {/* Password Input */}
    <div className="relative mx-auto z-0 mb-5 group">
      <input
        type="password"
        name="password"
        id="password"
        className="block py-2.5 px-0 w-full sm:w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
        placeholder=" "
      />
      <label htmlFor="password"className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter New Password:</label>
    </div>

    {/* Confirm Password Input */}
    <div className="relative z-0 mx-auto mb-5 group">
      <input
        type="password"
        name="rePassword"
        id="rePassword"
        className="block py-2.5 px-0 w-full sm:w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:sky-emerald-600 peer"
        placeholder=" "
      />
      <label
        htmlFor="rePassword"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Confirm New Password:
      </label>
    </div>

    {/* Submit Button */}
    {isLoading ? (
      <button
        type="button"
        className="text-white bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-3 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-700"
      >
        <i className="fas fa-spinner fa-spin-pulse"></i>
      </button>
    ) : (
      <button
        type="submit"
        className="text-white gap-y-4 bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
      >
        Submit
      </button>
    )}

  </form>
</div>

  
  
  </>
}
