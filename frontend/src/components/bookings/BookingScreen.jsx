import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBookings } from '../../features/bookings/BookingsSlice'
import Bookings from './Bookings'

const BookingScreen = () => {
  const{loading, success, bookings} = useSelector((state)=>state.bookings)
  const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBookings())
    },[dispatch, success])
    
    if(loading){
        return <h1>Loading...</h1>
    }
  return (
    <div>
        <h3>My Bookings</h3>
        {
            <Bookings bookings={bookings}/>
        }
    </div>
  )
}

export default BookingScreen