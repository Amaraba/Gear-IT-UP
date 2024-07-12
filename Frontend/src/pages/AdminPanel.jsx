import React, { useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-96px)] flex">
      <aside className=" bg-lightgray min-h-full w-full max-w-64">
        <div className="flex justify-center items-center flex-col">
          <div className=" text-5xl flex justify-center mt-5 text-orange">
            <BiSolidUserCircle />
          </div>
          <p className=" capitalize text-lg font-bold">{user?.name} </p>
          <p className=" text-gray-700 text-sm font-medium pb-5">
            {user?.role}{" "}
          </p>
        </div>
        <div className=" w-full h-0.5 bg-gray-700 " />

        {/* Navigation */}
        <div className="">
          <nav className="grid p-3">
            <Link
              to={"all-users"}
              className="px-2 py-1 font-medium hover:bg-darkslategray-100 hover:text-white focus:bg-darkslategray-400 focus:text-white"
            >
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="px-2 py-1 font-medium hover:bg-darkslategray-100 hover:text-white focus:bg-darkslategray-400 focus:text-white"
            >
              All Products
            </Link>
            <Link
              to={"all-orders"}
              className="px-2 py-1 font-medium hover:bg-darkslategray-100 hover:text-white focus:bg-darkslategray-400 focus:text-white"
            >
              All Orders
            </Link>
          </nav>
        </div>
      </aside>

      <main className=" w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
