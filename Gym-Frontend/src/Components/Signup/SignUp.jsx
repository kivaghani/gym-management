import React, { useState } from "react";
import "./signup.css";
import Model from "../Model/Model";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { toast, ToastContainer } from 'react-toastify';
import LinearProgress from "@mui/material/LinearProgress";

const SignUp = () => {
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://images.pexels.com/photos/669584/pexels-photo-669584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);

  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };

  const handleOnchange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setLoaderImage(true);
    console.log("Img Uploading");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcxwtk52l/image/upload",
        data
      );
      console.log(response);
      const imgUrl = response.data.url;
      setInputField({ ...inputField, profilePic: imgUrl });
      setLoaderImage(false);
    } catch (err) {
      console.log(err);
      setLoaderImage(false); // Fixed: Reset loader on error
      toast.error("Failed to upload image");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/register', inputField);
      const successMsg = response.data.message || "Registration successful";
      toast.success(successMsg);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="customSignup w-1/3 p-10 mt-20 ml-20 border-slate-950 border-2 bg-slate-700 rounded-xl bg-opacity-50 h-[450px] overflow-y-auto">
      <div className="font-sans text-white font-extrabold text-center text-3xl">
        Register Your Gym
      </div>
      <input
        type="text"
        value={inputField.email}
        onChange={(event) => {
          handleOnchange(event, "email");
        }}
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter Email"
      />
      <input
        type="text"
        onChange={(event) => {
          handleOnchange(event, "gymName");
        }}
        value={inputField.gymName}
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter Gym Name"
      />
      <input
        type="text"
        onChange={(event) => {
          handleOnchange(event, "userName");
        }}
        value={inputField.userName}
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter UserName"
      />
      <input
        value={inputField.password}
        type="password"
        onChange={(event) => {
          handleOnchange(event, "password");
        }}
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter passWord"
      />
      <input
        onChange={(e) => {
          uploadImage(e);
        }}
        type="file"
        className="w-full mb-10 p-2 rounded-lg"
      />
      {loaderImage && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
      <img
        src={inputField.profilePic}
        className="mb-10 h-[200px] w-[250px]"
        alt=""
      />

      <div
        onClick={() => handleRegister()}
        className="p-2 w-[80%] border-2 bg-slate-800  mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer">
        Register
      </div>
      <div
        onClick={() => handleClose()}
        className="p-2 mt-5  w-[80%] border-2 bg-slate-800  mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
      >
        Forgot Password
      </div>
      {forgotPassword && (
        <Model
          header="Forgot Password"
          handleClose={handleClose}
          content={<ForgotPassword />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default SignUp;