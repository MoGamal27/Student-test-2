import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { UserContext } from '../context/UserContext';

export default function MyAppointment() {
  const { teachers } = useContext(AppContext);
  const { PayWithPoints } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const { t } = useTranslation();
  const [showPayPal, setShowPayPal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isTextPoint, setIsTextPoint] = useState(false);
 
 
  const toggleText = () => {
    setIsTextVisible(!isTextVisible);
  };

  const toggleTextPoint = () => {
    setIsTextPoint(!isTextPoint);
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setStudentId(decodedToken.id); 
    }
  }, []);

  useEffect(() => {
    if (studentId) {
      fetchBookings();
    }
  }, [studentId]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`https://booking-lessons-production.up.railway.app/api/bookings/student/${studentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (bookingId) => {
    try {
      await axios.delete(`https://booking-lessons-production.up.railway.app/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const makePayment = (booking) => {
    setCurrentBooking(booking);
    setShowPayPal(true);
  };

  const handleApprove = (orderId) => {
    setShowPayPal(false);
    alert("Payment successful for order " + orderId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const groupBookingsByTeacher = () => {
    const grouped = {};
    bookings.forEach(booking => {
      if (!grouped[booking.teacherId]) {
        grouped[booking.teacherId] = {
          bookings: [],
          totalFees: 0,
          teacher: teachers.find(t => t.id === booking.teacherId)
        };
      }
      grouped[booking.teacherId].bookings.push(booking);
      grouped[booking.teacherId].totalFees += grouped[booking.teacherId].teacher?.fees || 0;
    });
    return grouped;
  };

  return (
    <section className='pb-80'>
      <div className='bg-sky-200 md:w-96'>
        <p className='pb-3 mt-12 bg-sky-200 flex justify-center items-center pt-2 font-medium text-zinc-700 border-b'>
          {t('MyAppointment')}
        </p>
        <div>
          {Object.values(groupBookingsByTeacher()).map(({ teacher, bookings, totalFees }) => (
            <div className='gap-4 bg-white sm:gap-6 p-2 border-b' key={teacher?.id}>
              <div className='justify-center items-center'>
                <img 
                  className='w-96 h-52 bg-indigo-50 object-cover' 
                  src={teacher?.image} 
                  alt={teacher?.name} 
                />
                <div className='text-sm pt-2  border-b text-zinc-600'>
                  <p className='text-neutral-800 pb-2 font-medium'>{teacher?.name}</p>
                  <p className="text-sm font-medium rounded-md">Total Fees: ${totalFees}</p>
                  
                  {/* Display all booking times */}
                  <div className='mt-2 flex border-b justify-between font-semibold'>
                    <p className='font-medium'>Booking Times:</p>
                    {bookings.map((booking, index) => (
                      <p key={index} className='mt-1 font-semibold'>
                        {booking.slotDate} / {booking.slotTime}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className='flex flex-col gap-2 justify-between mt-4'>
                <button
                  className='text-sm text-white text-center bg-blue-500 sm:min-w-48 py-2 border rounded hover:bg-blue-700 hover:text-white transition-all duration-300'
                  onClick={() => makePayment(bookings)}
                >
                  {t('Pay All')} (${totalFees})
                </button>
  
                <button
                  className='text-sm text-stone-500 text-center bg-gray-200 sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'
                  onClick={() => bookings.forEach(b => handleCancelAppointment(b.id))}
                >
                  {t('Cancel All')}
                </button>
  
                <button
                  className="text-sm text-black text-center bg-yellow-500 sm:min-w-48 py-2 border rounded hover:bg-yellow-700 hover:text-white transition-all duration-300"
                  onClick={() => PayWithPoints(bookings[0].id, studentId)}
                >
                  {t('Pay with Points')}
                </button>
              </div>
            </div>
          ))}
        </div>

      {/* PayPal Script Provider for Payments */}
      {showPayPal && (
        
        <PayPalScriptProvider options={{ "client-id": "AfhUouOs3xx6CHsWXPhX1K9dUfk0231k2U-8Nra2NkkTRdBdyIkOZVHkbnqEf-E54oMjXlfHTBe8Ddl6" }}>
          <div className="paypal-container mt-6">
        <div className="container mx-auto">
         {/* Button to toggle text visibility */}
         <button
        onClick={toggleText}
        className="bg-blue-500 text-white py-2 px-4 w-full rounded-md mb-4 hover:bg-blue-700 transition duration-300"
      >
        {isTextVisible ? 'Close' : 'Pay with Paybox'}
      </button>

           {/* Conditional Rendering of Text */}
          {isTextVisible && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700">
          <p>
            You can send us the amount to this number (+972 54-648-7767), and after you transfer the money, send a screenshot to customer service to confirm your booking.
          </p>
          <p className="mt-2">
            You can send the screenshot from here 👈{' '}
            <a href="https://wa.me/972546487767" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
              WhatsApp icon
            </a>.
          </p>
        </div>
      )}
      </div>

      <PayPalButtons
      createOrder={async (data, actions) => {
        const response = await axios.post('https://booking-lessons-production.up.railway.app/api/payment/create-order', {
          bookings: bookings.map((booking) => booking.id),
        });
        return response.data.orderID;
      }}
      onApprove={(data, actions) => {
        handleApprove(data.orderID);
      }}
      onError={(err) => {
        console.error("PayPal Checkout onError", err);
        alert("Payment failed. Please try again.");
      }}
     
    />
  </div>
        </PayPalScriptProvider>
      )}
    </div>
  </section>
);
}

  
