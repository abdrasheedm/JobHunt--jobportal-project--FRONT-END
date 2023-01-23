import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../axios'
import AuthContext from '../../../Context/AuthContext';

function Login() {


  const {Userlogin} = useContext(AuthContext)
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');

  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
};

const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
};


  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
        setError(true);
    } else {
      Userlogin(email, password)
        // axios.post('user/signin/', {
        //     email: email,
        //     password: password
        // }).then((res) => {
        //   if(res.data.is_login){
        //     console.log(res.data.token.access);
        //     console.log("hello");
        //     localStorage.setItem("token", res.data.token.access)
        //     navigate('/')

        //   }
        //   console.log(res.data.message);
            
        // })

        // // setSubmitted(true);
        // // setError(false);
    }
};
  

  return (
    <div>
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-2xl sm:rounded-lg">
          <div className="py-10">
            <a href="/">
              <h3 className="text-4xl font-bold text-center">Sign In</h3>
            </a>
          </div>
          <form className="px-5 pb-10" onSubmit={handleSubmit}>
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
            
            <div className="flex items-center justify-end mt-4">
              <Link to = '/user-register'
                className="text-sm text-gray-600 underline hover:text-gray-900"
                
              >
                Not registered?
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login