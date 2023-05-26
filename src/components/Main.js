import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  // переменные состояния
  const [userAvatar, getUserAvatar] = React.useState('');
  const [userName, getUserName] = React.useState('');
  const [userDescription, getUserDescription] = React.useState('');
  const [cards, getCards] = React.useState([]);
  // переменная содержащая компонент-Card
  const cardsElements = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      name={card.name}
      link={card.link}
      likes={card.likes.length}
      onCardClick={onCardClick}
    />
  ));
  // эффект, вызываемый при монтировании компонента,
  // который совершает запрос в API за пользовательскими данными
  React.useEffect(() => {
    // Забираем с сервера инф о пользователе и карточки
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([me, cards]) => {
        getUserAvatar(me.avatar);
        getUserName(me.name);
        getUserDescription(me.about);
        getCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);
  return (
    <main>
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
          onClick={onEditAvatar}
        />
        <div className="profile__name-block">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__button-edit button"
            type="button"
            onClick={onEditProfile}
          />
        </div>
        <p className="profile__about">{userDescription}</p>
        <button
          className="profile__button-add button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
