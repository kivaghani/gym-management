const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = 4000;

app.use(cookieParser());
app.use(express.json());
require("./DBConn/conn");

const GymRoutes = require("./Routes/gym");
const MembershipRoutes = require("./Routes/membership");

app.use("/auth", GymRoutes);
app.use("/plans", MembershipRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Congratulation Tour server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
