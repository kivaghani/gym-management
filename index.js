const express = require("express");
const app = express();
require('dotenv').config()

const PORT = 4000;

app.use(express.json());
require("./DBConn/conn");

const GymRoutes = require("./Routes/gym");
app.use("/auth", GymRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Congratulation Tour server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
