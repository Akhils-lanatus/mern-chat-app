import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      overwrite: false,
      unique_filename: true,
      use_filename: true,
      folder: "uploads",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(`Error while uploading :: ${error}`);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
export { uploadOnCloudinary };
