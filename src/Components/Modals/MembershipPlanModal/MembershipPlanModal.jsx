import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import Swal from "sweetalert2";

function MembershipPlanModal({ visible, onClose }) {
  if (!visible) return null;

  const toggleIsPresent = () => {
    setIsPresent(!isPresent);
  };
  //   console.log(Type)

  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");
  if(visible){
    document.body.style.overflow = 'hidden';
  }  

  //   const [profile, setProfile] = useState('')
  //   const fetchExperience = async () => {
  //     await axios.get(`seeker-experience-single/?id=${ExpId}`,{
  //       headers: {
  //         Authorization: `Bearer ${token.access}`,
  //       }
  //     }).then((res) => {
  //       setProfile(res.data)
  //       setJobTitle(res.data.job_title)
  //       setStartDate(res.data.start_date)
  //       setEndDate(res.data.end_date)
  //       setCompanyName(res.data.company_name)
  //       setLocation(res.data.location)
  //       setDescription(res.data.description)

  //     })
  //   }

  //   const [jobTitle, setJobTitle] = useState('')
  //   const [companyName, setCompanyName] = useState('')
  //   const [startDate, setStartDate] = useState('')
  //   const [endDate, setEndDate] = useState('')
  //   const [location, setLocation] = useState('')
  //   const [description, setDescription] = useState('')
  //   const [isPresent, setIsPresent] = useState(false)

  //   const handleJobTitle = (e) => {
  //     setJobTitle(e.target.value)
  //   }
  //   const handleCompanyName = (e) => {
  //     setCompanyName(e.target.value)
  //   }
  //   const handleStartDate = (e) => {
  //     setStartDate(e.target.value)
  //   }
  //   const handleEndDate = (e) => {
  //     setEndDate(e.target.value)
  //   }
  //   const handleLocation = (e) => {
  //     setLocation(e.target.value)
  //   }
  //   const handleDescription = (e) => {
  //     setDescription(e.target.value)
  //   }
  //   console.log(profile)

  //   useEffect(() => {
  //     if(Type==='edit'){
  //       fetchExperience()
  //     }
  //   }, [])

  //   function refreshPage() {
  //     window.location.reload(false);
  //   }

  //   const handleSubmit = (e) => {
  //     e.preventDefault()
  //     let data = {
  //       user_id : profileId,
  //       job_title : jobTitle,
  //         is_current : isPresent,
  //         start_date : startDate,
  //         company_name : companyName,
  //         location : location,
  //         description : description,
  //     }
  //     if(!isPresent){
  //       data.end_date = endDate

  //     }
  //     console.log(isPresent, data)

  //     if(Type==='add'){
  //       axios.post("post-seeker-experience/", data, {
  //         headers: {
  //           Authorization: `Bearer ${token.access}`,
  //         }
  //       }).then((res) => {
  //         Swal.fire(
  //           'Good job!',
  //           `${res.data.message} !`,
  //           'success'
  //         ).then((res)=>{
  //         // refreshPage()
  //         onClose()

  //         })
  //       })
  //     }else{
  //       axios.put(`update-seeker-experience/?id=${ExpId}`, data, {
  //         headers: {
  //           Authorization: `Bearer ${token.access}`,
  //         }
  //       }).then((res) => {
  //         Swal.fire(
  //           'Good job!',
  //           `${res.data.message} !`,
  //           'success'
  //         ).then((res)=>{
  //         // refreshPage()
  //         onClose()

  //         })
  //       })

  //     }

  //   };

  return (
    <div className="bg-gray-900 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5 w-3/4">
        <div>
          <h1 className="text-3xl font-bold my-5 mb-10">
            Please choose your Package
          </h1>
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-1 border mx-2  text-center py-10 px-5">
            <div className="text-gray-700 text-xl font-bold">Trial Plan</div>
            <span>₹ 0.00</span>
          </div>
          <div className="col-span-1 border mx-2  text-center py-10 px-5">
            <div className="text-gray-700 text-xl font-bold">Basic Plan</div>
            <span>₹ 499.00</span>
          </div>
          <div className="col-span-1 border mx-2  text-center py-10 px-5">
            <div className="text-gray-700 text-xl font-bold">
              Silver Plan
            </div>
            <span>₹ 999.00</span>

          </div>
          <div className="col-span-1 border mx-2  text-center py-10 px-5">
            <div className="text-gray-700 text-xl font-bold">Golden Plan</div>
            <span>₹ 1499.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipPlanModal;
