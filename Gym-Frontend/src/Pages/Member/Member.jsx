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

const Member = () => {
  const [addMembership, setAddmemberShip] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalDate, setTotalDate] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let totalDate = 52;
    setTotalDate(totalDate);

    let extraPage = totalDate % limit === 0 ? 0 : 1;
    let totalPage = parseInt(totalDate / limit) + extraPage;
    setNoOfPage(totalPage);

    if (totalDate === 0) {
      setStartFrom(-1);
      setEndTo(0);
    } else if (totalDate < 10) {
      setStartFrom(0);
      setEndTo(totalDate);
    }
  };

  const handleMemberShip = () => {
    setAddmemberShip((prev) => !prev);
  };

  const handleMembers = () => {
    setAddMember((prev) => !prev);
  };

  const handlePrev = () => {
    if(currentPage !== 1){
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      var from = (currentPage - 1)*9;
      var to = (currentPage*9)
      setStartFrom(from)
      setEndTo(to);
    }
  }

  const handleNext = () => {
    if(currentPage !== noOfPage){
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      var from = (currentPage - 1)*9;
      var to = (currentPage*9)
      if(to > totalDate) {
        to = totalDate
      }
      setStartFrom(from)
      setEndTo(to);
    }
  }


  return (
    <div className="text-black p-5 w-3/4 h-[100vh]">
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <div
          onClick={() => handleMembers()}
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          Add Member
          <FitnessCenterIcon />
        </div>
        <div
          onClick={() => handleMemberShip()}
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
          type="text"
          className="border-2 w-full p-2 rounded-lg"
          placeholder="Search By Name or Mobile No"
        />
        <div className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <SearchIcon />
        </div>
      </div>

      <div className="mt-5 text-xl flex justify-between text-slate-900">
        <div>Total Members</div>
        <div className="flex gap-5">
          <div>
            {" "}
            {startFrom + 1} - {endTo} of {totalDate} Members
          </div>
          <div
            className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : null} `}
            onClick={() => handlePrev()}
          >
            <ChevronLeftIcon />
          </div>
          <div
            className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 ${currentPage === noOfPage? 'bg-gray-200 text-gray-400' : null}`}
            onClick={() => handleNext()}
            >
            <ChevronRightIcon />
          </div>
        </div>
      </div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">
        {/* member card  */}
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>

      {addMembership && (
        <Model
          header="Add Memberaship"
          handleClose={handleMemberShip}
          content={<AddMembership />}
        />
      )}
      {addMember && (
        <Model
          header="Add New Member"
          handleClose={handleMembers}
          content={<AddMember />}
        />
      )}
    </div>
  );
};

export default Member;
