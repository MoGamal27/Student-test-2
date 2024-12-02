import React, { useState } from 'react'

export default function Reset() {

  return <>

<form className='container  pt-28 pb-64 '>
    <div class="w-96 mx-auto">
      <h1 className='block mb-2  font-medium text-2xl text-sky-700 dark:text-sky-700'>Account recovery</h1>
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
    <div className='pt-2'>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </div>
    </div>
</form>

  
  
  </>
}
