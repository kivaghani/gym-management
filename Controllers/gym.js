const Gym = require("../Models/gym");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const gym = await Gym.findOne({ email });
    if (gym) {
      const buffer = crypto.randomBytes(4);
      const token = (buffer.readUInt32BE(0) % 900000) + 100000;
      gym.resetPasswordToken = token;
      gym.resetPasswordExpires = Date.now() + 36000000;
      await gym.save();

      const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: "Password Reset",
        text: `You requested a password reset. Your OTP is : ${token}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ error: "Server error", errorMsg: error });
        } else {
          res
            .status(200)
            .json({ message: "OTP sent successfully", success: "true" });
        }
      });
    } else {
      return res.status(400).json({ error: "Gym not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "server Error",
    });
  }
};

exports.checkOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const gym = await Gym.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!gym) {
      return res.status(400).json({ error: "Otp is Invalid or has expired" });
    }
    res.status(200).json({ message: "OTP is sucessfully Verified" });
  } catch (err) {
    res.status(500).json({
      error: "server Error",
    });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const {email, newPassword} = req.body;
    const gym = await Gym.findOne({email});
    if (!gym) {
      return res.status(400).json({ error: "Some Technical issue, Please try again later" });
    }
    const hashedPassword  = await bcrypt.hash(newPassword, 10);
    gym.password = hashedPassword;
    gym.resetPasswordToken = undefined;
    gym.resetPasswordExpires = undefined;

    await gym.save();
    res.status(200).json({message : "Password Reset Successfully"})

  } catch (err) {
    res.status(500).json({
      error : "Server Error"
    })
  }
}