import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import ProfileCard from "../../../Seeker/ProfileCard/SProfileCard";
import JobCard from "../../../Cards/JobCard/JobCard";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


function FavouriteJobs() {
  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");
  const [jobs, setJobs] = useState([]);
  const fetchJobs = () => {
    axios
      .get(`favourite-job-list/?seeker_id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
      });
  };

  const RemoveFromFavourite = (jobID) => {
    axios
      .get(`seeker-remove-favourited-job/?job_id=${jobID}&seeker_id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire("Congratulations!", `${res.data.message} !`, "success");
      });
  };


  useEffect(() => {
    fetchJobs();
  }, []);


  return (
    <div className="bg-primary lg:py-20">
      <div className="capitalize text-center text-4xl font-black">
        Favourite jobs
      </div>
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
            
            {jobs ? (<div>
                {jobs.map((job, index) => {
                return(
          <JobCard job = {job} RemoveFromFavourite = {RemoveFromFavourite} />
                )
            })}
            </div>) : (
                <div className="text-center text-2xl font-bold text-red-600 mt-20">
                NO FAVOURITED JOBS
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default FavouriteJobs;
