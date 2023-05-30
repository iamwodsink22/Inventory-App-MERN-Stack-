import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";
import Loader from "../../Loader/Loader";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCT,
  filterproducts,
} from "../../../redux/features/products/filterSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  delProduct,
  getAllProduct,
} from "../../../redux/features/products/productSlice";
import { useNavigate } from "react-router-dom";

const ProductList = ({ product, loading }) => {
  const filteredProducts = useSelector(filterproducts);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [search, setsearch] = useState("");

  useEffect(() => {
    dispatch(FILTER_PRODUCT({ product, search }));
  }, [product, search, dispatch]);
  const deleteproduct = async (id) => {
    await dispatch(delProduct(id));
    await dispatch(getAllProduct());
  };
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure to delete this product ?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteproduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;

  const currentitems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </span>
        </div>
        {loading && <Loader />}
        <div className="table">
          {loading && product.length === 0 ? (
            <p>No Products Found, Please Add a product</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentitems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price * item.quantity}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-details/${item._id}`}>
                            <AiOutlineEye
                              style={{ marginRight: "10px" }}
                              size={30}
                              color={"purple"}
                            />
                          </Link>
                          <Link to={`/edit-product/${item._id}`}>
                            <FaEdit
                              style={{ marginRight: "10px" }}
                              size={25}
                              color={"green"}
                            />
                          </Link>
                          <FaRegTrashAlt
                            style={{ marginRight: "10px" }}
                            size={25}
                            color={"red"}
                            onClick={() => confirmDelete(item._id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;
