class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getUserInfo() {// добавление данных пользователя
    return this._request(`${this._url}/users/me`, "GET");
  }

  userInfo({ name, about}) {
    return this._request(`${this._url}/users/me`, "PATCH", { name: name, about: about });
  }

  getInitialCards() {//добавление карточек вместо массива
    return this._request(`${this._url}/cards`, "GET");
  }
  userAvatar({ avatar }) {
    return this._request(`${this._url}/users/me/avatar`, "PATCH", { avatar: avatar })
  };

  postNewCard({ name, link}) {
    return this._request(`${this._url}/cards`, "POST", { "name": name, "link": link})
  };

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, "DELETE")
  };

  putLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, "PUT")
  };

  deleteLike(cardId) {
    return this._request(`${this.url}/cards/${cardId}/likes`, "DELETE")
  };

  _request(url, method, body) {
    return fetch(url, {
      method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : null
    })
      .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

}

// export class Api {
//   constructor({ baseUrl, headers }) {
//     this.baseUrl = baseUrl;
//     this.headers = headers;
//   }
  
//   getUserInfo() {
//     return this._request(`${this.baseUrl}/users/me`, {
//       method: "GET",
//       headers: this.headers
//     });
//   }
  
//   userInfo({ name, about }) {
//     return this._request(`${this.baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: this.headers,
//       body: JSON.stringify({
//         name: name,
//         about: about
//       })
//     });
    
//   }
  
//   userAvatar({ avatar }) {
//     return this._request(`${this.baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this.headers,
//       body: JSON.stringify({
//         avatar: avatar
//       })
//     });
    
//   }
  
//   getInitialCards() {
//     return this._request(`${this.baseUrl}/cards`, {
//       method: "GET",
//       headers: this.headers
//     });
    
//   }
  
//   postNewCard({ name, link }) {
//     return this._request(`${this.baseUrl}/cards`, {
//       method: "POST",
//       headers: this.headers,
//       body: JSON.stringify({
//         "name": name,
//         "link": link
//       })
//     });
//   }
  
//   deleteCard(cardId) {
//     return this._request(`${this.baseUrl}/cards/${cardId}`, {
//       method: "DELETE",
//       headers: this.headers
//     });
//   }
  
//   putLike(cardId) {
//     return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
//       method: "PUT",
//       headers: this.headers
//     });
//   }
  
//   deleteLike(cardId) {
//     return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
//       method: "DELETE",
//       headers: this.headers
//     });
//   }
  
//   _request(url, options) {
//     return fetch(url, options).then(this._checkResponse);
//   }
  
//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка ${res.status}`);
//   }
  
// }



export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "65c7253a-81c8-4d32-a273-09dffa4f1710",
    "Content-Type": "application/json"
  }
}
);

