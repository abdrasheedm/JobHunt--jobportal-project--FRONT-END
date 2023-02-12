import React, { useState, useEffect } from "react";
import ProfileCard from "../../Recruiter/ProfileCard/ProfileCard";
import axios from "../../../axios";

function EditProfile() {
  const profile_id = localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));

  const [categories, setCategory] = useState([]);
  const fetchCategory = async () => {
    await axios.get(`company-category/`).then((res) => {
      setCategory(res.data);
    });
  };

  const [profile, setProfile] = useState([]);
  const fetchProfile = () => {
    axios
      .get(`company-profile/?id=${profile_id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setFirstName(res.data.recruiter.first_name);
        setLastName(res.data.recruiter.last_name);
        setMobile(res.data.recruiter.phone_number);
        setEmail(res.data.recruiter.email);
        setCompanyName(res.data.company_name);
        setAbout(res.data.about);
        setceo(res.data.ceo_name);
        setFounder(res.data.founder);
        setHeadOffice(res.data.head_office_location);
        setLogo(res.data.company_logo);
        setCompanyCategory(res.data.category.category_name);
      });
  };
  useEffect(() => {
    fetchProfile();
    fetchCategory();
  }, []);
  console.log(profile);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCategory, setCompanyCategory] = useState("");
  const [about, setAbout] = useState("");
  const [ceo, setceo] = useState("");
  const [founder, setFounder] = useState("");
  const [headOffice, setHeadOffice] = useState("");
  const [logo, setLogo] = useState([]);

  const BASEURL = `http://127.0.0.1:8000${logo}`;


  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleAbout = (e) => {
    setAbout(e.target.value);
  };
  const handleCEO = (e) => {
    setceo(e.target.value);
  };
  const handleFounder = (e) => {
    setFounder(e.target.value);
  };
  const handleHeadOffice = (e) => {
    setHeadOffice(e.target.value);
  };
  const handleLogo = (e) => {
    // setLogo(e.target.logo.files[0]);
    // console.log(...e.target.files);
  };
  console.log(logo)
  function refreshPage() {
    window.location.reload(false);
  }

  const profileUpdate = (e) => {
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", mobile);
    formData.append("category", companyCategory);
    formData.append("company_name", companyName);
    formData.append("about", about);
    formData.append("ceo_name", ceo);
    formData.append("founder", founder);
    formData.append("head_office_location", headOffice);  
    formData.append("company_logo", e.target.logo.files[0]);
    formData.append("head_office_location", headOffice);

    console.log(formData)

    e.preventDefault();
    let url = `/update-company-profile/?id=${profile_id}`;
    axios.put(url, formData, {
      headers: {
        Authorization: `Bearer ${token.access}`,
        // 'content-type': 'multipart/form-data'
        
        
      },
    }).then((res) => {
      console.log(res.data);
      // refreshPage()
    });
  };

  return (
    <div className=" lg:py-20">
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            <h1 className="text-center font-bold text-3xl">Edit Profile</h1>
            <form
              novalidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid"
              onSubmit={profileUpdate}
            >
              <div className="my-5">
                <h1 className="text-xl text-myBlue text-center mb-5">
                  Personal Details
                </h1>
                <div className="flex flex-wrap justify-around mb-5">
                  <div>
                    <label for="firstName" className="block mb-2 text-sm">
                      First Name
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Your First Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100"
                      onChange={handleFirstName}
                      value={firstName}
                      required
                    />
                  </div>
                  <div>
                    <label for="LastName" className="block mb-2 text-sm">
                      Last Name
                    </label>
                    <input
                      type="name"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter Your Last Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleLastName}
                      value={lastName}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-around">
                  <div>
                    <label for="email" className="block mb-2 text-sm">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleEmail}
                      value={email}
                      required
                    />
                  </div>
                  <div>
                    <label for="number" className="block mb-2 text-sm">
                      PhoneNumber
                    </label>
                    <input
                      type="tel"
                      name="telphone"
                      placeholder="888 888 8888"
                      pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                      maxlength="10"
                      title="Ten digits code"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleMobile}
                      value={mobile}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="my-5">
                <h1 className="text-xl text-myBlue text-center mb-5">
                  Company Details
                </h1>
                <div className="flex flex-wrap justify-around mb-5">
                  <div>
                    <label for="firstName" className="block mb-2 text-sm">
                      Company Name
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Your Company Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleCompanyName}
                      value={companyName}
                      required
                    />
                  </div>
                  <div>
                    <label for="LastName" className="block mb-2 text-sm">
                      Category
                    </label>
                    <select
                      className="container p-2 my-1 rounded-md"
                      onChange={(e) => {
                        const selectedCategory = e.target.value;
                        setCompanyCategory(selectedCategory);
                      }}
                    >
                      <option>{companyCategory}</option>
                      {categories.map((category, index) => {
                        return (
                          <option value={category.category_name} key={index}>
                            {category.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="">
                  <div className="mb-5 px-8">
                    <label for="about" className="block mb-2 text-sm">
                      About
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Write about your company"
                      className="w-full px-3 h-20 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleAbout}
                      value={about}
                      required
                    />
                  </div>
                  <div className="flex flex-wrap justify-around mb-5">
                    <div>
                      <label for="firstName" className="block mb-2 text-sm">
                        CEO Name
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter Name of CEO"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleCEO}
                        value={ceo}
                        required
                      />
                    </div>
                    <div>
                      <label for="LastName" className="block mb-2 text-sm">
                        Founder Name
                      </label>
                      <input
                        type="name"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Name of Founder"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleFounder}
                        value={founder}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap  justify-around mb-5">
                    <div>
                      <label for="firstName" className="block mb-2 text-sm">
                        Head office Location
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter Your Company Location"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleHeadOffice}
                        value={headOffice}
                        required
                      />
                    </div>
                    <div>
                      <label for="LastName" className="block mb-2 text-sm">
                        Company Logo
                      </label>
                      <img src={BASEURL} alt="" className="h-20" />

                      <input
                        type="file"
                        name="logo"
                        id="lastName"
                        placeholder="Enter Your Last Name"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleLogo}
                      />
                    </div>
                    
                  </div>
                  <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Save
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

export default EditProfile;
