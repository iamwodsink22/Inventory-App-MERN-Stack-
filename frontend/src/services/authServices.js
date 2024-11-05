import axios from "axios";
import { toast } from "react-toastify";
export const BACKEND_URL = "https://inventory-app-mern-stack-api.vercel.app";
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/user/register`,
      userData,
      { withCredentials: true }
    );

    toast.success("User Registered Successfully");
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/user/login`,
      formData,
      { withCredentials: true }
    );
    toast.success("User Logged-In Successfully");
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/user/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const forgotPw = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/user/forgotpw`,
      userData
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const changePassword = async (userData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/user/updatepw`,
      userData
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const ResetPw = async (formData, token) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/user/resetpw/${token}`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const loginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/user/loggedin`);

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/user/userprofile`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const updateProfile = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/user/editprofile`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
