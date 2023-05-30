import React from "react";
import "./infobox.scss";

const Infobox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon">{icon}</span>
      <span className="info-text">
        <p>{title}</p>
        <p style={{ fontSize: "large" }}>{count}</p>
      </span>
    </div>
  );
};

export default Infobox;
