import React from 'react'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Listings = ({listings}) => {

  return (
    <section>
    <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
       
        <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">

        {listings &&
            listings.listings?.map((listing) => {
              
            return <Link key={listing.id} to={`/listings/${listing.id}`}>

            <div  >
                <img className="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src={listing.thumbnail} alt="blog"/>
                <div className="inline-flex justify-around  w-full">
                    <h1 className="mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600">{listing.title}.</h1>
                    <p className="mx-auto ml-[3rem]  text-base font-medium leading-relaxed text-gray-500">
                    <LocationOnIcon/>
                    {listing.address}
                    </p>
                    <span>$ {listing.price}</span>
                </div>
        
                
            
            </div>
            </Link>
            })}
        </div>
    </div>
</section>
  )
}

export default Listings