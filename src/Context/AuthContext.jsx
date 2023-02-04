import { createContext,useState } from "react"
import axios  from '../axios'
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useEffect } from "react";



const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({children}) => {
    let [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken')? JSON.parse(localStorage.getItem('authToken')):null)
    let [user,setUser]=useState(()=>localStorage.getItem('authToken')? jwt_decode(localStorage.getItem('authToken')):null)
    let [admin,setAdmin]=useState(()=>localStorage.getItem('admin')? jwt_decode(localStorage.getItem('admin')):null)
    let [adminToken,setadminToken]=useState(()=>localStorage.getItem('admin')? JSON.parse(localStorage.getItem('admin')):null)
    let [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')):null)
    let [loading, setLoading] = useState(true)
    // let [recruiter,setRecruiter]=useState(()=>localStorage.getItem('adminAuthToken')? jwt_decode(localStorage.getItem('adminAuthToken')):null)
    let [adminAuthToken,setAdminAuthToken]=useState(()=>localStorage.getItem('adminAuthToken')? JSON.parse(localStorage.getItem('adminAuthToken')):null)

    let [errorMsg, SetErrorMsg] = useState('')

    const navigate=useNavigate()


    const Userlogin=async(email,password)=>{
       
        await axios.post('user/signin/',{email:email,password:password}).then((res)=>{
                 console.log(res.data)
                 
                //  console.log('id is here',res.data.user.user_id);
                 if (res.data.token){
                   console.log('recruiter is ' + res.data.user.user_type);
                   
                   if (res.data.user.user_type == 'JobSeeker'){
                    localStorage.setItem('authToken',JSON.stringify(res.data));
                    localStorage.setItem('token',JSON.stringify(res.data.token));
                    localStorage.setItem('userType', JSON.stringify(res.data.user.user_type))
                    localStorage.setItem('profile_id', JSON.stringify(res.data.profile_id))
                    setToken(res.data.token)
                    setAuthToken(res.data)
                    setUser(res.data.token)                      
                    //  SetError(res.data.message)
                     localStorage.setItem('userId',JSON.stringify(res.data.user.user_id))
                     navigate('/')
                   }
                   else if(res.data.user.user_type == 'Recruiter'){
                     localStorage.setItem('authToken',JSON.stringify(res.data))
                     localStorage.setItem('token',JSON.stringify(res.data.token))
                     localStorage.setItem('profile_id', JSON.stringify(res.data.profile_id))
                     localStorage.setItem('userType', JSON.stringify(res.data.user.user_type))
                     setAdminAuthToken(res.data)
                    setUser(res.data.token)                      

                    //  setRecruiter(res.data.token)                      
                    //  SetError(res.data.message)
                     localStorage.setItem('userId',JSON.stringify(res.data.user.user_id))
                     navigate('/recruiter-profile')
                   }                    
                   else{
                     localStorage.setItem('admin',JSON.stringify(res.data))
                     localStorage.setItem('token',JSON.stringify(res.data.token))
                     setadminToken(res.data)
                     setAdmin(res.data.token)                      
                    //  SetError(res.data.message)
                     navigate('/')
                   };
                 }else{
                  SetErrorMsg(res.data.message)
                  console.log(errorMsg)
                  console.log("hai");

                 }
             }
             ).catch((response) => console.log('error', response)); ; 
         }

         let logOut=()=>{
            axios.post('user/logout/').then((res)=>{
                console.log(res.data)
            })
            localStorage.removeItem('authToken')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('adminAuthToken')
            localStorage.removeItem('Admintoken')
            localStorage.removeItem('admin')
            localStorage.removeItem('profile_id')
            localStorage.removeItem('CompanyProfile')
            localStorage.removeItem('userType')

            setUser(null)
            setAuthToken(null)
            navigate('/signin')
        }


        let updateToken = async () => {
          console.log('called')
          let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':token?.refresh})
          })
          let data = await response.json()
          if (response.status === 200){
            setToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('token', JSON.stringify(data))
          }else{
            logOut()
          }

          if(loading){
            setLoading(false)
          }
        }
        
        useEffect(() => {

          if(loading){
            console.log('called loading')
            updateToken()
          }

          let fourMinute = 1000 * 60 * 4
          let interval = setInterval(() => {
            if(token){

              updateToken()
            }
          }, fourMinute)
          return () => clearInterval(interval)
        },[token, loading])


        const [mobile,setMobile]=useState('')
        let contextData={
            user:user,
            Userlogin:Userlogin,
            logOut:logOut,
            authToken:authToken,
            adminToken:adminToken,
            mobile:mobile,
            setMobile:setMobile,   
            errorMsg : errorMsg, 
            adminAuthToken:adminAuthToken,
            admin:admin,
            // setShow:setShow,
            // handleClose:handleClose,
            // handleShow:handleShow,
            // show:show,
            // handleCloses:handleCloses,
            // opens:opens,

        }
        return(
            <AuthContext.Provider value={contextData}>
                {loading ? null : children}
            </AuthContext.Provider>
        )

}