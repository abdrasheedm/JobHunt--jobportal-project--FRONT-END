import axios from "../../../../axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function SeekerJobView() {
  const locat = useLocation();
  const jobID = locat.state?.data;
  const token = JSON.parse(localStorage.getItem("token"));
  const seekerId = localStorage.getItem('profile_id')
  const [jobData, setJobData] = useState({});
  const [companyData, setCompanyData] = useState("");

  const [jobId, setJobId] = useState()
  const [recruiterId, setRecruiterId] = useState()
  const [resume, setResume] = useState()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastName = (e) => {
    setLastName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePhone = (e) => {
    setPhone(e.target.value)
  }
  const handleResume = (e) => {
    setResume(e.target.files[0])
  }



  const fetchJobDetails = async () => {
    await axios
      .get(`view-single-job/?id=${jobID}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobData(res.data);
        setCompanyData(res.data.company_id);
        setJobId(res.data.id)
        setRecruiterId(res.data.recruiter_id)
      });
  };

  const BASEURL = `http://127.0.0.1:8000${companyData?.company_logo}`;

  useEffect(() => {
    fetchJobDetails();
  }, []);
  console.log(jobData)

  return (
    <div
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1410260.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="">
        <div className="font-bold text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase">{jobData.job_title}</h1>
        </div>
        <div className="grid lg:grid-cols-6 xl:px-40 container mx-auto">
          <div className="col-span-4">
            <div className="px-10 py-5  my-10 shadow-xl rounded-lg  bg-slate-50 bg-opacity-50">
              <div className="my-10 px-10 py-5 border-b-2 border-gray-200 flex justify-between">
                <div className="p-5 mt-3 mr-5 bg-gray-100 rounded-xl">
                  <img
                    src="https://preview.colorlib.com/theme/jobsco/assets/img/icon/1.svg"
                    alt=""
                  />
                </div>

                <div>
                  <h1 className="text-2xl my-5 font-semibold text-gray-600">
                    {jobData.job_title}
                  </h1>
                  <div className="flex justify-between">
                    <h1 className="">{jobData.location}</h1>
                    <h1 className="">{jobData.job_type}</h1>
                  </div>
                </div>
                <div className="">
                  <p className="bg-green-100 p-2 rounded bg-opacity-60 text-myGreen hover:text-white hover:bg-green-400 hover:bg-opacity-50 mt-4">
                    <i class="fa-regular fa-2xl fa-heart"></i>
                  </p>
                </div>
              </div>
              <div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">
                    Job Description
                  </h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    &ensp;&ensp;&ensp;{jobData.full_description}
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">
                    Minimum Qualification
                  </h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    Applicant should have atleast &nbsp;
                    <span className="font-semibold">
                      {jobData.qualification?.title}
                    </span>{" "}
                    qualification.
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">Category</h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    This Job is under the
                    <span className="font-semibold">
                      {jobData.category?.category_name}
                    </span>{" "}
                    category
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">Department</h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    This job comes under{" "}
                    <span className="font-semibold">
                      {jobData.department?.department_name}
                    </span>{" "}
                    Department
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">Employee Level</h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    <span className="font-semibold">{jobData.level}</span>
                    level employees are accepeted
                  </p>
                </div>
              </div>
            </div>
            <div>
            <div className="shadow-xl rounded-lg my-10 px-10 py-10  bg-slate-50 bg-opacity-50">
              <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                Apply for the job
              </div>
              <div>
              <form
              novalidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid"
            //   onSubmit={profileUpdate}
            >
                <div className="grid grid-cols-2 mb-5">
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="firstName" className="block mb-2 text-sm">
                      First Name
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Your First Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent"
                      onChange={handleFirstName}
                      value={firstName}
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="LastName" className="block mb-2 text-sm">
                      Last Name
                    </label>
                    <input
                      type="name"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter Your Last Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent "
                      onChange={handleLastName}
                      value={lastName}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 mb-5">
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="email" className="block mb-2 text-sm">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent "
                      onChange={handleEmail}
                      value={email}
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="number" className="block mb-2 text-sm">
                      PhoneNumber
                    </label>
                    <input
                      type="tel"
                      name="telphone"
                      placeholder="888 888 8888"
                      pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                      maxlength="10"
                      title="Ten digits code"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent "
                      onChange={handlePhone}
                      value={phone}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 mb-5">
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="firstName" className="block mb-2 text-sm">
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Your First Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent"
                      onChange={handleResume}
                      value={resume}
                      required
                    />
                  </div>
                  {/* <div className="col-span-2 md:col-span-1 px-5">
                    <label for="LastName" className="block mb-2 text-sm">
                      Last Name
                    </label>
                    <input
                      type="name"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter Your Last Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent "
                    //   onChange={handleLastName}
                    //   value={lastName}
                      required
                    />
                  </div> */}
                </div>

                <div className="flex justify-center py-5">
                <button
                    type="submit"
                    className="inline-flex items-center px-10 py-2 ml-4 text-md font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myGreen border border-transparent rounded-md active:bg-gray-900 false"
                  >
                    Apply Now
                  </button>
                </div>
            </form>
                
              </div>
            </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-6 px-10 ">
            <div className="shadow-xl rounded-lg my-10 px-10 py-10  bg-slate-50 bg-opacity-50">
              <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                Job Summary
              </div>
              <div className="text-gray-600 py-1">
                published on :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.created_at}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                vacancy:{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.vacancy}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                salary range :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.salary_range}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                Location :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.location}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                Job Nature :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.job_type}
                </span>
              </div>
            </div>
            <div>
              <div className="shadow-xl rounded-lg my-10 px-10 py-10  bg-slate-50 bg-opacity-50">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                  About the Company
                </div>
                <div className="py-3">
                  <img
                    className="h-32 w-32 object-cover rounded-full"
                    src={BASEURL}
                    alt=""
                  />
                </div>
                <div className="text-gray-600 py-1">
                  Company Name :&nbsp;
                  <span className="text-gray-900 font-semibold">
                    {companyData.company_name}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  Started Date:{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.started_date}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  Founder :{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.founder}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  CEO :{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.ceo_name}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  Head office Location :{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.head_office_location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekerJobView;
