import React from "react";
import "./card-list.styles.scss";
import { Card } from "../card/card.component";

export const CardList = (props) => {
  return (
    <div className="card-list">
      {props.pokemon.map((pokemon) => (
        <Card
          key={props.pokemon.id}
          pokemon={pokemon}
          isDarkMode={props.isDarkMode}
        />
      ))}
    </div>
  );
};
