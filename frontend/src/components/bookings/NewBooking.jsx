// NewBooking.js
import React, { useEffect, useState } from "react";
import moment from 'moment'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";
const tokenFromLocalStorage = localStorage.getItem('user');
const NewBooking = () => {
  const { id: listingId } = useParams();
  const [listing , setListing] = useState({})
  const [startDate , setStartDate] = useState('')
  const [endDate , setEndDate] = useState('')
  const navigate = useNavigate();

  const getListingById=async (id)=> {
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{       
        const response = await axios.get(`http://localhost:5005/listings/${id}`, config);
        setListing(response.data)
        console.log(response.data)
        return;
     }catch(error){
        console.log("Error in getting the listing by id ", error);
    }
}

const submitHandler = async (e)=>{
  e.preventDefault()
  const stDate = moment(startDate)
  const edDate = moment(endDate)
  const days = stDate.diff(edDate , 'days')
  console.log(days);
  const bookingObject = {
    dateRange:{
      start_date:startDate,
      end_date:endDate
    },
    totalPrice:listing.listing.price * -days
  }

  const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{       
        const response = await axios.post(`http://localhost:5005/bookings/new/${listingId}`, bookingObject ,config);
        setListing(response.data)
        console.log(response.data)
        return;
     }catch(error){
      toast.error(error.message)
        console.log("Error in getting the listing by id ", error);
    }
  console.log(bookingObject)

}

useEffect(()=>{
  getListingById(listingId)
}, [])

  return (
    <form onSubmit={submitHandler}>
    <div>
      <div class="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
        <div class="flex flex-col justify-start items-start w-full space-y-9">
          <div class="flex justify-start flex-col items-start space-y-2">
            <button class="flex flex-row items-center text-gray-600 dark:text-white hover:text-gray-500 space-x-1">
              <svg
                class="fill-stroke"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91681 7H11.0835"
                  stroke="currentColor"
                  stroke-width="0.666667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.91681 7L5.25014 9.33333"
                  stroke="currentColor"
                  stroke-width="0.666667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.91681 7.00002L5.25014 4.66669"
                  stroke="currentColor"
                  stroke-width="0.666667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <p class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-50">
              Make A Booking
            </p>
            <p class="text-base leading-normal sm:leading-4 text-gray-600 dark:text-white"></p>
          </div>

          <div class="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
            <div class="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
              <div class="flex flex-col justify-start items-start w-full space-y-4">
                <p class="text-xl md:text-2xl leading-normal text-gray-800 dark:text-gray-50">
                {listing.listing?.title}
                </p>
                <p class="text-base font-semibold leading-none text-gray-600 dark:text-white">
                ${listing.listing?.price}
                </p>
              </div>
              <div class="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                <img
                  src={listing.listing?.thumbnail}
                  alt="headphones"
                />
              </div>
            </div>

            <div class="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
              <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                Start Date
              </label>

              <div class="mt-8">
                <input
                  class="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                  type="date"
                  onChange={(e)=>{
                    setStartDate(e.target.value)
                  }}
                  name=""
                  id=""
                  placeholder="Email"
                />
              </div>

              <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                End Date
              </label>
              <div class="mt-2 flex-col">
                <div>
                  <input
                    class="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="date"
                    onChange={(e)=>{
                      setEndDate(e.target.value)
                    }}
                    name=""
                    id=""
                    placeholder=""
                  />
                </div>
              </div>

              <button type="submit" class="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                <div>
                  <p class="text-base leading-4">Book</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
};

export default NewBooking;
