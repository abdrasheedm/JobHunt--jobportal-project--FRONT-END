import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import MembershipPlanModal from "../../Modals/MembershipPlanModal/MembershipPlanModal";
import ProfileCard from "../../Recruiter/ProfileCard/ProfileCard";

function RecruiterProfile() {
  const profile_id = localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));
  const [planModal, setPlanModal] = useState(false)

  const isActive = () => {
    axios.get(`membership-purchase-view/?user_id=${profile_id}`,{
      headers: {
        Authorization: `Bearer ${token.access}`
      }
    }).then((res) => {
      console.log(res.data, '-------------------------------');

      if(res.data===''){
        console.log('null');
        setPlanModal(true)
      }
    })
  }
  const handelOnClose = () => {
    document.body.style.overflow = "unset";
    setPlanModal(false);
  };

  const [profile, setProfile] = useState([]);
  const fetchProfile = () => {
    axios
      .get(`company-profile/?id=${profile_id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        localStorage.setItem("CompanyProfile", JSON.stringify(res.data));
        setProfile(res.data);
      });
  };

  useEffect(() => {
    fetchProfile();
    isActive();
  }, [planModal]);
  const navigate = useNavigate();

  return (
    <div className="bg-primary lg:py-20">
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Basic Information</h1>
              <button
                className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg"
                onClick={() => {
                  navigate("/recruiter-edit-profile");
                }}
              >
                Edit profile
              </button>
            </div>

            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">EMPLOYER ID</h1>
                <p className="font-bold "> # {profile.employer_id}</p>
              </div>
              <div>
                <h1 className="mb-3">EMAIL</h1>
                <p className="text-sm font-bold overflow-x-auto">
                  {profile.recruiter?.email}
                </p>
              </div>
              <div>
                <h1 className="mb-3">PHONE NUMBER</h1>
                <p className="font-bold ">{profile.recruiter?.phone_number} </p>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">LOCATION</h1>
                <p className="font-bold "> {profile.head_office_location}</p>
              </div>
              <div></div>
              <div>
                <h1 className="mb-3">FOUNDER</h1>
                <p className="font-bold ">{profile.founder} </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Gallery</h1>
              <button className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg">
                Add Photo
              </button>
            </div>

            <div className="grid grid-cols-3 mt-8">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s"
                  alt=""
                />
              </div>
              <div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-8">
              <div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <MembershipPlanModal visible={planModal} onClose={handelOnClose}/>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
