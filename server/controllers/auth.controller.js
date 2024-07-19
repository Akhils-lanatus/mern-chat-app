import { errorHandler } from "../helpers/errorHandler.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../helpers/cloudinary.js";
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const avatarPath = req.file?.path;
    const cloudinaryResponse = await uploadOnCloudinary(avatarPath);
    if (!cloudinaryResponse) {
      throw new Error("Error uploading avatar, try again");
    }
    const pic = cloudinaryResponse.url;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      throw new Error("Unable to register, pls try again");
    }
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });
    return res.status(200).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("No such email found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }
    const token = await jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JSONWEBTOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    return res.status(200).json({
      success: true,
      message: "Logged in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.pic,
        token,
      },
    });
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
