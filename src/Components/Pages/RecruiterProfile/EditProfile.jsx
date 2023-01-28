import React, { useState, useEffect } from "react";
import ProfileCard from "../../Recruiter/ProfileCard/ProfileCard";
import axios from "../../../axios";

function EditProfile() {
  const profile_id = localStorage.getItem("profile_id");

  const [profile, setProfile] = useState([]);
  const fetchProfile = () => {
    axios.get(`company-profile/?id=${profile_id}`).then((res) => {
      setProfile(res.data);
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [companyCategory, setCompanyCategory] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [ceo, setceo] = useState("");
  const [founder, setFounder] = useState("");
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
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
                      value=""
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
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
                      value=""
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
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
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
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
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
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
                      value=""
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
                      <option>Please choose one option</option>
                      {/* {categories.map((category, index) => {
                      return <option value={category.category_name} key={index}>{category.category_name}</option>;
                    })} */}
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
                      className="w-full px-3 h-20 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
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
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
                        value=""
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
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
                        value=""
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
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
                        value=""
                        required
                      />
                    </div>
                    <div>
                      <label for="LastName" className="block mb-2 text-sm">
                        Company Logo
                      </label>
                      <input
                        type="file"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Your Last Name"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 dark:text-gray-100"
                        value=""
                        required
                      />
                    </div>
                  </div>
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
