import { errorHandler } from "../helpers/errorHandler.js";
import { UserModel } from "../models/user.model.js";

export const getUsersControllers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await UserModel.find({
      ...keyword,
      _id: { $ne: req.user._id },
    });
    return res.status(200).json({ users });
  } catch (error) {
    const message = errorHandler(error) || "Internal server error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
