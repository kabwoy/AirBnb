import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { register } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import logo from '../../Airbnb.png'

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, success, error, message } = useSelector(
    (state) => state.auth
  );

  let navigate = useNavigate();


  useEffect(() => {
    if (error) {
      return (
        <div className="alert alert-danger alert-dismissible">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <strong>failed!</strong> {message}
        </div>
      );
    }
  }, [user, navigate, success, error, message]);

  const submitHandler =  (e) => {
    
    e.preventDefault();
    if (!formData.name) {
      toast.error("Name is required!");
    } else if (!formData.email) {
      toast.error("Email Address is required!");
    } else if (!formData.password) {
      toast.error("Password is required!");
    }else {
      toast.success("Details submitted successfully!");
      navigate("/login");
    }
    dispatch(register(formData));
    console.log(formData);
  };

  //on change handler
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt="Airbnb"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                value={formData.email}
                onChange={(e) => onChangeHandler(e)}
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                value={formData.name}
                onChange={(e) => onChangeHandler(e)}
                id="name"
                name="name"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>


          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">

              </div>
            </div>
            <div className="mt-2">
              <input
                placeholder="qWh5$64W#"
                value={formData.password}
                onChange={(e) => onChangeHandler(e)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>



  );
};

export default RegisterScreen;
