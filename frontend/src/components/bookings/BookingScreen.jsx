import axios from 'axios';
import React, {useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const tokenFromLocalStorage = localStorage.getItem("user");
const BookingScreen = () => {
  const [bookings , setBookings] = useState([])
  const auth = useAuth()
  const getBookings = async (id) => {
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:5005/bookings`,
        config
      );
      setBookings(response.data.bookings)
      return;
    } catch (error) {
      console.log("Error in getting the listing by id ", error);
    }
  };

  const acceptBooking = async(id)=>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5005/bookings/accept/${id}`,
        {},
        config
      );
      toast.success("Booking Accepted Successfully")
      return;
    } catch (error) {
      console.log("Error in getting the listing by id ", error);
    }
  }

  const rejectBooking = async(id)=>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:5005/bookings/decline/${id}`,
        {},
        config
      );
      toast.success("Booking Declined Successfully")
      window.location.reload()
      return;
    } catch (error) {
      console.log("Error in getting the listing by id ", error);
    }
  }
  useEffect(()=>{
    const res = getBookings()
    console.log(bookings);
  } , [])
  return (
    <div>
        <h3 className='text-center font-bold text-3xl mb-4'>My Bookings</h3>
<div class="relative p-6 ml-[10rem] overflow-x-auto">
    <table class="w-[80%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    ListingId
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    TotalPrice
                </th>
                <th scope="col" class="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
          {bookings && bookings.map((booking)=> (
             <tr key={booking.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
             <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {booking.id}
             </th>
             <td class="px-6 py-4">
             {booking.listingId}
             </td>
             <td class="px-6 py-4">
             {booking.status}
             </td>
             <td class="px-6 py-4">
                 {booking.totalPrice}
             </td>

             <td class="px-6 flex  ml-4 py-4">
                    {booking.status == 'accepted' && <p className='text-green-400 font-bold mr-3'>Accepted</p>}
                    {booking.status == 'pending' && <button onClick={()=>acceptBooking(booking.id)} disabled={auth.email !== booking.owner ? '' : 'true'} class="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">Accept Booking</button>}
                    {booking.status == 'pending' && <button  disabled={auth.email !== booking.owner ? '' : 'true'} onClick={() => rejectBooking(booking.id)} class="font-medium  dark:text-blue-500 hover:underline text-red-500">Reject Booking</button>}
                </td>
         </tr>
          ))}
           
        </tbody>
    </table>
</div>

       
    </div>
  )
}

export default BookingScreen