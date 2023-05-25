import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_picture ${card && 'popup_opened'}`}>
        <figure className="popup__figure-container">
            <button className="popup__button-close button" type="button" onClick={onClose} />
            <img className="popup__image" src={card && card.link} alt={card && card.name} />
            <figcaption className="popup__caption">{card && card.name}</figcaption>
        </figure>
    </div>
  )
};

export default ImagePopup;