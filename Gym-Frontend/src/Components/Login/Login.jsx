import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [loginField, setLoginField] = useState({
    userName: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!loginField.userName.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!loginField.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/login',
        loginField,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { gym, token } = response.data;
      
      localStorage.setItem('gymName', gym.gymName);
      localStorage.setItem('gymPic', gym.profilePic);
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('token', token);
      
      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  return (
    <div className="w-1/3 p-10 mt-20 ml-20 border-slate-950 border-2 bg-slate-700 rounded-xl bg-opacity-50 h-fit">
      <div className="font-sans text-white font-extrabold text-center text-3xl mb-8">
        Login
      </div>
      <input
        type="text"
        value={loginField.userName}
        onChange={(event) => handleOnChange(event, "userName")}
        className="w-full my-4 p-2 rounded-lg"
        placeholder="Enter username"
        disabled={isLoading}
      />
      <input
        value={loginField.password}
        onChange={(event) => handleOnChange(event, "password")}
        type="password"
        className="w-full mb-6 p-2 rounded-lg"
        placeholder="Enter password"
        disabled={isLoading}
      />
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`p-2 w-full border-2 bg-slate-800 rounded-lg text-white text-center text-lg 
          hover:bg-white hover:text-black font-semibold cursor-pointer transition-all
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <ToastContainer />
    </div>
  );
};
export default Login