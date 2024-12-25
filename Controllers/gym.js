const Gym = require("../Models/gym");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { userName, email, password, profilePic, gymName } = req.body;

    const isExist = await Gym.findOne({ userName });

    if (isExist) {
      res.status(400).json({
        error: "Username Already Exist, Please try with other username",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const newGym = new Gym({
        userName,
        email,
        password: hashedPassword,
        profilePic,
        gymName,
      });
      await newGym.save();
      res.status(201).json({
        message: "User registered Successfully",
        success: "yes",
        data: newGym,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const gym = await Gym.findOne({ userName });
    if (gym && (await bcrypt.compare(password, gym.password))) {
      res
        .status(200)
        .json({ message: "Logged In successfully", success: "true", gym });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};
