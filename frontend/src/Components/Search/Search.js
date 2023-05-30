import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch
        className={styles.icon}
        size={18}
        style={{ cursor: "pointer" }}
      />
      <input
        type="text"
        placeholder="Search Product"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
