class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };
//----------------------------------------------------------------------//
// Загрузка информации о пользователе с сервера
getUserInfo() {
  return this._request('users/me', {headers: this._headers})
};
// Загрузка карточек с сервера
getCards() {
  return this._request('cards', {headers: this._headers})
};
//----------------------------------------------------------------------//
// Редактирование аватара пользователя
chahgeUserAvatar({ avatar }) {
  return this._request('users/me/avatar', {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({ avatar }),
})
};
// Редактирование профиля
changeUserInfo({ name, about }) {
  return this._request('users/me', {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({ name, about }),
})
};
//----------------------------------------------------------------------//
// Создание новой карточки
addNewCard(newCard) {
  return this._request('cards', {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
        name: newCard.title,
        link: newCard.link,
    })
  })
};
// Удаление карточки
deleteCard(id) {
  return this._request(`cards/${id}`, {
    method: 'DELETE',
    headers: this._headers,
})
};
// Добавить лайк
addLike(id) {
  return this._request(`cards/likes/${id}`, {
    method: 'PUT',
    headers: this._headers,
})
};
// Убрать лайк
removeLike(id) {
  return this._request(`cards/likes/${id}`, {
    method: 'DELETE',
    headers: this._headers,
})
};
//----------------------------------------------------------------------//
// Универсальный метод запроса с проверкой ответа
_request(endpoint, options) {
  return fetch(`${this._baseUrl}${endpoint}`, options)
        .then(this._getResponseData);
};
// Универсальный метод, который при запросе на сервер возвращает json,
// если все прошло успешно, или ошибку, если нет
_getResponseData(res){
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`);
};
};

// Создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  headers: {
    authorization: '7c688b88-2506-4622-adb7-ea38a8426ab6',
    'Content-Type': 'application/json',
  }
});

export default api;