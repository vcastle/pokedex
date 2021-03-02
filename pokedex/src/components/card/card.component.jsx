import React from "react";
import "./card.styles.scss";

export const Card = (props) => {
  return (
    <div className="card">
      <img
        className="card__img"
        src={props.pokemon.sprites.front_default}
        alt={props.pokemon.name}
      />
      <p className="card__title"> {props.pokemon.name}</p>
    </div>
  );
};
