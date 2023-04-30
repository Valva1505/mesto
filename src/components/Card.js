// export default class Card {
//   constructor(data, templateSelector, handleCardClick) {
//     this._data = data;
//     this._id = id;
//     this.likes = 0;
//     this._templateSelector = templateSelector;
//     this._handleCardClick = handleCardClick;
//   }
//   _getTemplate() {
//     const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
//     this._likeButton = cardElement.querySelector('.element__button');
//     this._deleteButton = cardElement.querySelector('.element__urn-button');
//     this._imageCard = cardElement.querySelector('.element__image');
//     this._titleCard = cardElement.querySelector('.element__title');
//     this._likesCard = cardElement.querySelector('.element__likes');
//     return cardElement;
//   }
  
//   generateCard() {
//     this._card = this._getTemplate();
//     this._setEventListeners();
//     this._imageCard.src = this._data.link;
//     this._titleCard.textContent = this._data.name;
//     this._imageCard.alt = this._data.name;
//     this._userId = this._data.id;
   

//   _likeCard() {
//     this._likeButton.classList.toggle('element__button_active');
//   }
//   _deleteCard() {
//     this._card.remove();
//   }
//   _setEventListeners() {
//     this._likeButton.addEventListener('click', () => {
//       this._likeCard();
//     });

//     this._deleteButton.addEventListener('click', () => {
//       this._deleteCard();
//     });

//     this._imageCard.addEventListener('click', () => {
//       this._handleCardClick(this._data.name, this._data.link);
//     });
//   }
// }

 export default class Card {
    constructor(userId, data, templateSelector, handleCardClick, handleCardPopupDelete, putLike, deleteLike) {
    this.userId = userId;
    this.putLike = putLike;
    this.deleteLike = deleteLike;
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardPopupDelete = handleCardPopupDelete;
    this._cardId = data._id;
    this._name = data.name;
    this._image = data.link;
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    this._imageCard = this._cardElement.querySelector('.element__image');
    this._titleCard = this._cardElement.querySelector('.element__title');
    this._deleteButton = this._cardElement.querySelector('.element__urn-button');
    this._likeButton = this._cardElement.querySelector('.element__button');
    this._likesCard = this._cardElement.querySelector('.element__likes');
    this.likes = data.likes;
    this._counter = this.likes.length;
    }
    
    _checkOwner() {
    if (this.userId !== this._data.owner._id) {
    this._deleteButton.style.display = "none";
    }
    }
    
    _checkLike() {
    this.likes.some(item => {
    return item._id === this.userId;
    }) ? this._likeButton.classList.add("element__button_active") : "";
    }
    
    _updateLikes(res) {
    this._likesCard.textContent = res.likes.length;
    }
    
    _toggleLike() {
    !this._likeButton.classList.contains("element__button_active") ? this.putLike(this) : this.deleteLike(this);
    }
    
    _setEventListeners() {
    this._deleteButton ? this._deleteButton.addEventListener("click", () => {
    this._handleCardPopupDelete(this._cardId, this._cardElement);
    }) : "";
    this._likeButton.addEventListener("click", () => {
    this._toggleLike();
    });
    this._imageCard.addEventListener("click", () => {
    this._handleCardClick(this._data.name, this._data.link);
    });
    }
    
    generateCard() {
    this._checkOwner();
    this._checkLike();
    this._imageCard.src = this._data.link;
    this._imageCard.alt = this._data.name;
    if (this._counter) {
    this._likesCard.textContent = this._counter;
    }
    this._titleCard.textContent = this._data.name;
    this._setEventListeners();
    return this._cardElement.cloneNode(true);
    }
    
    handlerToggleLike(res) {
    this._likeButton.classList.toggle("element__button_active");
    this._updateLikes(res);
    }
    
    getId() {
    return this._cardId;
    }
    }
    
    
    
    
    
    