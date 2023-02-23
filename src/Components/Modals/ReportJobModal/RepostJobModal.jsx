import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import Swal from "sweetalert2";

function ReportJobModal({ visible, onClose }) {
  if (!visible) return null;

  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");
  const [checkout, setCheckout] = useState(false);
  const [amount, setAmount] = useState("");

  if (visible) {
    document.body.style.overflow = "hidden";
  }

  const planPurchase = (duration) => {
    let data = {
      user: profileId,
      duration: duration,
    };
    axios
      .post(`membership-purchase-view/`, data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        Swal.fire("Good job!", `${res.data.message} !`, "success").then(
          (res) => {
            onClose();
          }
        );
      });
  };

  return (
    <div className="bg-gray-900 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      <div className="bg-white rounded-xl p-5">
        <div className="text-right">
          <i class="fa-solid fa-xl fa-square-xmark" onClick={onClose}></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold p-10 text-center">Report Job</h1>
          <form action="" className="px-10">
            <div className="checkbox-wrapper">
              <label>
                <input type="checkbox" className="m-5" />
                <span>Inappropriate Content</span>
              </label>
            </div>
            <div className="checkbox-wrapper">
              <label>
                <input type="checkbox" className="m-5" />
                <span>Incomplete information about job / company</span>
              </label>
            </div>
            <div className="checkbox-wrapper">
              <label>
                <input type="checkbox" className="m-5" />
                <span>Fake job / Non-recruitment related job / Scam</span>
              </label>
            </div>
            <div className="checkbox-wrapper">
              <label>
                <input type="checkbox" className="m-5" />
                <span>Duplicate of another job on the site</span>
              </label>
            </div>
            <div className="checkbox-wrapper">
              <label>
                <input type="checkbox" className="m-5" />
                <span>Incorrect Email ID</span>
              </label>
            </div>
            <div className="checkbox-wrapper">
              <label>
                <input type="checkbox" className="m-5" />
                <span>Phone number not contactable</span>
              </label>
            </div>
            <div className="checkbox-wrapper flex flex-col">
              <label>
                <input type="checkbox" className="m-5" />
                <span>Other</span>
              </label>
              <textarea name="" id="" className="border-2 border-gray-600 hidden" cols="30" rows="4"></textarea>

            </div>
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportJobModal;
