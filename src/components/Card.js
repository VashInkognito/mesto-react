import React from 'react';

function Card({ card, name, link, likes, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }
  return (
    <li className="element" id={card._id}>
      <button className="element__button-trash button"></button>
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={handleCardClick}
      />
      <article className="element__title-block">
        <h2 className="element__title">{name}</h2>
        <div className="element__button-like-block">
          <button
            className="element__button-like button"
            type="button"
          ></button>
          <span className="element__like-counter">{likes}</span>
        </div>
      </article>
    </li>
  );
}

export default Card;
