import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from '../../../axios'

function UserRegister() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="flex flex-col p-6 rounded-md sm:p-10 lg:p-32 bg-white shadow-md w-1/2 sm:max-w-2xl sm:rounded-lg my-20">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl text-myBlue font-bold">Sign up</h1>
          <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
        </div>
        <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid" onSubmit={handleSubmit}>
          <div className="space-y-4">
          <div>
              <label for="firstName" className="block mb-2 text-sm">First Name</label>
              <input type="name" name="firstName" id="firstName" placeholder="Enter Your First Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                onChange={handleFirstName} value={firstName} required/>
            </div>
            <div>
              <label for="lastName" className="block mb-2 text-sm">Last Name</label>
              <input type="name" name="lastName" id="lastName" placeholder="Enter Your Last Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                onChange={handleLastName} value={lastName} required/>
            </div>
            <div>
              <label for="email" className="block mb-2 text-sm">Email address</label>
              <input type="email" name="email" id="email" placeholder="Enter Your Email"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                onChange={handleEmail} value={email} required/>
            </div>
            <div>
              <label for="number" className="block mb-2 text-sm">PhoneNumber</label>
              <input type="tel" name="telphone" placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="10"  title="Ten digits code"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              onChange={handleMobile} value={mobile} required/>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label for="password" className="text-sm">Password</label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot
                  password?</a>
              </div>
              <input type="password" name="password" id="password" placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                onChange={handlePassword} value={password} required />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md dark:bg-myBlue  dark:text-white">Sign up</button>
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
          {/* <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-2xl sm:rounded-lg">
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
              <div className="mt-4">
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
              </div>
              <div className='text-center py-10'>
              {errorMessage()}
              {successMessage()}
              </div>
              <div className="flex items-center justify-end mt-4">
                <Link to = '/signin'
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  
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
              <div>
                <Link to = '/recruiter-register'
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="#"
                >
                  Recruiter ?
                </Link>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
