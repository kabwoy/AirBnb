import React from 'react';
import { Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterScreen from './components/register/RegisterScreen';
import LoginScreen from './components/login/LoginScreen';
import ListingScreen from './components/listings/ListingScreen';
import CreateListing from './components/listings/CreateListing';
import Header from './components/Header';
import ListingDetail from './components/listings/ListingDetail';
import UpdateListing from './components/listings/UpdateListing';
import NewBooking from './components/bookings/NewBooking';

function App () {
  return (
    <>Let&apos;s go!
    <div>
      <Header/>
      <Routes>
        <Route path="/" exact element={<ListingScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/listings/new" element={<CreateListing />} />
        <Route path="/bookings/:id/new" element={<NewBooking />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/listings/:id/edit" element={<UpdateListing />} />
      </Routes>
      <ToastContainer />
    </div>
    </>
  );
}     

export default App;
