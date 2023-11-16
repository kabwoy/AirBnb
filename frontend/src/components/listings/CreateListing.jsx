import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createNewListing } from '../../features/listings/listingsSlice';

const CreateListing = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        price: "",
        thumbnail: " ",
        metadata: " ",

    });

    const submitHandler = (e) => {

        e.preventDefault();
        if (!formData.title) {
            toast.error("title is required!");
        } else if (!formData.price) {
            toast.error("Price is required!");
        } else if (!formData.thumbnail) {
            toast.error("thumbnail is required!");
        } else {
            toast.success("listing added successfully!");
            navigate("/");
        }
        dispatch(createNewListing(formData));
        console.log(formData);
    };

    //on change handler
    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
       console.log(formData);
    };
    return (
        <>
            <div className='flex justify-center mt-[4rem]'>
                <form className="w-full max-w-lg" onSubmit={submitHandler}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor='title' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Title
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder="Kempiski Villa Rosa"
                                type="text"
                                id="title"
                                name='title'
                                value={formData.title}
                                onChange={onChangeHandler}
                            />
                            
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label htmlFor='address' className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Address
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="address" type="text" placeholder="Westlands"
                                value={formData.address}
                                onChange={onChangeHandler}
                                name='address'
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Price
                            </label>
                            <input  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="50"
                                value={formData.price}
                                onChange={onChangeHandler}
                                name='price'
                            />
                            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Thumbnail
                            </label>
                            <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" 
                            value={formData.thumbnail}
                            onChange={onChangeHandler}
                            name='thumbnail'
                            />
                        </div>
                      

                        <button
                            type="submit"
                            className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create Listing
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateListing