import RedirectOutUser from "../../customHook/redirectOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedin } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getAllProduct } from "../../redux/features/products/productSlice";
import ProductList from "../Product/ProductList/ProductList";
import ProductSummary from "../Product/ProductSummary/ProductSummary";

const Dashboard = () => {
  RedirectOutUser("/login");
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectLoggedin);
  const { products, isError, message, isLoading } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getAllProduct());

      if (isError) {
        console.log(message);
      }
    }
  }, [isError, isLoading, isLoggedin, dispatch, message]);
  return (
    <div>
      <ProductSummary products={products} />
      <ProductList product={products} loading={isLoading} />
    </div>
  );
};
export default Dashboard;
