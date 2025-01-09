import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MemberCard from "../../Components/MemberCard.jsx/MemberCard";
import Model from "../../Components/Model/Model";
import AddMembership from "../../Components/AddMembership/AddMembership";
import AddMember from "../../Components/AddMember/AddMember";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Member = () => {
  const [addMembership, setAddMembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const limit = 9;

  useEffect(() => {
    fetchData(currentPage, limit);
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async (page, limit) => {
    try {
      const skip = (page - 1) * limit;
      const response = await axios.get(
        `http://localhost:4000/members/all-member?skip=${skip}&limit=${limit}`,
        { withCredentials: true }
      );

      const totalData = response.data.totalMembers;
      setTotalData(totalData);
      setData(response.data.members);

      const totalPage = Math.ceil(totalData / limit);
      setNoOfPage(totalPage);
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    }
  };

  const handleMembership = () => {
    setAddMembership((prev) => !prev);
  };

  const handleMembers = () => {
    setAddMember((prev) => !prev);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < noOfPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/members/searched-members?searchTerm=${search}`,
          { withCredentials: true }
        );
        setData(response.data.members);
        setTotalData(response.data.totalMembers);
      } catch (err) {
        console.log(err);
        toast.error("Technical Fault");
      }
    }
  };

  return (
    <div className="text-black p-5 w-3/4 h-[100vh]">
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <div
          onClick={handleMembers}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          Add Member
          <FitnessCenterIcon />
        </div>
        <div
          onClick={handleMembership}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          Membership <ControlPointIcon />
        </div>
      </div>

      <Link to="/dashboard">
        <ArrowBackIcon /> Back to Dashboard
      </Link>

      <div className="mt-5 w-1/2 flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="border-2 w-full p-2 rounded-lg"
          placeholder="Search By Name or Mobile No"
        />
        <div
          onClick={handleSearchData}
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          <SearchIcon />
        </div>
      </div>

      <div className="mt-5 text-xl flex justify-between text-slate-900">
        <div>Total Members: {totalData}</div>
        {!isSearchModeOn && (
          <div className="flex gap-5">
            <div>
              Showing {Math.min((currentPage - 1) * limit + 1, totalData)} - {Math.min(currentPage * limit, totalData)} of {totalData} Members
            </div>
            <div
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === 1 ? "bg-gray-200 text-gray-400" : ""}`}
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </div>
            <div
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === noOfPage ? "bg-gray-200 text-gray-400" : ""}`}
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">
        {data.map((item, index) => (
          <MemberCard key={index} item={item} />
        ))}
      </div>

      {addMembership && (
        <Model
          header="Add Membership"
          handleClose={handleMembership}
          content={<AddMembership handleClose={handleMembership} />}
        />
      )}
      {addMember && (
        <Model
          header="Add New Member"
          handleClose={handleMembers}
          content={<AddMember />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Member;