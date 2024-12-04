import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Reset() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await axios.post('https://booking-lessons-production.up.railway.app/api/password-reset/reset-password', { email })
      alert('Password reset link sent to your email')
      toast.success('Password reset link sent to your email')
      setEmail('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='container pt-16 pb-48'>
      <div className="w-96 mx-auto">
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Confirm Email
          </label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <div className='pt-2'>
          <button 
            type="submit"
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  )
}

