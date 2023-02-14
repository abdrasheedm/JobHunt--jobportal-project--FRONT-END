import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "../../../../axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BrowseJobs() {
  const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null
  const profileId = localStorage.getItem("profile_id") ? localStorage.getItem('profile_id') : null;
  const [jobs, setJobs] = useState([]);
  const [tempJobs, setTempJobs] = useState([]);
  const fetchJobs = () => {
    axios
      .get("browse-job/")
      .then((res) => {
        setJobs(res.data);
        setTempJobs(res.data);
        console.log(res.data);
        console.log('hai');
      });
  };

  const [FavouritedJobIDs, setFavouriteJobIDs] = useState();
  const [favourited, setFavourited] = useState(false);
  const fetchFavouritedJobIDs = () => {
    axios
      .get(`seeker-favourited-job/?id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        let response = res.data;
        var job_id = [];
        response.map((job) => {
          
          job_id = [...job_id, job.job_id];
          console.log(job_id);
        });
        setFavouriteJobIDs(job_id);
      });
  };
  const navigate = useNavigate();

  const AddAndRemoveFavourite = (jobID) => {
    if(!token){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You are not logged in!',
        confirmButtonText: 'Signin',
      }).then(() => {
        navigate('/signin')
      })
      return
    }
    let data = {
      job_id: jobID,
      seeker_id: profileId,
    };
    axios
      .post(`favourite-job/?seeker_id=${profileId}&job_id=${jobID}`, data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setFavourited(!favourited);
        Swal.fire({
          icon: "success",
          title: `${res.data.message} !`,
          showConfirmButton: false,
         
        });
      });
  };

  const [categories, setCategory] = useState([]);
  const fetchCategory = async () => {
    await axios.get(`company-category/`).then((res) => {
      setCategory(res.data);
    });
  };

  const [departments, setDepartments] = useState([]);
  const fetchDepartments = async () => {
    await axios.get(`company-department/`).then((res) => {
      setDepartments(res.data);
    });
  };

  const [qualifications, setQualifications] = useState([]);
  const fetchQualifications = async () => {
    await axios.get(`job-qualifications-view/`).then((res) => {
      setQualifications(res.data);
    });
  };

  const jobTypes = ["part-time", "full-time", "intern"];
  const experienceLevels = [
    "fresher",
    "internship",
    "intermediate",
    "professional",
  ];

  const allJobs = () => {
    setTempJobs(jobs);
    console.log(jobs);
  };

  const filterByCategory = (category) => {
    let filtered = jobs.filter(
      (job) => job.category.category_name === category
    );
    setTempJobs(filtered);
    console.log(filtered);
  };

  const filterByDepartment = (department) => {
    let filtered = jobs.filter(
      (job) => job.department.department_name === department
    );
    setTempJobs(filtered);
    console.log(filtered);
  };

  const filterByJobType = (jobType) => {
    let filtered = jobs.filter((job) => job.job_type === jobType);
    setTempJobs(filtered);
  };

  const filterByQualification = (qualification) => {
    let filtered = jobs.filter(
      (job) => job.qualification.title === qualification
    );
    setTempJobs(filtered);
  };

  const filterByExperienceLevel = (experience) => {
    let filtered = jobs.filter((job) => job.level === experience);
    setTempJobs(filtered);
  };

  const [search, setSearch] = useState("");
  const searchData = (job) => {
    return search === ""
      ? job
      : job.job_title.toLowerCase().includes(search) ||
          job.category.category_name.toLowerCase().includes(search) ||
          job.department.department_name.toLocaleLowerCase().includes(search) ||
          job.level.toLowerCase().includes(search);
  };
  useEffect(() => {
    if(token){
    fetchFavouritedJobIDs();

    }
  }, [favourited]);

  useEffect(() => {
    fetchJobs();
    fetchCategory();
    fetchDepartments();
    fetchQualifications();
  }, []);

  return (
    <div>
      <div className="">
        <div className="font-black text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase"> browse Jobs</h1>
        </div>
        <div className="bg-gradient-to-r from-green-300 to-cyan-500"
          // style={{
          //   backgroundImage: `url("https://wallpaperaccess.com/full/1410260.jpg")`,
          //   backgroundSize: "cover",
          // }}
        >
          <div className="grid lg:grid-cols-6 xl:px-40 container mx-auto ">
            <div className="lg:col-span-2 col-span-6 px-10 ">
              <div className="shadow-xl rounded-lg my-10 px-10 py-10 bg-white">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                  Filter
                </div>
                <div
                  className="text-gray-600 py-3 text-center hover:cursor-pointer hover:bg-gray-200 rounded-lg"
                  onClick={allJobs}
                >
                  All Jobs
                </div>
                <div className="text-gray-600 py-1 text-center ">
                  <Menu
                    as="div"
                    className="relative inline-block text-left w-full pb-5"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-10 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Category
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {categories.map((category, index) => {
                            return (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                    onClick={() =>
                                      filterByCategory(category.category_name)
                                    }
                                  >
                                    {category.category_name}
                                  </a>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <Menu as="div" className="relative inline-block w-full pb-5">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-12 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Department
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {departments.map((department, index) => {
                            return (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                    onClick={() =>
                                      filterByDepartment(
                                        department.department_name
                                      )
                                    }
                                  >
                                    {department.department_name}
                                  </a>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <Menu as="div" className="relative inline-block w-full pb-5">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-12 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Job Type
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {jobTypes.map((jobType, index) => {
                            return (
                              <Menu.Item >
                                {({ active }) => (
                                  <a
                                  key={index}
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                    onClick={() => filterByJobType(jobType)}
                                  >
                                    {jobType}
                                  </a>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <Menu as="div" className="relative inline-block w-full pb-5">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-10 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Qualification
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {qualifications.map((qualification, index) => {
                            return (
                              <Menu.Item >
                                {({ active }) => (
                                  <a
                                  key={index}
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                    onClick={() =>
                                      filterByQualification(qualification.title)
                                    }
                                  >
                                    {qualification.title}
                                  </a>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <Menu as="div" className="relative inline-block w-full pb-5">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-10 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Experience Level
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {experienceLevels.map((experienceLevel, index) => {
                            return (
                              <Menu.Item >
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                    onClick={() =>
                                      filterByExperienceLevel(experienceLevel)
                                    }
                                    key={index}>
                                    {experienceLevel}
                                  </a>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="col-span-4 px-10 py-5">
              <div className="shadow-xl my-5 rounded-lg  bg-white px-10 py-6">
                <form className="max-w-xl px-4">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      onChange={(e) => {
                        let searchValue = e.target.value.toLocaleLowerCase();
                        setSearch(searchValue);
                      }}
                    />
                  </div>
                </form>
              </div>
              {!tempJobs.length ? (
                <div>
                  <h1 className="text-center text-red-600 text-xl font-bold mt-10 bg-white bg-opacity-20 py-20 rounded-lg">
                    Sorry , No Jobs available
                  </h1>
                </div>
              ) : (
                <div>
                  {tempJobs.filter(searchData).map((job, index) => {
                    return (
                      <div
                        className="shadow-xl p-10 my-5 rounded-lg hover:shadow-2xl grid grid-cols-9 justify-between bg-white"
                        key={index}
                      >
                        <div className="col-span-2">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRCgx-jrMQUQENdxiV71ZtID09zMRz3hnew&usqp=CAU"
                            className="rounded-lg w-20 h-20 object-cover"
                            alt=""
                          />
                        </div>
                        <div
                          className="col-span-5 pr-5 hover:cursor-pointer"
                          onClick={() =>
                            navigate("/seeker-single-job-view", {
                              state: { data: job.id },
                            })
                          }
                        >
                          <h1 className="capitalize text-xl font-bold pt-3">
                            {job.job_title}{" "}
                          </h1>
                          <div className="flex pt-3">
                            <p className="mr-5 text-gray-600">
                              <i className="fa-solid fa-user-tie"></i> &nbsp;
                              {job.category?.category_name}{" "}
                            </p>
                            <p className="text-gray-600">
                              <i className="fa-thin fa-briefcase"></i> &nbsp;{" "}
                              {job.salary_range}{" "}
                            </p>
                          </div>
                          <div className="py-3">
                            <p className="italic text-gray-400">
                              {job.short_description}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 flex flex-col items-center">
                          <div className="my-5">
                            <span
                              className={
                                FavouritedJobIDs?.includes(job.id)
                                  ? "text-white bg-myGreen p-2 rounded bg-opacity-90 hover:bg-myGreen hover:bg-opacity-100 mt-4"
                                  : "bg-green-100 p-2 rounded bg-opacity-60 text-myGreen hover:text-white hover:bg-myGreen"
                              }
                              onClick={() => {
                                AddAndRemoveFavourite(job.id);
                              }}
                            >
                              <i className="fa-regular fa-2xl fa-heart"></i>
                            </span>
                          </div>
                          <button
                            className="bg-myGreen hover:bg-green-500 text-white px-7 py-2 rounded-md"
                            onClick={() =>
                              navigate("/seeker-single-job-view", {
                                state: { data: job.id },
                              })
                            }
                          >
                            Apply Now
                          </button>
                          <p className="text-center pt-3 italic text-gray-600">
                            Last Date : {job.last_date}{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseJobs;
