import axios from 'axios';

const LISTINGBASEURL ='http://localhost:5005/listings';

const PUBLISH_URL = 'http://localhost:5005/listings/publish'
const UNPUBLISHURL = 'http://localhost:5005/listings/unpublish'


//get token from localStorage
const tokenFromLocalStorage = localStorage.getItem('user');


//fetch all listings
const listings = async () =>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.get(LISTINGBASEURL, config);

        console.log('listing:', response.data);
        return response.data;
    }catch(error){
        console.log('Error in fetching data', error);
    }
   
}

//create new listing
const createListing =async (newListing)=>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try{
        const response=await axios.post(`${LISTINGBASEURL}/new`, newListing,config);
        return response.data
    }catch(error){
        console.log("Error in creating a new Listing", error);
    }
}

//fetch a particular listing by `id`
const getListingById=(id)=> {
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{       
        const response = axios.get(`${LISTINGBASEURL}/${id}`, config);
        return response.data;
     }catch(error){
        console.log("Error in getting the listing by id ", error);
    }
}

//update listing based on a given `id`
const updateListing = async (id, updatedListing) =>{ 
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.put(`${LISTINGBASEURL}/${id}`,updatedListing ,config );
        return response.data;
    }catch(err){
        console.log("Error in updating the listing", err);
    }
}

//delete listing based on a given `id`
const deleteListing = (id)=>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response =  axios.delete(`${LISTINGBASEURL}/${id}`, config);
        return response.data;
    }catch(error){
        console.log("Error in deleting the listing", error);
    }
}

//publish listing based on a given `id`
const publishListing = async (id, publishedListing) =>{ 
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.put(`${PUBLISH_URL}/${id}`,publishedListing ,config );
        return response.data;
    }catch(err){
        console.log("Error in publishing the listing", err);
    }
}

//unpublish listing based on a given `id`
const unpublishListing = async (id, unpublishedListing) =>{ 
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.put(`${UNPUBLISHURL}/${id}`,unpublishedListing ,config );
        return response.data;
    }catch(err){
        console.log("Error in publishing the listing", err);
    }
}
// review listing
const reviewListing = async (listingId, bookingId,reviewedListing) =>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={ 
        headers:{   
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }
    try{
        const response=await axios.post(`${LISTINGBASEURL}/${listingId}/review/${bookingId}`,reviewedListing,config);
        return response.data;
    }
    catch(error){
        console.log('Error in posting reviews', error);
    }
}
const listingsAPIService = {listings, createListing,getListingById,updateListing, deleteListing, publishListing, unpublishListing, reviewListing};
export default listingsAPIService;