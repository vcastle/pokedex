import React from "react";
import pokeball from "../../assets/pokeball.gif";

import "./header.styles.scss";

export const Header = ({ headerText }) => (
  <div className="header">
    <img className="header__img" alt="Spinning pokeball" src={pokeball} />
    <p className="header__text ">{headerText}</p>
    <img className="header__img" alt="Spinning pokeball" src={pokeball} />
  </div>
);
