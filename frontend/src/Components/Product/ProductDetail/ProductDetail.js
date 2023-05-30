import React from "react";
import "./ProductDetail.scss";
import RedirectOutUser from "../../../customHook/redirectOutUser";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedin } from "../../../redux/features/auth/authSlice";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import {
  getAProduct,
  getAllProduct,
} from "../../../redux/features/products/productSlice";
import Card from "../../Card/Card";
import Loader from "../../Loader/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectLoggedin);
  const { product, isError, message, isLoading } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getAProduct(id));

      if (isError) {
        console.log(message);
      }
    }
  }, [isError, isLoading, isLoggedin, dispatch, message, product, id]);
  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">In Stock</span>;
  };

  RedirectOutUser("/login");
  return (
    <div className="product-detail">
      <h3 className="--mt">Product Details</h3>
      <Card cardClass="card">
        {isLoading && <Loader />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.photo ? (
                <img
                  alt={product.photo.fileName}
                  src={product.photo.filePath}
                />
              ) : (
                <p>No Image set for this product</p>
              )}
            </Card>
            <h4>Product Availability:{stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: &nbsp;</span>
              {product.name}
            </h4>
            <p>
              <b>&rarr; SKU:&nbsp;</b>
              {product.sku}
            </p>
            <p>
              <b>&rarr; Category:&nbsp;</b>
              {product.category}
            </p>
            <p>
              <b>&rarr; Price:&nbsp;</b>
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity:</b> ${product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value:</b> ${product.price * product.quantity}
            </p>
            <hr />
            <p>
              <b>&rarr; Description:</b>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              ></div>
            </p>

            <hr />
            <code className="--color-dark">
              Created On: {product?.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product?.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
