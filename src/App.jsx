import Navbar from './Components/Navbar/Navbar'
import './App.css'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Pages/Login/Login'
import UserRegister from './Components/Pages/Register/UserRegister'
import RecruiterRegister from './Components/Pages/Register/RecruiterRegister'
import VerifyOtp from './Components/Pages/verify-otp/VerifyOtp'
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import { AuthProvider } from './Context/AuthContext'
import RecruiterProfile from './Components/Pages/RecruiterProfile/RecruiterProfile'
import MyJobs from './Components/Pages/RecruiterProfile/MyJobs'
import PostJob from './Components/Pages/RecruiterProfile/PostJob'
import EditProfile from './Components/Pages/RecruiterProfile/EditProfile'
import EditJob from './Components/Pages/RecruiterProfile/EditJob'
import SingleJobView from './Components/Pages/RecruiterProfile/SingleJobView'

function App() {

  return (
    <Provider store = {Store} >
    <div className="App">
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/recruiter-register' element={<RecruiterRegister />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/recruiter-profile' element={<RecruiterProfile />} />
        <Route path='/recruiter-edit-profile' element={<EditProfile />} />
        <Route path='/recruiter-my-jobs' element={<MyJobs />} />
        <Route path='/recruiter-post-job' element={<PostJob />} />
        <Route path='/recruiter-edit-job' element={<EditJob />} />
        <Route path='/recruiter-single-job-view' element={<SingleJobView />} />
      </Routes>
      <Footer />

      </AuthProvider>
    </div>
    </Provider>
  )
}

export default App
