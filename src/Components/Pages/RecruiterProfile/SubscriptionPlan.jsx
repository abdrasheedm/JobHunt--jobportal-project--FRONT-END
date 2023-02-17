import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import MembershipPlanModal from "../../Modals/MembershipPlanModal/MembershipPlanModal";
import ProfileCard from "../../Recruiter/ProfileCard/ProfileCard";

function PlanDetails() {
  const profile_id = localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));

  const [planDetails, setPlanDetails] = useState([])
  const fetchPlan = () => {
    axios.get(`plan-details-view/?user_id=${profile_id}`, {
      headers: {
        Authorization: `Bearer ${token.access}`
      }
    }).then((res) => {
      setPlanDetails(res.data)
      console.log(res.data);
    })
  }

  const [planModal, setPlanModal] = useState(false)
  const handelOnClose = () => {
    document.body.style.overflow = "unset";
    setPlanModal(false);
  };

  useEffect(() => {
    fetchPlan()
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
              <h1 className="text-xl font-bold">Current Plan</h1>
              <button
                className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg"
                onClick={() => {
                  setPlanModal(true)
                }}
              >
                Add Plan
              </button>
            </div>

            <div className="grid grid-cols-3 mt-8">

              <div>
                <h1 className="mb-3">Package Name</h1>
                <p className="font-bold "> # {planDetails[0]?.user.membership.title}</p>
              </div>
              <div>
                <h1 className="mb-3">Validity</h1>
                <p className="text-sm font-bold overflow-x-auto">
                  {planDetails[0]?.user.membership.duration}
                </p>
              </div>
              <div>
                <h1 className="mb-3">Activation Date</h1>
                <p className="font-bold ">{planDetails[0]?.activation_date} </p>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">Expiry Date</h1>
                <p className="font-bold "> {planDetails[0]?.expiry_date}</p>
              </div>
              <div></div>
              <div>
                <h1 className="mb-3">Status</h1>
                <p className="font-bold ">{planDetails[0]?.is_active ? 'Active' : 'Expired'} </p>
              </div>
            </div>
          </div>
          <MembershipPlanModal visible={planModal} onClose={handelOnClose}/>
         
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
