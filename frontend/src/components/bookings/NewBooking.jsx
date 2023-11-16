// NewBooking.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewBooking = () => {
  const [data, setData] = useState({
    startDate: new Date().toISOString().split('T')[0], 
    endDate: new Date().toISOString().split('T')[0], 
  });
  const { id: listingId } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/bookings/new/${listingId}`, {
        dateRange: {
          startDate: data.startDate,
          endDate: data.endDate,
        },
      });

      const { bookingId } = response.data;
      console.log(`Booking created with ID: ${bookingId}`);
     navigate(`/bookings/${bookingId}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          name="startDate"
          id="start-date"
          value={data.startDate}
          onChange={handleChange}
        />

        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          name="endDate"
          id="end-date"
          value={data.endDate}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewBooking;
