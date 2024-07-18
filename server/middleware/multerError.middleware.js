import multer from "multer";
import { multerErrorMessages } from "../constants/errors.js";
import { errorHandler } from "../helpers/errorHandler.js";
export const handleMulterError = async (err, req, res, next) => {
  try {
    if (err instanceof multer.MulterError) {
      throw new Error(multerErrorMessages[err.code]);
    } else if (err) {
      throw new Error(err.message);
    } else {
      next();
    }
  } catch (error) {
    const message = errorHandler(error);
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
