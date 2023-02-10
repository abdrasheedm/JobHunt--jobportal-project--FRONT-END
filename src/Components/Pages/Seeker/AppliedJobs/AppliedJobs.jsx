import React, { useEffect, useState } from "react";
import JobCard from "../../../Cards/JobCard/JobCard";
import ProfileCard from "../../../Recruiter/ProfileCard/ProfileCard";
import axios from "../../../../axios";

function AppliedJobs() {
  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");
  const [jobs, setJobs] = useState([]);
  const fetchJobs = () => {
    axios
      .get(`applied-jobs/?seeker_id=${profileId}`, {
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
      .get(
        `seeker-remove-favourited-job/?job_id=${jobID}&seeker_id=${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      )
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
        Applied jobs
      </div>
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div>
            {jobs.map((job, index) => {
              <JobCard job={job} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;
