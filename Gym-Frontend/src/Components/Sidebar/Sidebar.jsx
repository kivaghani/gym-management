import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [greeting, setGreeting] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const greetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning 🌞");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon ☀️");
    } else if (currentHour < 21) {
      setGreeting("Good Evening 🌃");
    } else {
      setGreeting("Good Night 🌜 ");
    }
  };

  useEffect(() => {
    greetingMessage();
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-1/4 h-[100vh] bg-black text-white p-5 flex flex-col items-center font-light">
      {/* Header */}
      <div className="text-3xl font-bold mb-10">
        {localStorage.getItem('gymName')}
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-3">
          <img
            src={localStorage.getItem("gymPic")}
            alt="gym-profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <div className="text-2xl">{greeting}</div>
          <div className="text-xl mt-1 font-semibold">Admin</div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="w-full space-y-5">
        {/* Dashboard */}
        <div
          className={`flex items-center gap-4 px-5 py-3 bg-slate-800 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${
            location.pathname === "/dashboard"
              ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : null
          }`}
        >
          <Link to="/dashboard">
            <HomeIcon />
            <span className="text-xl font-medium ml-6">Dashboard</span>
          </Link>
        </div>

        {/* Members */}
        <div
          className={`flex items-center gap-4 px-5 py-3 bg-slate-800 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black  ${
            location.pathname === "/member"
              ? "border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : null
          }`}
        >
          <Link to="/member">
            <GroupIcon />
            <span className="text-xl font-medium ml-6">Members</span>
          </Link>
        </div>

        {/* Logout */}
        <div
          onClick={() => {
            handleLogout();
          }}
          className="flex items-center gap-4 px-5 py-3 bg-slate-800 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          <LogoutIcon />
          <span className="text-xl font-medium ml-2">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
