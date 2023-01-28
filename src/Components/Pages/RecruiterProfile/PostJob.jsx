import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from '../../../axios'


function PostJob() {

    const [jobTitle, setJobTitle] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [workPlaceType, setWorkPlaceType] = useState('');
  const [jobDescriptions, setJobDescription] = useState('');
  const [jobQualifications, setJobQualifications] = useState('');
  const [responsiblities, setResponsiblities] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [jobLogo, setJobLogo] = useState('');

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handlejobTitle = (e) => {
    setJobTitle(e.target.value);
    // setSubmitted(false);
};

const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
    // setSubmitted(false);
};

const handleJobCategory = (e) => {
    setJobCategory(e.target.value);
    // setSubmitted(false);
};

const handleWorkplaceType = (e) => {
    setWorkPlaceType(e.target.value);
    // setSubmitted(false);
};

const handleJobDescription = (e) => {
    setJobDescription(e.target.value);
    // setSubmitted(false);
};
const handleJobQualifications = (e) => {
  setJobQualifications(e.target.value);
  // setSubmitted(false);
};
const handleJobResposibility = (e) => {
  setResponsiblities(e.target.value);
  // setSubmitted(false);
};
const handleJobType = (e) => {
  setJobType(e.target.value);
  // setSubmitted(false);
};
const handleSalaryRange = (e) => {
  setSalaryRange(e.target.value);
  // setSubmitted(false);
};
const handleJobLogo = (e) => {
  setJobLogo(e.target.value);
  // setSubmitted(false);
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (firstName === '' || lastName ==='' || email === '' || mobile === '' || password === '') {
      setError(true);
  } else {
      axios.post('user/signup/', {
          first_name : firstName,
          last_name : lastName,
          phone_number : mobile,
          email : email,
          user_type : "JobSeeker",
          password : password
      }).then((res) => {
          if(res.data.otp){
            console.log(mobile);
          dispatch({
            type : 'mobile',
            payload : mobile
          })
          navigate('/verify-otp')
          

          }
      })

      setSubmitted(true);
      setError(false);
  }
};

const successMessage = () => {
  return (
      <div
          className="success"
          style={{
              display: submitted ? '' : 'none',
          }}>
          <h1 className='text-green-700 text-xl'>User {firstName} successfully registered!!</h1>
      </div>
  );
};

// Showing error message if error is true
const errorMessage = () => {
  return (
      <div
          className="error"
          style={{
              display: error ? '' : 'none',
          }}>
          <h5 className='text-red-700 text-xl'>Please enter all the fields</h5>
      </div>
  );
};

  return (
    <div>
        <div className="px-10 py-20 xl:mx-40 lg:mx-20">
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className="flex flex-col p-6 rounded-md sm:p-10 xl:p-32 bg-white shadow-xl w-1/2 sm:max-w-2xl sm:rounded-lg my-20">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl text-myBlue font-bold">Post A Job</h1>
          <p className="text-sm dark:text-gray-400">Find A Great Hire, Fast</p>
        </div>
        <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit}>
          <div className="space-y-4">
          <div className='flex flex-col lg:flex-row'>
              <div className='pr-2'>
              <label for="firstName" className="block mb-2 text-sm">Job Title</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800"
                onChange={handlejobTitle} value={jobTitle} required/>
              </div>
              <div className='pl-2'>
              <label for="firstName" className="block mb-2 text-sm">Company Name</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800"
                onChange={handleCompanyName} value={CompanyName} required/>
              </div>
                
            </div>
            <div className='flex flex-col lg:flex-row'>
              <div className='pr-2'>
              <label for="firstName" className="block mb-2 text-sm">Job Category</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800"
                onChange={handleJobCategory} value={jobCategory} required/>
              </div>
              <div className='pl-2'>
              <label for="firstName" className="block mb-2 text-sm">Workplace Type</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800"
                onChange={handleWorkplaceType} value={workPlaceType} required/>
              </div>
                
            </div>
            <div>
              <label for="lastName" className="block mb-2 text-sm">Job Description</label>
              <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800 h-20"
                onChange={handleJobDescription} value={jobDescriptions} required/>
            </div>
            <div>
              <label for="lastName" className="block mb-2 text-sm">Job Qualifications</label>
              <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800 h-20"
                onChange={handleJobQualifications} value={jobQualifications} required/>
            </div>
            <div>
              <label for="lastName" className="block mb-2 text-sm">Responsiblities</label>
              <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800 h-20"
                onChange={handleJobResposibility} value={responsiblities} required/>
            </div>  
            <div className='flex flex-col lg:flex-row'>
              <div className='pr-2'>
              <label for="firstName" className="block mb-2 text-sm">Job Type</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800"
                onChange={handleJobType} value={jobType} required/>
              </div>
              <div className='pl-2'>
              <label for="firstName" className="block mb-2 text-sm">Salary Range</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                onChange={handleSalaryRange} value={salaryRange} required/>
              </div>
                
            </div>
            <div className='flex flex-col lg:flex-row'>
              <div className='px-r'>
              <label for="firstName" className="block mb-2 text-sm">Job Logo</label>
              <input type="file" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                onChange={handleJobLogo} value={jobLogo} required/>
              </div>
                
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-myBlue  dark:text-white">POST JOB</button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-400">Already registered ?
              <Link rel="noopener noreferrer" to='/signin' className="hover:underline text-myBlue">Sign in</Link>
              .
            </p>
            <div>
                <Link to = '/recruiter-register'
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="#"
                >
                  Recruiter ?
                </Link>
              </div>
          </div>
        </form>
      </div>
        </div>
            
        </div>
    </div>
  )
}

export default PostJob