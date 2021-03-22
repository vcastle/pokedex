import React from "react";
import "./card.styles.scss";

export const Card = (props) => {
  return (
    <div className={props.isDarkMode ? "card--dark-mode" : "card"}>
      <span className="card__header">
        <p
          className={
            props.isDarkMode ? "card__title--dark-mode" : "card__title"
          }
        >
          {props.pokemon.name}
        </p>
        <p className="card__id">
          <span>#</span>
          {props.pokemon.id}
        </p>
      </span>

      <p className="card__id"></p>
      <img
        className="card__img"
        src={
          props.isDarkMode
            ? props.pokemon.sprites.front_shiny
            : props.pokemon.sprites.front_default
        }
        alt={props.pokemon.name}
      />

      <div className="card__types">
        {props.pokemon.types.map((type) => (
          <p key={props.key} className="card__type-text">
            {type.type.name}
          </p>
        ))}
      </div>
    </div>
  );
};
