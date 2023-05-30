import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { loginStatus } from "../services/authServices";
import { toast } from "react-toastify";

function RedirectOutUser(path) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const redirectOutUser = async () => {
      const isLoggedin = await loginStatus();
      dispatch(SET_LOGIN(isLoggedin));
      if (!isLoggedin) {
        toast.info("Session expired, Please Login to Continue");
        navigate(path);
        return;
      }
    };
    redirectOutUser();
  }, [navigate, path, dispatch]);
}

export default RedirectOutUser;
