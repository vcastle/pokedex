import React from "react";
import pokeball from "../../assets/pokeball.gif";

import "./header.styles.scss";

export const Header = ({ headerText, isDarkMode }) => (
  <div className="header">
    <img className="header__img" alt="Spinning pokeball" src={pokeball} />
    <p className={isDarkMode ? "header__text--dark-mode" : "header__text"}>
      {headerText}
    </p>
    <img className="header__img" alt="Spinning pokeball" src={pokeball} />
  </div>
);
