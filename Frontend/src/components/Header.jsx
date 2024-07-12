import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  // console.log("User Header", user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <>
      <header className="fixed w-full z-40 bg-darkslategray-400">
        <div className=" container mx-auto bg-darkslategray-400 flex flex-wrap justify-around sm:justify-between gap-y-3 px-4 py-1 font-semibold text-white gap-3">
          <div className="">
            <Link to={"/"}>
              <img
                className="h-8 sm:h-12 min-w-min"
                src="public/logo.jpg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex justify-center items-center text-black">
              <input
                className="py-1 px-3 max-sm:w-40 max-sm:h-7 rounded-l-lg outline-none focus:bg-slate-100"
                type="text"
                id="Searchbox"
                placeholder="Search Products"
                onChange={handleSearch}
                value={search}
              />
              <button className=" sm:text-2xl py-1 px-2 max-sm:h-7 bg-orange hover:text-darkslategray-400 rounded-r-lg text-white">
                <IoSearchSharp />
              </button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className=" relative flex justify-center">
              {user?._id && (
                <div
                  className=" text-3xl cursor-pointer"
                  onClick={() => setMenuDisplay((preve) => !preve)}
                >
                  <BiSolidUserCircle />
                </div>
              )}

              {menuDisplay && (
                <div className=" absolute bg-lightgray border border-black text-black text-lg bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                  <nav>
                    <div className="flex justify-center items-center">
                      <Link
                        to={"/order"}
                        className=" hover:text-orange"
                        onClick={() => setMenuDisplay((preve) => !preve)}
                      >
                        Order
                      </Link>
                    </div>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to={"/admin-panel/all-products"}
                        className="whitespace-nowrap hover:text-orange"
                        onClick={() => setMenuDisplay((preve) => !preve)}
                      >
                        Admin Panel
                      </Link>
                    )}

                    <div
                      className="flex justify-center text-center"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      <button
                        onClick={handleLogout}
                        className="hover:text-orange flex justify-center items-center gap-2 "
                      >
                        <BiLogOut />
                        Logout
                      </button>
                    </div>
                  </nav>
                </div>
              )}
            </div>

            <div className="flex gap-2 items-center ">
              {user?._id ? (
                ""
              ) : (
                <Link
                  to={"/login"}
                  className="hover:text-orange focus:text-orange flex gap-2 items-center"
                >
                  Login
                </Link>
              )}
            </div>

            <div className="h-[27px] w-0.5 bg-white " />
            <div className="flex gap-2 items-center ">
              {user?._id ? (
                ""
              ) : (
                <Link
                  to={"/register"}
                  className="hover:text-orange focus:text-orange"
                >
                  Register
                </Link>
              )}
            </div>

            {user?._id && (
              <Link
                to={"/cart"}
                className="flex justify-center items-center gap-2 font-bold relative"
              >
                <span className="w-9">
                  {/* <img src="src\assets\cart.svg" alt="cart" /> */}
                  <img src="public\cart.svg" alt="cart" />
                </span>
                <div className="text-white flex items-center justify-center absolute m-auto">
                  <p className=" text-lg">{context?.cartProductCount}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
