import { userModel } from "../models/user.mode.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res) => {
  try {
    const { userName } = req.user;
    if (!userName) {
      res.status(401).json({ success: false, message: "unauthorized!" });
    }
    res.status(200).json({ success: true, message: "Authorized!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

export const signUp = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const exists = await userModel.findOne({ where: { userName } });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken!" });
    }
    await userModel.create({ userName, password });
    const token = jwt.sign({ userName }, process.env.JWT_SEC);
    res.cookie("token", token, { httpOnly: true, path: "/", secure: false });
    res.status(201).json({ success: true, message: "User created!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const exists = await userModel.findOne({ where: { userName, password } });
    if (!exists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ userName: exists.userName }, process.env.JWT_SEC);
    res.cookie("token", token, { httpOnly: true, path: "/", secure: false });
    res.status(201).json({ success: true, data: exists });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.setHeader("set-cookie", "token=; max-age=0");
    res.status(200).json({ success: true, message: "Logout" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};
