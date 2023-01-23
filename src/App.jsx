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
      </Routes>
      <Footer />

      </AuthProvider>
    </div>
    </Provider>
  )
}

export default App
