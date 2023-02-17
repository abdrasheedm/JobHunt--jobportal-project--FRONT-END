import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import Swal from "sweetalert2";

function PostJob() {

  const token = JSON.parse(localStorage.getItem("token"));
  const profile_id = localStorage.getItem("profile_id");
  const categoryID = JSON.parse(localStorage.getItem('CompanyProfile'))
  const userID = JSON.parse(localStorage.getItem('userId'))
  const fetchProfile = () => {
    axios
      .get(`company-profile/?id=${profile_id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }).then((res) => {
        setJobCategory(res.data.category.id);
      })
    }

  const [departments, setDepartments] = useState([]);
  const fetchDepartment = async () => {
    await axios.get(`company-department/?id=${categoryID.category.id}`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }).then((res) => {
      setDepartments(res.data);
      setJobCategory(categoryID.category.id)
      setCompanyID(categoryID.id)
    });
  };

  useEffect(() => {
    fetchProfile()
    fetchDepartment()
  }, []);

  const navigate = useNavigate()


  const [jobTitle, setJobTitle] = useState("");
  const [compnayID, setCompanyID] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [jobDescriptions, setJobDescription] = useState("");
  const [jobQualifications, setJobQualifications] = useState("");
  const [jobDepartment, setJobDepartment] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [vacancy, setVacancy] = useState("");


  const handlejobTitle = (e) => {
    setJobTitle(e.target.value);
    
  };

  const handleEmployeeType = (e) => {
    setEmployeeType(e.target.value);
    
  };

  const handleWorkplaceType = (e) => {
    setWorkPlaceType(e.target.value);
    
  };

  const handleJobDescription = (e) => {
    setJobDescription(e.target.value);
    
  };
  const handleJobQualifications = (e) => {
    setJobQualifications(e.target.value);
    
  };
  const handleSalaryRange = (e) => {
    setSalaryRange(e.target.value);
    
  };
  const handleJoblocation = (e) => {
    setLocation(e.target.value);
    
  };
  const handleExperience = (e) => {
    setExperience(e.target.value);
    
  };
  const handleLastDate = (e) => {
    setLastDate(e.target.value);
    
  };
  const handleVacancy = (e) => {
    setVacancy(e.target.value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const shortDescription = jobDescriptions.split("\n")
    let data = {
      job_title : jobTitle,
        company_id : compnayID,
        recruiter_id : userID,
        category : jobCategory,
        department : jobDepartment,
        level : employeeType,
        experience : experience,
        salary_range : salaryRange,
        job_type : workPlaceType,
        qualification : jobQualifications,
        full_description : jobDescriptions,
        short_description : shortDescription[0],
        location : location,
        vacancy : vacancy,
        last_date : lastDate
    }
    axios.post("recruiter-post-job/", data, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      }
    }).then((res) => {
      if(res.data.message==='You reached Your limit !\nPlease Subscibe'){
        Swal.fire({
          icon: "error",
          title: `${res.data.message} !`,
          showConfirmButton: false,
          timer: 2000
         
        })
      }else{
        Swal.fire({
          icon: "success",
          title: `${res.data.message} !`,
          showConfirmButton: false,
          timer: 1500
         
        }).then(
          navigate('/recruiter-my-jobs')
        )
      }
      
      
    
    })

    
  };

  return (
    <div>
      <div className="px-10 py-20 xl:mx-40 lg:mx-20">
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
          <div className="flex flex-col p-6 rounded-md sm:p-10 xl:p-32 bg-white shadow-xl sm:max-w-2xl sm:rounded-lg my-20">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl text-myBlue font-bold">
                Post A Job
              </h1>
              <p className="text-sm dark:text-gray-400">
                Find A Great Hire, Fast
              </p>
            </div>
            <form
              novalidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row">
                  <div className="pr-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Job Title
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Job Title"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800"
                      onChange={handlejobTitle}
                      value={jobTitle}
                      required
                    />
                  </div>
                  <div className="pl-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Experience Level
                    </label>
                    <select
                      name="company"
                      id="job-type"
                      className="container p-2 my-1 rounded-md"
                      onChange={handleEmployeeType}
                    >
                      <option>Select</option>
                      <option key="fresher" value="fresher">
                        Fresher
                      </option>
                      <option key="intermediate" value="intermediate">
                        Intermediate
                      </option>
                      <option key="professional" value="professional">
                        Professional
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row">
                  {/* <div className="pr-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Job Category
                    </label>
                    <select
                      className="container p-2 my-1 rounded-md"
                      onChange={(e) => {
                        const selectedCategory = e.target.value;
                        setJobCategory(selectedCategory);
                      }}
                    >
                      <option>Please choose one option</option>
                      {categories.map((category, index) => {
                        return (
                          <option value={category.id} key={index}>
                            {category.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                  <div className="pl-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Job Type
                    </label>
                    <select
                      name="company"
                      id="job-type"
                      className="container p-2 my-1 rounded-md"
                      onChange={handleWorkplaceType}
                    >
                      <option>Select</option>
                      <option key="part-time" value="part-time">
                        Part Time
                      </option>
                      <option key="full-time" value="full-time">
                        Full Time
                      </option>
                      <option key="intern" value="intern">
                        Intern
                      </option>
                      <option key="work-from-home" value="work-from-home">
                        Work From Home
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label for="lastName" className="block mb-2 text-sm">
                    Job Description
                  </label>
                  <textarea
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Your Last Name"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800 h-20"
                    onChange={handleJobDescription}
                    value={jobDescriptions}
                    required
                  />
                </div>
                <div>
                  <div className="flex flex-col lg:flex-row">
                  <div>
                  <label for="lastName" className="block mb-2 text-sm">
                    Minimum qualificaion
                  </label>
                  <select
                    name="company"
                    id="qualification"
                    onChange={handleJobQualifications}
                    className="p-2 my-1 rounded-md"
                  >
                    <option>Select</option>
                    <option key="1" value="4">
                      Masters
                    </option>
                    <option key="2" value="5">
                      Under Graducation
                    </option>
                    <option key="3" value="6">
                      Higher Secondary
                    </option>
                    <option key="4" value="7">
                      SSLC
                    </option>
                  </select>
                  </div>
                  <div className='pl-2'>
              <label for="firstName" className="block mb-2 text-sm">Job location</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter salary Range"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                onChange={handleJoblocation} value={location} required/>
              </div>
                  </div>
                  
                </div>
                <div className="flex flex-col lg:flex-row">
                  <div className="pr-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Job Department
                    </label>
                    <select
                      className="container p-2 my-1 rounded-md"
                      onChange={(e) => {
                        const selectedCategory = e.target.value;
                        setJobDepartment(selectedCategory);
                      }}
                    >
                      <option>Please choose one option</option>
                      {departments.map((department, index) => {
                        return (
                          <option
                            value={department.id}
                            key={index}
                          >
                            {department.department_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="pl-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Salary Range
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter salary Range"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleSalaryRange}
                      value={salaryRange}
                      required
                    />
                  </div>
                  <div className="pl-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Minimum Experiecnce
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter salary Range"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleExperience}
                      value={experience}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  
                  <div className="pl-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Vacancy
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter salary Range"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleVacancy}
                      value={vacancy}
                      required
                    />
                  </div>
                  <div className="pl-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Last Date
                    </label>
                    <input
                      type="date"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter salary Range"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleLastDate}
                      value={lastDate}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-myBlue  dark:text-white"
                  >
                    POST JOB
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
