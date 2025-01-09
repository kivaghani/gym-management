const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT  
const CLIENT_URL = process.env.CLIENT_URL

app.use(
  cors({
    origin: CLIENT_URL, 
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

require("./DBConn/conn");

const GymRoutes = require("./Routes/gym");
const MembershipRoutes = require("./Routes/membership");
const MemberRoutes = require("./Routes/member");

app.use("/auth", GymRoutes);
app.use("/plans", MembershipRoutes);
app.use("/members", MemberRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Congratulations! Your server is running successfully." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
