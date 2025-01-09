// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Stack from "@mui/material/Stack";
// import LinearProgress from "@mui/material/LinearProgress";
// import { toast, ToastContainer } from 'react-toastify';

// const AddMember = () => {
//   const [loaderImage, setLoaderImage] = useState(false);
//   const [membershipList, setMembershipList] = useState([]);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [inputField, setInputField] = useState({
//     name: "",
//     mobileNo: "",
//     address: "",
//     membership: "",
//     profilePic:
//       "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
//     joiningDate: "",
//   });

//   const handleOnChange = (event, name) => {
//     setInputField({ ...inputField, [name]: event.targer.value });
//   };

//   const uploadImage = async (event) => {
//     setLoaderImage(true);
//     console.log("Img Uploading");
//     const files = event.target.files;
//     const data = new FormData();
//     data.append("file", files[0]);

//     // dcxwtk52l

//     data.append("upload_preset", "gym-management");
//     try {
//       const response = await axios.post(
//         "http://api.cloudinary.com/v1_1/dcxwtk52l/image/upload",
//         data
//       );
//       console.log(response);
//       const imgUrl = response.data.url;
//       setLoaderImage(false);

//       setInputField({ ...inputField, ["profilePic"]: imgUrl });
//     } catch (err) {
//       console.log(err);
//       setLoaderImage(false);
//     }
//   };

//   const fetchMembership = async()=>{
//     await axios.get('http://localhost:4000/plans/get-membership', {withCredentials:true}).then((response) => {
//       setMembershipList(response.data.membership)
//       if(response.data.membership.length===0){
//         return toast.error("No any Membership added yet", {
//           className: "text-lg"
//         })
//       }else{
//         let a = response.data.membership[0]._id;
//         setSelectedOption(a)
//         setInputField({...inputField, membership:a})
//       }
//     }).catch(err => {
//       console.log(err);
//       toast.error("something Wrong Happened")
//     })
//   }

//   useEffect(() => {
//     console.log(inputField)
//     fetchMembership();
//   },[])

//   const handleOnChangeSelect = (event) => {
//     let value = event.target.value;
//     setSelectedOption(value)
//     setInputField({...inputField, membership:value})
//   }

//   const handleRegisterButton = async()=>{
//     await axios.post('http://localhost:4000/members/register-member', inputField, {withCredentials:true}).then((response) =>{
//    toast.success("Added successfully");
//    setTimeout(() => {
//     window.location.reload()
//    }, 2000);
//     }).catch(err => {
//       console.log(err);
//       toast.error("something Wrong Happened")
  
//     })
//   }



//   return (
//     <div className="text-black">
//       <div className="grid gap-5 grid-cols-2 text-lg">
//         <input
//           value={inputField.name}
//           onChange={(event) => {
//             handleOnChange(event, "name");
//           }}
//           type="text"
//           placeholder="Name of the Joinee"
//           className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
//         />
//         <input
//           value={inputField.mobileNo}
//           onChange={(event) => {
//             handleOnChange(event, "mobileNo");
//           }}
//           type="text"
//           placeholder="Mobile No"
//           className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
//         />
//         <input
//           value={inputField.address}
//           onChange={(event) => {
//             handleOnChange(event, "address");
//           }}
//           type="text"
//           placeholder="Enter Address"
//           className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
//         />
//         <input
//           onChange={(event) => {
//             handleOnChange(event, "joiningDate");
//           }}
//           value={inputField.joiningDate}
//           type="date"
//           className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
//         />

//       <select value={selectedOption} onChange={handleOnChangeSelect} className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray-600">
//         {
//           membershipData.map((item, index) => {
//               return(
//                 <option key={index} value={item._id}>{item.months} Months Membership</option>
//               )
//           })
//         }
//         </select>

//         <input type="file" onChange={(e) => uploadImage(e)} />

//         <div className="w-[100px] h-[100px]">
//           <img
//             src={inputField.profilePic}
//             alt=""
//             className="w-full h-full rounded-full"
//           />
//           {loaderImage && (
//             <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
//               <LinearProgress color="secondary" />
//             </Stack>
//           )}
//         </div>

//         <div onClick={() => handleRegisterButton()} className="bg-slate-900 text-lg w-28 border-2 p-3 h-14 mt-5 text-center mx-auto rounded-xl text-white cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//           Register
//         </div>
//       </div>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default AddMember;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMember = () => {
  const [loaderImage, setLoaderImage] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic: "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    joiningDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const validateForm = () => {
    if (!inputField.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!inputField.mobileNo.trim()) {
      toast.error("Mobile number is required");
      return false;
    }
    if (!inputField.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!inputField.joiningDate) {
      toast.error("Joining date is required");
      return false;
    }
    if (!inputField.membership) {
      toast.error("Please select a membership plan");
      return false;
    }
    return true;
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPG, PNG)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setLoaderImage(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcxwtk52l/image/upload",
        data
      );
      const imgUrl = response.data.url;
      setInputField({ ...inputField, profilePic: imgUrl });
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image");
    } finally {
      setLoaderImage(false);
    }
  };

  const fetchMembership = async () => {
    try {
      const response = await axios.get('http://localhost:4000/plans/get-membership', {
        withCredentials: true
      });
      
      if (response.data.membership.length === 0) {
        toast.error("No membership plans available");
        return;
      }
      
      setMembershipList(response.data.membership);
      const defaultMembership = response.data.membership[0]._id;
      setSelectedOption(defaultMembership);
      setInputField(prev => ({ ...prev, membership: defaultMembership }));
    } catch (err) {
      console.error("Failed to fetch memberships:", err);
      toast.error("Failed to load membership plans");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setInputField(prev => ({ ...prev, membership: value }));
  };

  const handleRegisterButton = async () => {
    if (!validateForm() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await axios.post(
        'http://localhost:4000/members/register-member',
        inputField,
        { withCredentials: true }
      );
      toast.success("Member registered successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.response?.data?.message || "Failed to register member");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-black p-6">
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 text-lg max-w-4xl mx-auto">
        <input
          value={inputField.name}
          onChange={(event) => handleOnChange(event, "name")}
          type="text"
          placeholder="Name of the Joinee"
          className="border-2 w-full pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.mobileNo}
          onChange={(event) => handleOnChange(event, "mobileNo")}
          type="tel"
          placeholder="Mobile No"
          className="border-2 w-full pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.address}
          onChange={(event) => handleOnChange(event, "address")}
          type="text"
          placeholder="Enter Address"
          className="border-2 w-full pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          onChange={(event) => handleOnChange(event, "joiningDate")}
          value={inputField.joiningDate}
          type="date"
          className="border-2 w-full pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border-2 w-full h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray-600"
        >
          {membershipList.map((item, index) => (
            <option key={item._id} value={item._id}>
              {item.months} Months Membership
            </option>
          ))}
        </select>

        <div className="space-y-2">
          <input
            type="file"
            onChange={uploadImage}
            accept="image/png, image/jpeg, image/jpg"
            className="border-2 w-full p-2 border-slate-400 rounded-md"
          />
          <div className="relative w-24 h-24">
            <img
              src={inputField.profilePic}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            {loaderImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleRegisterButton}
          disabled={isSubmitting}
          className={`col-span-2 bg-slate-900 text-lg w-full max-w-xs mx-auto h-14 mt-5 rounded-xl text-white 
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddMember;  