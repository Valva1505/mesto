export default class Api {
  constructor(url, headers) {
    this.url = url;
    this.headers = headers;
  }
  
  getUserInfo() {
    return this._request(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers
    });
  }
  
  userInfo({ name, about }) { //редактирование профиля
    return this._request(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
    
  }
  
  getInitialCards() {
    return this._request(`${this.url}/cards`, {
      method: "GET",
      headers: this.headers
    });
    
  }
  userAvatar({ avatar }) {
    return this._request(`${this.url}/users/me/avatar`, {//обновление аватара пользователя
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
    
  }
  postNewCard({ name, link }) {
    return this._request(`${this.url}/cards`, {//добавление новой карточки
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    });
  }
  
  deleteCard(cardId) {
    return this._request(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers
    });
  }
  
  putLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers
    });
  }
  
  deleteLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers
    });
  }
  
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  
}



