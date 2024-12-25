import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const  [loginField, setLoginField] = useState({"userName" : "", "password" : ""})
  const navigate = useNavigate();
  const handleLogin = () => {
    sessionStorage.setItem("isLogin", true);
    navigate("/dashboard");
  };
 
  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name] : event.target.value})
  }
  console.log(loginField)

  return (
    <div className="w-1/3 p-10 mt-20 ml-20 border-slate-950 border-2 bg-slate-700 rounded-xl bg-opacity-50 h-fit">
      <div className="font-sans text-white font-extrabold text-center text-3xl">
        Login
      </div>
      <input
        type="text"
        value={loginField.userName} 
        onChange={(event) => {handleOnChange(event, "userName")}}
        className="w-full my-10 p-2 rounded-lg"
        placeholder="Enter userName"
      />
      <input
       value={loginField.password} 
       onChange={(event) => {handleOnChange(event, "password")}}
        type="password"
        className="w-full mb-10 p-2 rounded-lg"
        placeholder="Enter passWord"
      />
      <div
        onClick={() => handleLogin()}
        className="p-2 w-[80%] border-2 bg-slate-800  mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
      >
        Login
      </div>
    </div>
  );
};

export default Login;
