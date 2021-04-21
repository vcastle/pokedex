import React from "react";

import "./search-box.styles.scss";

/** Functional component */
export const SearchBox = ({ placeholder, handleChange, isDarkMode }) => (
  <input
    className={isDarkMode ? "search--dark-mode" : "search"}
    type="search"
    placeholder={placeholder}
    onChange={handleChange}
  />
);
