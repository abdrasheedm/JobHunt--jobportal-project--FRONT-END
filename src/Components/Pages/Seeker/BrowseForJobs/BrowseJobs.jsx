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
  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");
  const [jobs, setJobs] = useState([]);
  const fetchJobs = () => {
    axios
      .get("browse-job/", {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
      });
  };

  const [FavouritedJobIDs, setFavouriteJobIDs] = useState()
  const fetchFavouritedJobIDs = () => {
    axios
      .get(`seeker-favourited-job/?id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        let response = res.data;
        var job_id = []
        response.map((job) => {
          job_id = [...job_id, job.job_id]
          console.log(job_id)

        });
        setFavouriteJobIDs(job_id)
      });
  };
  const navigate = useNavigate();


  const AddToFavourite = (jobID) => {
    console.log("in");
    console.log(jobID);
    let data = {
      job_id: jobID,
      seeker_id: profileId,
    };
    axios
      .post("favourite-job/", data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire("Congratulations!", `${res.data.message} !`, "success");
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
    fetchFavouritedJobIDs();
  }, []);

  return (
    <div >
      <div className="">
        <div className="font-black text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase"> browse Jobs</h1>
        </div>
        <div style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1410260.jpg")`,
        backgroundSize: "cover",
      }}>
          <div className="grid lg:grid-cols-6 xl:px-40 container mx-auto ">
            <div className="lg:col-span-2 col-span-6 px-10 ">
              <div className="shadow-xl rounded-lg my-10 px-10 py-10 bg-white">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                  Filter
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
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Education
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Information Technology
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Construction
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  Entertainment
                                </button>
                              )}
                            </Menu.Item>
                          </form>
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
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Education
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Information Technology
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Construction
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  Entertainment
                                </button>
                              )}
                            </Menu.Item>
                          </form>
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
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Education
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Information Technology
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Construction
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  Entertainment
                                </button>
                              )}
                            </Menu.Item>
                          </form>
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
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Education
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Information Technology
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Construction
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  Entertainment
                                </button>
                              )}
                            </Menu.Item>
                          </form>
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
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Education
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Information Technology
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Construction
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  Entertainment
                                </button>
                              )}
                            </Menu.Item>
                          </form>
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
                    />
                  </div>
                </form>
              </div>
              {jobs.map((job, index) => {
                return (
                  <div className="shadow-xl p-10 my-5 rounded-lg hover:shadow-2xl grid grid-cols-9 justify-between bg-white">
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
                          <i class="fa-solid fa-user-tie"></i> &nbsp;
                          {job.category?.category_name}{" "}
                        </p>
                        <p className="text-gray-600">
                          <i class="fa-thin fa-briefcase"></i> &nbsp;{" "}
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
                            FavouritedJobIDs.includes(job.id)
                              ? "text-white bg-myGreen p-2 rounded bg-opacity-90 hover:bg-myGreen hover:bg-opacity-100 mt-4"
                              : "bg-green-100 p-2 rounded bg-opacity-60 text-myGreen hover:text-white hover:bg-myGreen"
                          }
                          onClick={() => {
                            FavouritedJobIDs.includes(job.id)
                              ? RemoveFromFavourite(job.id)
                              : AddToFavourite(job.id);
                          }}
                        >
                          <i class="fa-regular fa-2xl fa-heart"></i>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseJobs;
