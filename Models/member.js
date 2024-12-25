const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
  },
  address: {
    type: String,
  },
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "membership",
    required: true,
  },
  gym: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gym",
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Active",
  },
  lastPayment: {
    type: Date,
    default: Date.now(),
  },
  nextBillDate: {
    type: Date,
    default: Date.now(),
  },
});

const memberModel = mongoose.Model("member", memberSchema);
module.exports = memberModel;
