import { errorHandler } from "../helpers/errorHandler.js";

export const createAccessChatController = async (req, res) => {
  try {
  } catch (error) {
    const message = errorHandler(error) || "Internal Server Error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
export const fetchChatsController = async (req, res) => {
  try {
  } catch (error) {
    const message = errorHandler(error) || "Internal Server Error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
export const createGroupController = async (req, res) => {
  try {
  } catch (error) {
    const message = errorHandler(error) || "Internal Server Error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
export const renameGroupController = async (req, res) => {
  try {
  } catch (error) {
    const message = errorHandler(error) || "Internal Server Error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
export const addToGroupController = async (req, res) => {
  try {
  } catch (error) {
    const message = errorHandler(error) || "Internal Server Error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
export const removeFromGroupController = async (req, res) => {
  try {
  } catch (error) {
    const message = errorHandler(error) || "Internal Server Error";
    return res.status(400).json({
      success: false,
      message,
    });
  }
};
