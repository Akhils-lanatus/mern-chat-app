import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { errorHandler } from "../helpers/errorHandler.js";
export const checkAuth = async (req, res, next) => {
  try {
    const cookieToken = req.cookies.token;

    if (!cookieToken) {
      throw new Error("Unauthorized access - Please login");
    }

    let token = await jwt.verify(cookieToken, process.env.JSONWEBTOKEN_SECRET);

    if (!token) {
      throw new Error("Invalid token");
    }

    const user = await UserModel.findById(token._id).select("-password");

    if (!user) {
      throw new Error("No user found");
    }

    req.user = user;

    next();
  } catch (error) {
    const message = errorHandler(error) || "Internal server error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
