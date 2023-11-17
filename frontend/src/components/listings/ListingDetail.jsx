import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import StarRating from "../StarRating/StarRating";

function ListingDetail() {
  const [singleListing, setSingleListing] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { id } = useParams();
  const tokenFromLocalStorage = localStorage.getItem("user");
  const navigate = useNavigate();


  const toogleModal = () => setIsVisible((isVisible) => !isVisible);

  const { email } = JSON.parse(tokenFromLocalStorage);
  const deleteListing = async (id) => {
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `http://localhost:5005/listings/${id}`,
        config
      );
      navigate("/");
      toast.error("Listing deleted Successfully");
      console.log(response.data);
      return;
    } catch (error) {
      console.log("Error in getting the listing by id ", error);
    }
  };
  const getListingById = async (id) => {
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
      setSingleListing(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log("Error in getting the listing by id ", error);
    }
  };

  const handlePublishing = async (e) => {
    e.preventDefault();
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const publishingBody = {
      availability: [
        {
          start_date: startDate,
          end_date: endDate,
        },
      ],
    };
    try{
      await axios.put(`http://localhost:5005/listings/publish/${id}`, publishingBody , config);
      toast.success("Published Successfully")
      window.location.reload()
    }catch(error){
      toast.error(error.message)
    }
    
  };

  const handleUnpublish = async (e) => {
    const { token } = JSON.parse(tokenFromLocalStorage);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(config)
    try{
       await axios.put(`http://localhost:5005/listings/unpublish/${id}`, {}, config);
      toast.success("unpublished Successfully")
      window.location.reload()
    }catch(error){
      toast.error(error.message)
    }
    
  };

  useEffect(() => {
    getListingById(id);
  }, []);

  return (
    <div>
      {isVisible ? (
        <>
        
          <form onSubmit={handlePublishing}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Publish</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsVisible(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div class="mb-6">
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        First Date
                      </label>
                      <input
                        onChange={(e) => setStartDate(e.target.value)}
                        type="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                        required
                      />
                    </div>

                    <div class="mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                        required
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsVisible(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Publish Listing
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
        </>
      ) : null}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={singleListing.listing?.thumbnail}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {id}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {singleListing.listing?.title}
              </h1>
              <div className="flex mb-4">
                
                <StarRating/>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <div className="relative">
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${singleListing.listing?.price}
                </span>
                {singleListing.listing?.owner !== email && (
                  <button
                    className="flex ml-auto mx-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    onClick={() =>
                      navigate(`/bookings/${singleListing.listing?.id}/new`)
                    }
                  >
                    Book
                  </button>
                )}
                <div></div>
                {singleListing.listing?.owner === email && (
                  <div className="flex">
                    <button
                      className="flex ml-auto mx-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                      onClick={() => deleteListing(singleListing.listing?.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                      onClick={() =>
                        navigate(`/listings/${singleListing.listing?.id}/edit`)
                      }
                    >
                      Update
                    </button>
                    {singleListing.listing?.published &&  <button
                      className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 ml-4 rounded"
                      onClick={handleUnpublish}
                    >
                      Unpublish
                    </button> }
                    {!singleListing.listing?.published && <button
                      className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 ml-4 rounded"
                      onClick={toogleModal}
                    >
                      Publish
                    </button> }
                 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListingDetail;
