import React from "react";
import ProductForm from "../../Components/Product/Productform/ProductForm";
import { useState } from "react";
import { useSelector } from "react-redux";

import { selectLoading } from "../../redux/features/products/productSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/features/products/productSlice";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initstate = {
    name: "",
    category: "",
    quantity: "",
    price: "",
  };
  const isLoading = useSelector(selectLoading);
  const [products, setproducts] = useState(initstate);
  const [photo, setphoto] = useState("");
  const [pPreview, setpPreview] = useState(null);
  const [description, setdescription] = useState("");
  const { name, category, quantity, price } = products;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproducts({ ...products, [name]: value });
  };
  const handleImagechange = (e) => {
    setphoto(e.target.files[0]);
    setpPreview(URL.createObjectURL(e.target.files[0]));
  };
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("photo", photo);

    await dispatch(createProduct(formData));

    navigate("/dashboard");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h2 className="--mt">Add new Product</h2>
      <ProductForm
        product={products}
        photo={photo}
        pPreview={pPreview}
        description={description}
        setdescription={setdescription}
        handleImagechange={handleImagechange}
        handleInputChange={handleInputChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
