import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  getAProduct,
  getAllProduct,
  selectLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/products/productSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";

import ProductForm from "../../Components/Product/Productform/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  const editProduct = useSelector(selectProduct);

  const [product, setproduct] = useState(editProduct);
  const [photo, setphoto] = useState("");
  const [pPreview, setpPreview] = useState(null);
  const [description, setdescription] = useState("");
  useEffect(() => {
    dispatch(getAProduct(id));
  }, [id, dispatch]);
  useEffect(() => {
    setproduct(editProduct);
    setpPreview(
      editProduct && editProduct.photo ? `${editProduct.photo.filePath}` : null
    );
    setdescription(
      editProduct && editProduct.description ? editProduct.description : null
    );
  }, [editProduct]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproduct({ ...product, [name]: value });
  };
  const handleImagechange = (e) => {
    setphoto(e.target.files[0]);
    setpPreview(URL.createObjectURL(e.target.files[0]));
  };
  const editproduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", product?.description);
    if (photo) {
      formData.append("photo", photo);
    }

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getAllProduct());

    navigate("/dashboard");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h2 className="--mt">Edit Product</h2>
      <ProductForm
        product={product}
        photo={photo}
        pPreview={pPreview}
        description={description}
        setdescription={setdescription}
        handleImagechange={handleImagechange}
        handleInputChange={handleInputChange}
        saveProduct={editproduct}
      />
    </div>
  );
};

export default EditProduct;
