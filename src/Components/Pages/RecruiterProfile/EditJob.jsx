import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../axios";

function EditJob() {
    const token = JSON.parse(localStorage.getItem("token"));
    const profile_id = localStorage.getItem("profile_id");
    const company = JSON.parse(localStorage.getItem('CompanyProfile'))
    const userID = JSON.parse(localStorage.getItem('userId'))
    const locat = useLocation()
    const jobID = locat.state?.data
    console.log(jobID)
    const [jobs, setJobs] = useState([]);
    const fetchJob = async () => {
      await axios
        .get(`recruiter-view-single-job/?id=${jobID}`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((res) => {
          setJobs(res.data);
          console.log(res.data)
          setJobTitle(res.data.job_title)
          setEmployeeType(res.data.level)
          setWorkPlaceType(res.data.job_type)
          setJobDescription(res.data.full_description)
          setJobQualifications(res.data.qualification)
          setLocation(res.data.location)
          setJobDepartment(res.data.department)
          setSalaryRange(res.data.salary_range)
          setExperience(res.data.experience)
        });
    };
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
      await axios.get(`company-department/?id=${company.category.id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }).then((res) => {
        setDepartments(res.data);
        setJobCategory(company.category.id)
        setCompanyID(company.id)
      });
    };
  
    useEffect(() => {
      fetchProfile()
      fetchDepartment()
      fetchJob()
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
          location : location
      }
      axios.put(`recruiter-update-job/?id=${jobID}`, data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        }
      }).then((res) => {
      navigate('/recruiter-my-jobs')
      })
  
      
    };
  
    return (
      <div>
        <div className="px-10 py-20 xl:mx-40 lg:mx-20">
          <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
            <div className="flex flex-col p-6 rounded-md sm:p-10 xl:p-32 bg-white shadow-xl w-1/2 sm:max-w-2xl sm:rounded-lg my-20">
              <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl text-myBlue font-bold">
                  Edit your Job
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
                        Employee type
                      </label>
                      <select
                        name="company"
                        id="job-type"
                        className="container p-2 my-1 rounded-md"
                        onChange={handleEmployeeType}
                      >
                        <option value={employeeType}>{employeeType}</option>
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
                    <div className="pl-2">
                      <label for="firstName" className="block mb-2 text-sm">
                        Workplace Type
                      </label>
                      <select
                        name="company"
                        id="job-type"
                        className="container p-2 my-1 rounded-md"
                        onChange={handleWorkplaceType}
                      >
                        <option value={workPlaceType}>{workPlaceType}</option>
                        <option key="part-time" value="part-time" onClick={(e) => {console.log(e.target.key, "hai")}}>
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
                      <option value={jobQualifications}>select</option>
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
                        <option value={jobDepartment}>select</option>
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
                </div>
                <div className="space-y-2">
                  <div>
                    <button
                      type="submit"
                      className="w-full px-8 py-3 font-semibold rounded-md dark:bg-myBlue  dark:text-white"
                    >
                      Edit Job
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

export default EditJob