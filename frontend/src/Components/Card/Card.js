import React from "react";
import style from "./Card.module.scss";
const Card = ({ children, cardClass }) => {
  return <div className={`${style.caard} ${cardClass}`}>{children}</div>;
};
export default Card;
