import axios from 'axios';

const LISTINGBASEURL ='http://localhost:5005/listings';

// const PUBLISH_URL = 'http://localhost:5005/listings/publish'

//get token from localStorage
const tokenFromLocalStorage = localStorage.getItem('user');


//fetch all listings
const bookings = async () =>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.get(LISTINGBASEURL, config);

        console.log('listing:', response);
        return response.data;
    }catch(error){
        console.log('Error in fetching data', error);
    }
   
}

//create new listing
const createBooking =async (data)=>{
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try{
        const response=await axios.post(`LISTINGBASEURL/${'new'}`, data,config);
        return response.data
    }catch(error){
        console.log("Error in creating a new Listing", error);
    }
}

//fetch a particular listing by `id`
const getBookingById=(id)=> {
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
        console.log("Error in getting the booking by id ", error);
    }
}

//update listing based on a given `id`
const updateBooking = async (id, updatedBooking) =>{ 
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.put(`${LISTINGBASEURL}/${id}`,updatedBooking ,config );
        return response.data;
    }catch(err){
        console.log("Error in updating the booking", err);
    }
}

//delete booking based on a given `id`
const deleteBooking = (id)=>{
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
        console.log("Error in deleting the booking", error);
    }
}

const bookingsAPIService = {bookings, getBookingById, createBooking, updateBooking, deleteBooking};
export default bookingsAPIService;