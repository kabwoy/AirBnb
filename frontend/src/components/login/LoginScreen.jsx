import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from '../../features/auth/authSlice'
import logo from '../../Airbnb.png'


const LoginScreen = () => {
  const dispatch = useDispatch();
  const { user, success, error, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    name:" ",
    password: "",
  });

  let location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  let navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }

    if (error) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    if (user && success) {
      toast.success('Login Successfull', {
        position: toast.POSITION.TOP_CENTER
      })
    }
    dispatch(reset());
  }, [dispatch, user,redirect, navigate, error, message, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("email is required!", {
        position:toast.POSITION.TOP_CENTER
      });
    }else if (!formData.password) {
      toast.error("Password is required!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    dispatch(login(formData));
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
            alt="airbnb"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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
                 autoComplete="off"
                 onChange={(e) => onChangeHandler(e)}
                  id="email"
                  name="email"
                  type="email"
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
                
              </div>
              <div className="mt-2">
                <input
                 value={formData.password}
                 onChange={(e) => onChangeHandler(e)}
                 autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
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
                Sign in
              </button>
            </div>
          </form>
          <p>
              Don't have an account?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Sign Up
              </Link>
            </p>
        </div>
      </div>
  );
};

export default LoginScreen;