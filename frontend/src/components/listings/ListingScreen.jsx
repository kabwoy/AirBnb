import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getListings } from '../../features/listings/listingsSlice'
import Listings from './Listings'

const ListingScreen = () => {
  const{loading, success, listings} = useSelector((state)=>state.listings)
  const dispatch = useDispatch()
  let location = useLocation()
  console.log(location.pathname);
    useEffect(() => {
        dispatch(getListings())
    },[dispatch])
    console.log(listings);
    if(loading){
        return <h1>Loading...</h1>
    }

  return (
    <div className="row">
          <Listings listings={listings}/>
    </div>
  )
}

export default ListingScreen