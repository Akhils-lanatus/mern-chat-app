import axios from "axios";
import { messages } from "../constants/constant";
import { returnApiResponse } from "./returnApiData";
export const registerUser = async (data) => {
  try {
    const response = await axios.post(
      `${messages.BACKEND_URL}/auth/register`,
      data
    );
    return returnApiResponse(response.data);
  } catch (error) {
    return { data: null, error };
  }
};
export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      `${messages.BACKEND_URL}/auth/login`,
      data
    );
    return returnApiResponse(response.data);
  } catch (error) {
    return { data: null, error };
  }
};
