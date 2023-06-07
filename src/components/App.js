import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoading, setLoading] = React.useState(false);
  //--------------------------------------------------------------------------------//
  React.useEffect(() => {
    // Забираем с сервера инф о пользователе и карточки
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([me, cards]) => {
        setCurrentUser(me);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);
  //-------------------------------------------------------------АВАТАР------------//
  // ф-я открытия попапа - редактирование аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Функция-отработчик изменения аватара
  function handleUpdateAvatar(data) {
    setLoading(true);
    api
      .chahgeUserAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  //-----------------------------------------------------------ПРОФИЛЬ--------------//
  // ф-я открытия попапа - редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Функция-отработчик изменения профиля
  function handleUpdateUser(data) {
    setLoading(true);
    api
      .changeUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  //---------------------------------------------------------ДОБАЛЕНИЕ КАРТОЧЕК-----//
  // ф-я открытия попапа - добавление новых карточек
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Функция-отработчик добавления новых карточек
  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  // Функция-отработчик лайков/анлайков
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  }
  //---------------------------------------------------------УДАЛЕНИЕ КРТОЧЕК ------//
  // ф-я открытия попапа - удаление карточек
  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(card);
  }
  // Функция-отработчик удаления карточки
  function handleCardDelete(card) {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setLoading(false);
      });
  }
  //----------------------------------------------------ПРОСМОТР ИЗОБРАЖЕНИЙ ------//
  // ф-я открытия попапа - просмотр изображений
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //-------------------------------------------------ЗАКРЫТИЕ ВСЕХ ПОПАПОВ --------//
  // функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(null);
  }
  // закрытие попаров через esc
  function closePopupWithEsc(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }
  // закрытие попапов через оверлей
  function closePopupWithClickOnOverlay(e) {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }
  //--------------------------------------------------------------------------------//
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <DeleteCardPopup
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"
            buttonTextLoading="Удаление..."
            card={isDeleteCardPopupOpen}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={selectedCard}
            onClose={closeAllPopups}
            onCloseEsc={closePopupWithEsc}
            onCloseOverlay={closePopupWithClickOnOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
