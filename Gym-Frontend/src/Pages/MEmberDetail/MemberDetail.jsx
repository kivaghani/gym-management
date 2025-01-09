import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { toast, ToastContainer } from "react-toastify";

const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [membership, setMembership] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [planMember, setPlanMember] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSwitchBtn = async () => {
    try {
      const newStatus = status === "Active" ? "Pending" : "Active";
      await axios.put(
        `http://localhost:4000/members/change-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      setStatus(newStatus);
      // Always show renewal option when status is Active
      if (newStatus === "Active") {
        setRenew(true);
        await fetchMembership();
      } else {
        setRenew(false);
      }
      
      toast.success("Status Changed Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to change status");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        await fetchData();
        if (status === "Active") {
          await fetchMembership();
        }
      } finally {
        setLoading(false);
      }
    };
    
    initialize();
  }, [id]);

  const fetchMembership = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/plans/get-membership",
        { withCredentials: true }
      );
      setMembership(response.data.membership);
      if (response.data.membership.length > 0) {
        setPlanMember(response.data.membership[0]._id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch membership plans");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/members/get-member/${id}`,
        { withCredentials: true }
      );
      setData(response.data.member);
      setStatus(response.data.member.status);
      
      // Show renewal option if status is Active
      if (response.data.member.status === "Active") {
        setRenew(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch member details");
    }
  };

  const handleRenewSaveBtn = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/members/update-member-plan/${id}`,
        { membership: planMember },
        { withCredentials: true }
      );
      setData(response.data.member);
      toast.success("Membership Renewed Successfully");
      await fetchData(); // Refresh data after renewal
    } catch (err) {
      console.error(err);
      toast.error("Failed to renew membership");
    }
  };

  if (loading) {
    return <div className="w-3/4 text-black p-5 h-[100%]">Loading...</div>;
  }

  return (
    <div className="w-3/4 text-black p-5 h-[100%]">
      <div
        onClick={() => navigate(-1)}
        className="border-2 w-fit cursor-pointer text-xl font-sans text-white p-2 rounded-xl bg-slate-900"
      >
        <ArrowBack /> Go Back
      </div>
      
      <div className="p-2">
        <div className="w-[100%] h-fit flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 max-w-xs mx-auto">
            <img
              src={data?.profilePic}
              className="w-full rounded-lg"
              alt="Member"
            />
          </div>
          
          <div className="w-full md:w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name: {data?.name}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile: {data?.mobileNo}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address: {data?.address}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joined Date: {data?.createAt?.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date: {data?.nextBillDate?.slice(0, 10).split("-").reverse().join("-")}
            </div>
            <div className="mt-1 mb-2 flex gap-4 text-2xl font-semibold items-center">
              Status:{" "}
              <Switch
                onColor="#6366F1"
                checked={status === "Active"}
                onChange={handleSwitchBtn}
              />
              <span className={status === "Active" ? "text-green-600" : "text-red-600"}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {status === "Active" && (
          <div className="mt-2 rounded-lg p-3 mb-5 h-fit bg-slate-50 md:w-[100%]">
            <div>
              <div className="my-1">
                <div className="text-xl font-semibold mb-2">Select Membership Plan</div>
                <select
                  value={planMember}
                  onChange={(e) => setPlanMember(e.target.value)}
                  className="w-full border-2 p-2 rounded-lg"
                >
                  {membership.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.months} Months Membership
                    </option>
                  ))}
                </select>
                
                <div
                  className="mt-3 rounded-lg p-3 border-2 border-slate-900 text-center w-48 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  onClick={handleRenewSaveBtn}
                >
                  Update Plan
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MemberDetail;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Switch from "react-switch";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { ArrowLeft } from "lucide-react";

// const MemberDetail = () => {
//   const [status, setStatus] = useState("Pending");
//   const [renew, setRenew] = useState(false);
//   const [membership, setMembership] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [planMember, setPlanMember] = useState("");

//   const handleSwitchBtn = async () => {
//     try {
//       setLoading(true);
//       let newStatus = status === "Active" ? "Pending" : "Active";
//       const response = await axios.put(
//         `http://localhost:4000/members/change-status/${id}`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
      
//       if (response.data) {
//         setStatus(newStatus);
//         toast.success("Status Changed Successfully");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Something Went Wrong");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isDateInPast = (inputDate) => {
//     if (!inputDate) return false;
//     const today = new Date();
//     const givenDate = new Date(inputDate);
//     return givenDate < today;
//   };

//   const fetchMembership = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:4000/plans/get-membership",
//         { withCredentials: true }
//       );
      
//       if (response.data?.membership) {
//         setMembership(response.data.membership);
//         if (response.data.membership.length > 0) {
//           setPlanMember(response.data.membership[0]._id);
//         }
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Failed to fetch memberships");
//       console.error(err);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:4000/members/get-member/${id}`,
//         { withCredentials: true }
//       );
      
//       if (response.data?.member) {
//         setData(response.data.member);
//         setStatus(response.data.member.status);
//         toast.success(response.data.message || "Member details fetched successfully");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Failed to fetch member details");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRenewSaveBtn = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `http://localhost:4000/members/update-member-plan/${id}`,
//         { membership: planMember },
//         { withCredentials: true }
//       );
      
//       if (response.data?.member) {
//         setData(response.data.member);
//         setRenew(false);
//         toast.success(response.data.message || "Membership renewed successfully");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Failed to renew membership");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchMembership();
//   }, [id]); // Added id as dependency

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch (err) {
//       return dateString;
//     }
//   };

//   return (
//     <div className="w-3/4 text-black p-5 h-[100%]">
//       <div
//         onClick={() => navigate(-1)}
//         className="border-2 w-fit cursor-pointer text-xl font-sans text-white p-2 rounded-xl bg-slate-900 flex items-center gap-2"
//       >
//         <ArrowLeft size={24} /> Go Back
//       </div>

//       {loading && !data ? (
//         <div className="flex justify-center items-center h-64">Loading...</div>
//       ) : (
//         <div className="p-2">
//           <div className="w-[100%] h-fit flex flex-col md:flex-row">
//             <div className="w-full md:w-1/3 max-w-xs mx-auto">
//               {data?.profilePic && (
//                 <img
//                   src={data.profilePic}
//                   className="w-full rounded-lg object-cover"
//                   alt={data.name || "Member"}
//                 />
//               )}
//             </div>
//             <div className="w-full md:w-2/3 mt-5 text-xl p-5">
//               <div className="mt-1 mb-2 text-2xl font-semibold">
//                 Name: {data?.name}
//               </div>
//               <div className="mt-1 mb-2 text-2xl font-semibold">
//                 Mobile: {data?.mobileNo}
//               </div>
//               <div className="mt-1 mb-2 text-2xl font-semibold">
//                 Address: {data?.address}
//               </div>
//               <div className="mt-1 mb-2 text-2xl font-semibold">
//                 Joined Date: {formatDate(data?.createAt)}
//               </div>
//               <div className="mt-1 mb-2 text-2xl font-semibold">
//                 Next Bill Date: {formatDate(data?.nextBillDate)}
//               </div>
//               <div className="mt-1 mb-2 flex items-center gap-4 text-2xl font-semibold">
//                 Status:{" "}
//                 <Switch
//                   onColor="#6366F1"
//                   checked={status === "Active"}
//                   onChange={handleSwitchBtn}
//                   disabled={loading}
//                 />
//                 <span>{status}</span>
//               </div>

//               {data && isDateInPast(data.nextBillDate) && (
//                 <div
//                   onClick={() => !loading && setRenew((prev) => !prev)}
//                   className={`
//                     rounded-lg p-3 border-2 border-slate-900 text-center
//                     ${renew && status === "Active"
//                       ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
//                       : ""
//                     }
//                     w-full md:w-1/2 
//                     ${loading 
//                       ? "opacity-50 cursor-not-allowed" 
//                       : "cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 to-pink-500"
//                     }
//                   `}
//                 >
//                   Renew
//                 </div>
//               )}
//             </div>
//           </div>

//           {renew && status === "Active" && (
//             <div className="mt-2 rounded-lg p-3 mb-5 h-fit bg-slate-50">
//               <div className="my-1">
//                 <div className="font-semibold mb-2">Select Membership Plan</div>
//                 <select
//                   value={planMember}
//                   onChange={(e) => setPlanMember(e.target.value)}
//                   className="w-full border-2 p-2 rounded-lg"
//                   disabled={loading}
//                 >
//                   {membership.map((item) => (
//                     <option key={item._id} value={item._id}>
//                       {item.months} Months Membership
//                     </option>
//                   ))}
//                 </select>
//                 <div
//                   className={`
//                     mt-3 rounded-lg p-3 border-2 border-slate-900 text-center
//                     w-48 mx-auto 
//                     ${loading 
//                       ? "opacity-50 cursor-not-allowed" 
//                       : "cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
//                     }
//                   `}
//                   onClick={() => !loading && handleRenewSaveBtn()}
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default MemberDetail;