import {useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const tokenFromLocalStorage = localStorage.getItem("user");

const UpdateListing = () => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [address, setAddress] = useState();
  const [thumbnail, setThumbnail] = useState();
  const navigate = useNavigate()
  const { id } = useParams();

  const submitHandler = async (e) => {
    e.preventDefault()
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const updateObject = {title , price , address , thumbnail}
    try {
     const response =  await axios.put(`http://localhost:5005/listings/${id}` , updateObject , config)
     navigate("/")
     toast.success("listing updated successfully!");
     return
    } catch (error) {
      throw new Error(error)
    }
  

  };
  async function getListing(id) {
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:5005/listings/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error in getting the listing by id ", error);
      return error;
    }
  }


  useEffect(() => {
    const res = getListing(id);
    res.then((listings) => {
      const { listing } = listings;
      setTitle(listing.title)
      setAddress(listing.address)
      setPrice(listing.price)
      setThumbnail(listing.thumbnail)
    });
  }, [id]);


  // view
  return (
    <>
      <div className="flex justify-center mt-[4rem]">
        <form className="w-full max-w-lg" onSubmit={submitHandler}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="title"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Kempiski Villa Rosa"
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                htmlFor="address"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="address"
                type="text"
                placeholder="Westlands"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="address"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Thumbnail
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Albuquerque"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.thumbnail)}
                name="thumbnail"
              />
            </div>

            <button
              type="submit"
              className="flex mt-4 w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateListing;
