import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";

const AboutUs = () => {
  return (
    <div>
      <div className="container mx-auto bg-darkslategray-100 ">
        <div className="text-orange font-bold text-center p-4 text-2xl underline underline-offset-4">
          ABOUT US
        </div>
        <div className="h-0.5 w-11/12 bg-white mx-auto " />
        <div className=" text-white text-lg p-7 text-center font-medium">
          At Gear IT Up, we're more than just a computer store. As Bangalore's
          premier team of tech enthusiasts, we're dedicated to a common passion:
          creating high-performance, customized PCs that empower individuals and
          businesses to reach their full potential.
          <br />
          <br />
          Our love for PCs drives us to build the perfect system for you. With a
          team of dedicated experts, we blend our knowledge and enthusiasm to
          design bespoke PC solutions that match your unique requirements and
          budget. Whether you're a dedicated gamer, a creative professional, or
          a business in need of reliable workstations, we're here to guide you
          every step of the way. Trust us to build a PC that not only meets but
          exceeds your expectations.
        </div>

        <div className="h-0.5 w-11/12 bg-white mx-auto p-[1.5px] " />

        <div className="text-orange font-bold text-center p-4 text-2xl underline underline-offset-4">
          CONTACT US
        </div>
        <div className="h-0.5 w-11/12 bg-white mx-auto" />

        <div className="grid grid-cols-3 items-center justify-around text-white p-4 text-center sm:text-lg sm:font-medium">
          <div className="flex gap-2 justify-center items-center">
            <FaLocationDot />
            Address
          </div>
          <div className="flex gap-2 justify-center items-center">
            <FaPhoneVolume /> Phone Number
          </div>
          <div className="flex gap-2 justify-center items-center">
            <IoTimeSharp /> Timings
          </div>
        </div>

        <div className="grid grid-cols-3 items-center justify-around text-white p-4 text-center sm:text-lg">
          <div className="gap-2 justify-center items-center">
            <div className="">
              The National College,
              <br /> Basavanagudi, Banglore-560004
            </div>
          </div>
          <div className="gap-2 justify-center items-center">
            {/* <div className=" ">1234567890</div> */}
            <a className="cursor-pointer underline underline-offset-4" href="https://wa.me/message/Y33ZSJGWCOKJL1">8884433663</a>
          </div>

          <div className="gap-2 justify-center items-center">
            <div className=" ">11.00 Am to 8.00 Pm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
