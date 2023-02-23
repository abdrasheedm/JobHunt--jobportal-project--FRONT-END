import React from "react";




const array = [1, 3, 4, 5, 6, 7, 8, 6]
function Notifications() {
  return (
    <div>
      <div className="">
        <div className="font-black text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase">Notifications</h1>
        </div>
        <div className="bg-gradient-to-r from-green-300 to-cyan-500 grid grid-cols-12 place-items-center pt-20">
          {array.map((arr, index) => {
            return(
              <div
            className="shadow-xl p-10 my-5 rounded-lg hover:shadow-2xl col-span-12 grid grid-cols-9 justify-between bg-white"
            // key={index}
          >
            <div className="col-span-2">
             <i class="fa-solid fa-bell fa-2xl"></i>
            </div>
            <div
              className="col-span-5 pr-5 hover:cursor-pointer"
              // onClick={() =>
              //   navigate("/seeker-single-job-view", {
              //     state: { data: job.id },
              //   })
              // }
            >
              <h1 className="capitalize text-xl font-bold pt-3">
                {/* {job.job_title}{" "} */}
                Shortlisted
              </h1>
              <div className="flex pt-3">
                <p className="mr-5 text-gray-600">
                  <i className="fa-solid fa-user-tie"></i> &nbsp;
                  {/* {job.category?.category_name}{" "} */}
                  congratulations You have been shortlisted for the job ----- by the conpany
                </p>
                <p className="text-gray-600">
                  <i className="fa-thin fa-briefcase"></i> &nbsp;{" "}
                  {/* {job.salary_range}{" "} */}
                </p>
              </div>
              <div className="py-3">
                <p className="italic text-gray-400">
                  {/* {job.short_description} */}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex flex-col items-center">
              <div className="my-5">
                {/* <span
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
                            </span> */}
              </div>
              <button
                className="bg-myGreen hover:bg-green-500 text-white px-7 py-2 rounded-md"
                // onClick={() =>
                //   navigate("/seeker-single-job-view", {
                //     state: { data: job.id },
                //   })
                // }
              >
                View More
              </button>
              <p className="text-center pt-3 italic text-gray-600">
                {/* Last Date : {job.last_date}{" "} */}
              </p>
            </div>
          </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default Notifications;
