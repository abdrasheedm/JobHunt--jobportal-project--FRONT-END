import React from "react";
import profile from "../../../assets/card1.webp";

function RecruiterProfile() {
  return (
    <div className="bg-primary sm:px-10 lg:py-20 lg:px-40">
      <div className="grid lg:grid-cols-3">
        <div className="bg-white lg:m-20 lg:p-10 rounded-2xl drop-shadow-2xl">
          <div className="flex justify-center">
            <img className="h-40 w-40 rounded-full" src={profile} alt="" />
          </div>
          <div className="flex flex-col items-center m-3">
            <h1 className="text-xl font-bold m-3">COMPANY NAME</h1>
            <h1 className="text-sm font-normal m-3">COMPANY type</h1>
            <p className="text-center">
              JB IT Solutions develops digital solutions and experiences that
              help digital-first business models by designing, engineering, and
              delivering them. For long-term innovation, we have the most
              extensive digital engineering experience and client-centric
              methodology.
            </p>
          </div>
        </div>
        <div className="bg-white m-20 p-16 col-span-2 rounded-2xl drop-shadow-2xl">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Basic Information</h1>
            <button className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg">
              Edit profile
            </button>
          </div>

          <div className="grid grid-cols-3 mt-8">
            <div>
                <h1 className="mb-3">EMPLOYER ID</h1>
                <p className="font-bold "> #132ee4325433</p>
            </div>
            <div>
            <h1 className="mb-3">EMAIL</h1>
                <p className="text-sm font-bold ">rasheed@gmail.com</p>

            </div>
            <div>
            <h1 className="mb-3">PHONE NUMBER</h1>
                <p className="font-bold ">+91 730600306</p>

            </div>
          </div>
          <div className="grid grid-cols-3 mt-8">
            <div>
                <h1 className="mb-3">LOCATION</h1>
                <p className="font-bold "> New Joursey, USA</p>
            </div>
            <div>
            </div>
            <div>
            <h1 className="mb-3">YEARS</h1>
                <p className="font-bold ">25 YEARS</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
