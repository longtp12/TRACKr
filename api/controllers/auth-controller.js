import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  // check email
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).json("User already existed");
  }
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    // check user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(403).json("Wrong Credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const {password, ...others} = user._doc;
    
    res.status(200).json({...others, accessToken})
  } catch (err) {
    res.status(500).json(err);
  }
};
