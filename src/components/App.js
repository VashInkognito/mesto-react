import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  // переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  // функции - обработчики событий - открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="url"
            name="avatar"
            className="popup__input popup__input_type_avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error popup__input-error_type_avatar" />
        </PopupWithForm>
        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Введите имя"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="popup__input-error popup__input-error_type_name" />
          <input
            type="text"
            name="about"
            className="popup__input popup__input_type_about"
            placeholder="Введите профессию"
            required
            minLength={2}
            maxLength={200}
          />
          <span className="popup__input-error popup__input-error_type_about" />
        </PopupWithForm>
        <PopupWithForm
          name="add-card"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="title"
            className="popup__input popup__input_type_title"
            placeholder="Название"
            required
            minLength={2}
            maxLength={30}
          />
          <span className="popup__input-error popup__input-error_type_title" />
          <input
            type="url"
            name="link"
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error popup__input-error_type_link" />
        </PopupWithForm>
        {/* <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" isOpen={} onClose={}></PopupWithForm> */}
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>
      </div>
    </div>
  );
}

export default App;
