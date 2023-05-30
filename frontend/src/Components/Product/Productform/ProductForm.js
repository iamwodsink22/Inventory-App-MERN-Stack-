import React from "react";
import ReactQuill from "react-quill";

import "quill/dist/quill.snow.css";
import "./ProductForm.scss";
import Card from "../../Card/Card";

const ProductForm = ({
  product,
  photo,
  pPreview,
  description,
  handleInputChange,
  handleImagechange,
  setdescription,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product-Image</label>
            <code className="--color-dark">
              Supported Formats- jgp,png,jpeg
            </code>
            <input
              type="file"
              name="photo"
              onChange={(e) => {
                handleImagechange(e);
              }}
            ></input>
            {pPreview != null ? (
              <div className="image-preview">
                <img src={pPreview} alt="imaage" />
              </div>
            ) : (
              <p>No Image set for this product</p>
            )}
          </Card>
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <label>Product Category</label>
          <input
            type="text"
            placeholder="Product category"
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />
          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />
          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />
          <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setdescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};
ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];
export default ProductForm;
