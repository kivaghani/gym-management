import React from "react";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/Signup/signUp";

const Home = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl">
        Welcome To Gym Management System
      </div>
      <div className="w-full h-[100%] flex justify-center bg-cover bg-center bg-[url('https://images.pexels.com/photos/669584/pexels-photo-669584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
        <div className="w-full lg:flex gap-32">
          {/* login */}
          <Login />
          {/* register  */}
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Home;
