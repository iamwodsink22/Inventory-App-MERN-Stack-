import { useSelector } from "react-redux";
import { selectLoggedin } from "../../redux/features/auth/authSlice";
import React from "react";
export const ShowonLogin = ({ children }) => {
  const isLoggedin = useSelector(selectLoggedin);
  if (isLoggedin) {
    return <> {children}</>;
  } else {
    return null;
  }
};
export const ShowonLogout = ({ children }) => {
  const isLoggedin = useSelector(selectLoggedin);
  if (!isLoggedin) {
    return <>{children}</>;
  } else {
    return null;
  }
};
