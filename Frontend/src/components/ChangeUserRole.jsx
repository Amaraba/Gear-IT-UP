import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);

    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }

    console.log("role updated", responseData);
  };

  return (
    <div className="fixed inset-0 w-full h-full z-10 flex justify-between items-center bg-lightgray bg-opacity-45">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className="flex items-center justify-between my-2">
          <p>Role :</p>
          <select
            className="border p-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-orange text-white hover:bg-darkslategray-400"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
