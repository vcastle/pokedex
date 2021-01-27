import React from "react";
import "./card.styles.scss";

export const Card = (props) => {
  return (
    <div className="card">
      <img
        className="card__img"
        src={`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/sprites/${props.pokemon.name}.png`}
        alt={props.pokemon.name}
      />
      <p className="card__title"> {props.pokemon.name}</p>
    </div>
  );
};
