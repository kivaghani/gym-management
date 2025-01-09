import React, { useEffect, useState } from "react";
import { ArrowBackIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MemberCard from "../../Components/MemberCard.jsx/MemberCard";
import {
  getMonthlyJoined,
  threeDayExpire,
  foutToSevenDaysExpire,
  expired,
  inActiveMembers
} from "./Data";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    try {
      setLoading(true);
      setError(null);
      let response;

      switch (func) {
        case "monthlyJoined":
          setHeader("Members Joined This Month");
          response = await getMonthlyJoined();
          break;

        case "threeDayExpire":
          setHeader("Members Expiring In 3 Days");
          response = await threeDayExpire();
          break;

        case "foutToSevenDaysExpire":
          setHeader("Members Expiring In 4-7 Days");
          response = await foutToSevenDaysExpire();
          break;

        case "expired":
          setHeader("Expired Memberships");
          response = await expired();
          break;

        case "inActiveMembers":
          setHeader("Inactive Members");
          response = await inActiveMembers();
          break;

        default:
          setHeader("All Members");
          break;
      }

      if (response?.members) {
        setData(response.members);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-black p-5 w-3/4 flex justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-black p-5 w-3/4 flex justify-center items-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="text-black p-5 w-3/4 flex-col">
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <Link
          to="/dashboard"
          className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black"
        >
          <ArrowBackIos /> Back To Dashboard
        </Link>
      </div>

      <div className="mt-5 text-xl text-slate-900 flex justify-between items-center">
        <span>{header}</span>
        <span className="text-base text-gray-600">
          Total: {data.length} {data.length === 1 ? 'member' : 'members'}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="bg-slate-100 p-5 mt-5 rounded-lg flex justify-center items-center h-[400px]">
          <div className="text-gray-500 text-lg">No members found</div>
        </div>
      ) : (
        <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[calc(100vh-250px)]">
          {data.map((item, index) => (
            <MemberCard key={item._id || index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneralUser;