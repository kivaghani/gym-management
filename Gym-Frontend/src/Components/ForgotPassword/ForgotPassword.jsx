import React, { useState } from "react";

const ForgotPassword = () => {
  const [emailSubmit, setemailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentVal, setContentValue] = useState("Submit Your Email");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    if (!emailSubmit) {
      setemailSubmit(true);
      setContentValue("Submit Your OTP");
    } else if (emailSubmit && !otpValidate) {
      setOtpValidate(true);
      setContentValue("Submit Your New Password");
    }
  };

  const handleOnChange = (event, name) => {
    setInputField({...inputField, [name] : event.target.value})
  }
  console.log(inputField)

  return (
    <div className="w-full">
      <div className="w-full mb-5">
        <div className="">Enter Your Email</div>
        <input
          type="text"
          onChange={(event) => {
            handleOnChange(event, "email");
          }}
          value={inputField.email}
          className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
          placeholder="Enter Email"
        />
      </div>

      {emailSubmit && (
        <div className="w-full mb-5">
          <div className="">Enter Your OTP</div>
          <input
            type="text"
            onChange={(event) => {
              handleOnChange(event, "otp");
            }}
            value={inputField.otp}
            className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter OTP"
          />
        </div>
      )}

      {otpValidate && (
        <div className="w-full mb-5">
          <div className="">Enter Your new Password</div>
          <input
            type="password"
            onChange={(event) => {
              handleOnChange(event, "newPassword");
            }}
            value={inputField.newPassword}
            className="w-1/2  p-2 rounded-lg border-2 border-slate-400"
            placeholder="Enter new password  "
          />
        </div>
      )}

      <div
        onClick={() => handleSubmit()}
        className="p-2 bg-slate-800 text-white mx-auto w-2/3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-white hover:text-black "
      >
        {contentVal}
      </div>
    </div>
  );
};

export default ForgotPassword;
