import axios from "axios";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const AddMember = () => {
    const [loaderImage, setLoaderImage] = useState(false);
  
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic:
      "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    joiningDate: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.targer.value });
  };

  const uploadImage = async (event) => {
    setLoaderImage(true)
    console.log("Img Uploading");
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    // dcxwtk52l

    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "http://api.cloudinary.com/v1_1/dcxwtk52l/image/upload",
        data
      );
      console.log(response);
      const imgUrl = response.data.url;
      setLoaderImage(false)

      setInputField({ ...inputField, ["profilePic"]: imgUrl });
    } catch (err) {
      console.log(err);
      setLoaderImage(false)

    }
  };

  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          value={inputField.name}
          onChange={(event) => {
            handleOnChange(event, "name");
          }}
          type="text"
          placeholder="Name of the Joinee"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.mobileNo}
          onChange={(event) => {
            handleOnChange(event, "mobileNo");
          }}
          type="text"
          placeholder="Mobile No"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.address}
          onChange={(event) => {
            handleOnChange(event, "address");
          }}
          type="text"
          placeholder="Enter Address"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          onChange={(event) => {
            handleOnChange(event, "joiningDate");
          }}
          value={inputField.joiningDate}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray">
          <option value="">1 Month Membership</option>
          <option value="">2 Month Membership</option>
          <option value="">3 Month Membership</option>
          <option value="">4 Month Membership</option>
          <option value="">6 Month Membership</option>
        </select>

        <input type="file" onChange={(e) => uploadImage(e)} />

        <div className="w-[100px] h-[100px]">
          <img
            src={inputField.profilePic}
            alt=""
            className="w-full h-full rounded-full"
          />
           {loaderImage && (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
        </div>

        <div className="bg-slate-900 text-lg w-28 border-2 p-3 h-14 mt-5 text-center mx-auto rounded-xl text-white cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>
      </div>
    </div>
  );
};

export default AddMember;
