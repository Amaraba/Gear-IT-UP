import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //To check password and confirm password
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.Register.url, {
        method: SummaryApi.Register.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }

      // console.log("data", dataApi);
    } else {
      // console.log("Please Check Password And Confirm Password");
      toast.error("!Password And Confirm Password Must Be Same");
    }
  };

  // console.log("data login", data);

  return (
    <>
      <section id="register">
        <div className="container flex min-h-min flex-1 flex-col justify-center items-center align-middle px-6 py-4 lg:px-8 border-[3px] border-gray-400 rounded-xl w-full max-w-md mx-auto my-5">
          <div className="mx-auto text-4xl text-darkslategray-400">
            <BiSolidUserCircle />
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-orange">
              Register a New Account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-md font-bold leading-6 text-gray-900"
                >
                  User Name:
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    value={data.name}
                    type="name"
                    autoComplete="name"
                    onChange={handleOnChange}
                    placeholder="Enter User Name Here"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 px-2 focus:bg-slate-100 font-medium placeholder:font-normal"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-bold leading-6 text-gray-900"
                >
                  Email Address:
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={data.email}
                    type="email"
                    autoComplete="email"
                    onChange={handleOnChange}
                    placeholder="Enter Email Address Here"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 px-2 focus:bg-slate-100 font-medium placeholder:font-normal"
                  />
                </div>
              </div>
              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-md font-bold leading-6 text-gray-900"
                  >
                    Password:
                  </label>
                </div>
                <div className="mt-2 flex  border-0 rounded-md ring-1 ring-gray-400">
                  <input
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password Here"
                    autoComplete="current-password"
                    minlength="5"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:bg-slate-100 sm:text-sm sm:leading-6 px-2 font-medium placeholder:font-normal"
                  />
                  <div
                    className=" cursor-pointer flex justify-center items-center border-0 rounded-md ring-1 ring-gray-400 text-xl hover:bg-slate-100 hover:ring-1 hover:ring-gray-900 w-7"
                    onClick={() => setshowPassword((preve) => !preve)}
                  >
                    <span>{showPassword ? <IoIosEye /> : <IoIosEyeOff />}</span>
                  </div>
                </div>
              </div>
              {/* Confirm Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-md font-bold leading-6 text-gray-900"
                  >
                    Confirm Password:
                  </label>
                </div>
                <div className="mt-2 flex  border-0 rounded-md ring-1 ring-gray-400">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleOnChange}
                    type={showConfirmPassword ? "text" : "Password"}
                    value={data.confirmPassword}
                    placeholder="Confirm Your Password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:bg-slate-100 sm:text-sm sm:leading-6 px-2 font-medium placeholder:font-normal"
                  />
                  <div
                    className=" cursor-pointer flex justify-center items-center border-0 rounded-md ring-1 ring-gray-400 text-xl hover:bg-slate-100 hover:ring-1 hover:ring-gray-900 w-7"
                    onClick={() => setshowConfirmPassword((preve) => !preve)}
                  >
                    <span>
                      {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex mx-auto justify-center rounded-3xl bg-orange px-7 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkslategray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-2 text-center text-sm text-gray-500">
              You Have a Account?{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
