import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

const MemberDetail = () => {
  const [status, setStatus] = useState(false);
  const [renew, setRenew] = useState(false);
  const navigate = useNavigate();

  const handleSwitchBtn = () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    setStatus(statuss);
  };

  return (
    <div className="w-3/4 text-black p-5 h-[100%]">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className=" border-2 w-fit cursor-pointer text-xl font-sans text-white p-2 rounded-xl bg-slate-900"
      >
        <ArrowBack /> Go Back
      </div>
      <div className="p-2">
        <div className="w-[100%] h-fit flex">
        <div className="w-1/3 max-w-xs mx-auto">
          <img
            src="https://i.pinimg.com/236x/03/c5/f6/03c5f6f4479024f922cc6370bf98f8bf.jpg"
            className="w-full rounded-lg"
            alt="Member"
          />
        </div>
          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name : Kartik
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile : +91 1234567895
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address : India
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date : 10-11-2012
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date : 10-12-2026
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold">
              Status{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={() => {
                  handleSwitchBtn();
                }}
              />
            </div>
            <div
              onClick={() => {
                setRenew((prev) => !prev);
              }}
              className={` rounded-lg p-3 border-2 border-slate-900 text-center  ${
                renew && status === "Active"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                  : null
              }w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 to-pink-500`}
            >
              Renew
            </div>
          </div>
        </div>

        {renew && status === "Active" ? (
          <div className=" mt-2 rounded-lg p-3  mb-5 h-fit bg-slate-50 md:w-[100]">
            <div className="">
              <div className="my-1">
                <div>Membership</div>

                <select className="w-full border-2 p-2 rounded-lg">
                  <option>1 Month Plan</option>
                  <option>2 Month Plan</option>
                  <option>3 Month Plan</option>
                  <option>4 Month Plan</option>
                  <option>6 Month Plan</option>
                </select>
                <div
                  className={`mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-48 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MemberDetail;
