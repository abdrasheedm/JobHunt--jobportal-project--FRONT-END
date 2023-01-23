import React, { useState } from 'react'
import axios from '../../../axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

function RecruiterRegister() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
};

const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
};

const handleCompany = (e) => {
  setCompany(e.target.value);
  setSubmitted(false);
};


const handleMobile = (e) => {
    setMobile(e.target.value);
    setSubmitted(false);
};

const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (firstName === '' || lastName ==='' || company === '' || email === '' || mobile === '' || password === '') {
      setError(true);
  } else {
      axios.post('user/signup/', {
          first_name : firstName,
          last_name : lastName,
          company_name : company,
          phone_number : mobile,
          email : email,
          user_type : "Recruiter",
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
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-2xl sm:rounded-lg">
            <div className="py-10">
              <a href="/">
                <h3 className="text-4xl font-bold text-center">Sign Up</h3>
              </a>
            </div>
            <form className="px-5 pb-10" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-lg font-medium text-gray-700 undefined"
                >
                  First Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="first_name"
                    onChange={handleFirstName}
                    value={firstName}
                    className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              
              <div>
              <label
                  htmlFor="last_name"
                  className="block text-lg font-medium text-gray-700 undefined"
                >
                  Last Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleLastName}
                    value={lastName}
                    className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div>
              <label
                  htmlFor="company_name"
                  className="block text-lg font-medium text-gray-700 undefined"
                >
                  Company Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="company_name"
                    onChange={handleCompany}
                    value={company}
                    className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    onChange={handleEmail}
                    value={email}
                    className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div>
              <label
                  htmlFor="last_name"
                  className="block text-lg font-medium text-gray-700 undefined"
                >
                  Phone Number
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="phone_number"
                    onChange={handleMobile}
                    value={mobile}
                    className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-lg h-10 font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password"
                    onChange={handlePassword}
                    value={password}
                    className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              {/* <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-lg h-10 font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password_confirmation"
                    className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div> */}
              <div className='text-center py-10'>
              {errorMessage()}
              {successMessage()}
              </div>
              <div className="flex items-center justify-end mt-4">
                <Link to = '/signin'
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="#"
                >
                  Already registered?
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterRegister