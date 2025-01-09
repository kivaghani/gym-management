import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';

const AddMembership = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ 
    months: "", 
    price: "" 
  });
  const [membership, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fetchMembership = async () => {
    try {
      const response = await axios.get('http://localhost:4000/plans/get-membership', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setMembership(response.data.membership);
      toast.success(`${response.data.membership.length} Memberships fetched`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch memberships");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleMembership = async () => {
    if (!inputField.months || !inputField.price) {
      toast.error("Please fill both months and price");
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/plans/add-membership',
        inputField,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      toast.success(response.data.message);
      fetchMembership(); // Refresh the list after adding
      setInputField({ months: "", price: "" }); // Reset form
      handleClose();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="text-black p-4">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {membership.map((item, index) => (
          <div 
            key={item._id} 
            className="text-lg bg-slate-900 text-white border-2 p-3 flex-col gap-3 justify-between rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            <div>{item.months} Months Membership</div>
            <div>Rs {item.price}</div>
          </div>
        ))}
      </div>

      <hr className="mt-10 mb-10" />
      
      <div className="flex gap-10 mb-10">
        <input
          value={inputField.months}
          onChange={(event) => handleOnChange(event, "months")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          min="1"
          placeholder="Add No. of Months"
        />
        <input
          value={inputField.price}
          onChange={(event) => handleOnChange(event, "price")}
          className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2"
          type="number"
          min="0"
          placeholder="Add Price"
        />
        <button
          onClick={handleMembership}
          className="text-lg border-2 p-2 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        >
          Add +
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembership;