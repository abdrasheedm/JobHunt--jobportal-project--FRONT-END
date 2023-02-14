import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import ProfileCard from "../../Recruiter/ProfileCard/ProfileCard";

function PlanDetails() {
  const profile_id = localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));

  const [profile, setProfile] = useState([]);
  // const fetchProfile = () => {
  //   axios.get(`company-profile/?id=${profile_id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token.access}`
  //     }
  //   }).then((res) => {
  //     localStorage.setItem('CompanyProfile', JSON.stringify(res.data))
  //     setProfile(res.data)
  //   })
  // }

  useEffect(() => {
    // fetchProfile()
  }, []);
  const navigate = useNavigate();

  return (
    <div className="bg-primary lg:py-20">
      <h1 className="text-center text-3xl font-bold">Plan Details</h1>
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold"></h1>
              <button
                className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg"
                onClick={() => {
                  navigate("/recruiter-edit-profile");
                }}
              >
                Add Plan
              </button>
            </div>

            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">Package Name</h1>
                <p className="font-bold "> # {profile.employer_id}</p>
              </div>
              <div>
                <h1 className="mb-3">Validity</h1>
                <p className="text-sm font-bold overflow-x-auto">
                  {profile.recruiter?.email}
                </p>
              </div>
              <div>
                <h1 className="mb-3">Activation Date</h1>
                <p className="font-bold ">{profile.recruiter?.phone_number} </p>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">Expiry Date</h1>
                <p className="font-bold "> {profile.head_office_location}</p>
              </div>
              <div></div>
              <div>
                <h1 className="mb-3">Status</h1>
                <p className="font-bold ">{profile.founder} </p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
