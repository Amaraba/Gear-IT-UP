import React from "react";
import CANCELIMAGE from "../assets/cancel.gif";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 mt-7 rounded">
      <img
        src={CANCELIMAGE}
        width={150}
        height={150}
        className="mix-blend-multiply"
      />
      <p className="text-red font-bold text-xl">Payment Declined</p>
      <Link
        to={"/cart"}
        className="p-2 px-3 mt-5 border-2 border-orange rounded font-semibold text-orange hover:bg-orange hover:text-white"
      >
        Go To Cart
      </Link>
    </div>
  );
};

export default Cancel;
