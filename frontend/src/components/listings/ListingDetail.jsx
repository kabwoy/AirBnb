import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleListing } from '../../features/listings/listingsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
const LISTINGBASEURL ='http://localhost:5005/listings';

function ListingDetail() {
    const [singleListing , setSingleListing] = useState({})
    const {id} = useParams()
    const tokenFromLocalStorage = localStorage.getItem('user');
    const navigate = useNavigate()
    const {email} = JSON.parse(tokenFromLocalStorage)
    const deleteListing = async (id) =>{

      const { token } = JSON.parse(tokenFromLocalStorage);
      const config ={
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
      }
      try{       
          const response = await axios.delete(`http://localhost:5005/listings/${id}`, config);
          navigate("/")
          toast.error("Listing deleted Successfully")
          console.log(response.data)
          return;
       }catch(error){
          console.log("Error in getting the listing by id ", error);
      }


    }
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
            setSingleListing(response.data)
            console.log(response.data)
            return;
         }catch(error){
            console.log("Error in getting the listing by id ", error);
        }
    }

    useEffect(()=>{
        getListingById(id)
    }, [])

  return (
    <div>
<section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={singleListing.listing?.thumbnail}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{id}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{singleListing.listing?.title}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" strokeWidth="currentColor" strokeLinecap="round" strokeLinejoin="round"  className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" strokeWidth="currentColor" strokeLinecap="round" strokeLinejoin="round"  className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" strokeWidth="currentColor" strokeLinecap="round" strokeLinejoin="round"  className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" strokeWidth="currentColor" strokeLinecap="round" strokeLinejoin="round"  className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" strokeWidth="currentColor" strokeLinecap="round" strokeLinejoin="round"  className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-2 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-2 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div className="flex ml-6 items-center">
           
            <div className="relative">
            
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="title-font font-medium text-2xl text-gray-900">${singleListing.listing?.price}</span>
          {singleListing.listing?.owner == email && 
          <div className='flex'>
            <button className="flex ml-auto mx-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() => deleteListing(singleListing.listing?.id)} >Delete</button>
            <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={() => navigate(`/listings/${singleListing.listing?.id}/edit`)}>Update</button>
            </div>}
            <button className="flex ml-auto mx-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={() =>  navigate(`/bookings/${singleListing.listing?.id}/new`)} >Book</button>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default ListingDetail