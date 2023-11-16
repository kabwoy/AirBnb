import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/hooks/useSelector'
import { deleteBooking } from '../../features/bookings/BookingsSlice'

const Bookings = ({ bookings }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <section>
            <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
                <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
                    {
                        bookings && bookings.bookings.map((booking) => {
                            return (
                                <div key={booking.id}>
                                    <Link to={`/bookings/${booking.id}`}>
                                        <div className="p-6">
                                            <img className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src={listing.thumbnail} alt="blog" />
                                            <div className="inline-flex justify-between w-full">
                                                <h1 className="mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{booking.totalPrice}.</h1>
                                                <span>${booking.dateRange}</span>
                                            </div>
                                        </div>
                                        <button type='submit' onClick={()=>{
                                            dispatch(deleteBooking(booking.id))
                                            navigate('/bookings')
                                        }}>delete</button>
                                    </Link>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    )
}

export default Bookings