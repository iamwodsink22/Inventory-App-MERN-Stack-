import React, { useEffect } from "react";
import "./ProductSummary.css";
import Infobox from "../../infobox/infobox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STORE_VALUE,
  selectTotalValue,
  selectOutStock,
  CALC_OUT_STOCK,
  selectCategory,
  CALC_CATEGORIES,
} from "../../../redux/features/products/productSlice";
const earningicon = <AiFillDollarCircle size={50} color="#fff" />;
const productIcon = <BsCart4 size={50} color="#fff" />;
const categoryIcon = <BiCategory size={50} color="#fff" />;
const outOfStockIcon = <BsCartX size={50} color="#fff" />;
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const totalStoreValue = useSelector(selectTotalValue);
  const outOfStock = useSelector(selectOutStock);
  const categories = useSelector(selectCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUT_STOCK(products));
    dispatch(CALC_CATEGORIES(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <Infobox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <Infobox
          icon={earningicon}
          title={"Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        />
        <Infobox
          icon={outOfStockIcon}
          title={"Out of Stocks"}
          count={outOfStock.length}
          bgColor="card3"
        />
        <Infobox
          icon={categoryIcon}
          title={"Total Categories"}
          count={categories.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
