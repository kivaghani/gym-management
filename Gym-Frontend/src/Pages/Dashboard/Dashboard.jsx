import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import ErrorIcon from "@mui/icons-material/Error";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  useEffect (() => {
    const checkIClickedOutside = e => {
      if(accordianDashboard && ref.current && !ref.current.contains(e.target)){
        setAccordianDashboard(false)
      }
    }
    document.addEventListener("mousedown", checkIClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIClickedOutside)
    }
  }, [accordianDashboard])

  
  const handleOnClickMenu = (value) => {
    sessionStorage.setItem('func', value)
  }


  return (
    <div className="w-3/4 text-black p-5 relative">
      <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setAccordianDashboard((prev) => !prev);
          }}
        />
        <img
          className="w-8 h-8 rounded-3xl border-2"
          src="https://cdn-icons-png.flaticon.com/512/33/33308.png"
          alt=""
        />
      </div>

      {accordianDashboard && (
        <div ref={ref} className="absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight">
          <div className="">Hi Welcome to our Gym Management Syatem.</div>
          <p>Feel Free to ask any Querries</p>
        </div>
      )}

      <div className="mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]">

        
        <Link to={'/member'}>
        <div className="w-full h-fit border-2 bg:white rounded-lg cursor-pointer ">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <PeopleAltIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Joined Member
            </p>
          </div>
        </div>
        </Link>

        <Link to={'/specific/monthly'}>
        <div onClick={() => handleOnClickMenu("monthlyJoined")} className="w-full h-fit border-2 bg:white rounded-lg cursor-pointer ">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <SignalCellularAltIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Monthly Joined
            </p>
          </div>
        </div>
        </Link>
 

        <Link to={'/specific/expire-with-in-3-days'}>
        <div  onClick={() => handleOnClickMenu("threeDayExpire")}className="w-full h-fit border-2 bg:white rounded-lg cursor-pointer ">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <AlarmOnIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Expiring within 3 days
            </p>
          </div>
        </div>
        </Link>
  

        <Link to={'/specific/expire-with-in-4-7-days'}>
        <div onClick={() => handleOnClickMenu("foutToSevenDaysExpire")} className="w-full h-fit border-2 bg:white rounded-lg cursor-pointer ">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <AlarmOnIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              Expiring within 4-7 days
            </p>
          </div>
        </div>
        </Link>

        <Link to={'/specific/expired'}>
        <div onClick={() => handleOnClickMenu("expired")} className="w-full h-fit border-2 bg:white rounded-lg cursor-pointer ">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <ErrorIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">Expired</p>
          </div>
        </div>
        </Link>

        <Link to={'/specific/inactive-member'}>
        <div onClick={() => handleOnClickMenu("inActiveMembers")} className="w-full h-fit border-2 bg:white rounded-lg cursor-pointer ">
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <NewReleasesIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-xl my-3 font-semibold font-mono">
              InActive Members
            </p>
          </div>
        </div>
        </Link>

      </div>
      <div className="md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl">
        Contact Developer for any Technical Error at +123456789
      </div>
    </div>
  );
};

export default Dashboard;
