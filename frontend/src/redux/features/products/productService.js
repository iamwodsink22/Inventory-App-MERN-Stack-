import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const BACKEND_URL = process.env.REACT_APP_BACKEND;
const API_URL = `${BACKEND_URL}/api/product`;

const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};
const getProduct = async () => {
  const response = await axios.get(`${API_URL}/allproducts`);
  return response.data;
};
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/deleteproduct/${id}`);
  return response.data;
};
const getaProduct = async (id) => {
  const response = await axios.get(`${API_URL}/getproduct/${id}`);
  return response.data;
};
const updateProduct = async (id, formData) => {
  console.log(id);
  console.log(formData);
  console.log("Hello update main");
  const response = await axios.patch(
    `${API_URL}/updateproduct/${id}`,
    formData
  );
  return response.data;
};
const productService = {
  createProduct,
  getProduct,
  deleteProduct,
  getaProduct,
  updateProduct,
};
export default productService;
