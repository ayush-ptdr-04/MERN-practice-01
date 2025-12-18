const User = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const newuser = new User({ name, email, password });
    newuser.password = await bcrypt.hash(password, 10);
    await newuser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {}
  return res
    .status(500)
    .json({ message: "Iinternal server error", success: false });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errorMsg = "Invalid email or password";

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "48 hours" }
    );
    res.status(200).json({
      message: "Login successfully",
      success: true,
      token: jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = { signup, login };
