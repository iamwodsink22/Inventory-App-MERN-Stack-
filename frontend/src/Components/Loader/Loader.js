import loaderImg from "../../resources/loader.gif";
import React from "react";
import ReactDOM from "react-dom";
import "./Loader.scss";

function Loader() {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="loading" />
      </div>
    </div>,
    document.getElementById("loader")
  );
}
export const spinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="loading" />
    </div>
  );
};

export default Loader;
