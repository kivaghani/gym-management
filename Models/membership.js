const mongoose = require("mongoose");

const MembershipSchema = mongoose.Schema({
  months: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  gym: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "gym",
    required: true,
  },
});

const modelMembership = mongoose.Model("membership", MembershipSchema);
module.exports = modelMembership;
