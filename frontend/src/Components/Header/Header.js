import React from "react";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authServices";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async (e) => {
    await logoutUser();

    await dispatch(SET_LOGIN(false));
    await dispatch(SET_NAME(""));
    navigate("/");
  };
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{localStorage.getItem("name")}</span>
        </h3>
        <button className="--btn --btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};
export default Header;
