export default class Card {
   constructor(userId, data, templateSelector, handleCardClick, handleCardPopupDelete, putLike, deleteLike, likes) {
   this.putLike = putLike;
   this.deleteLike = deleteLike;
   this._data = data;
   this._templateSelector = templateSelector;
   this._handleCardClick = handleCardClick;
   this._handleCardPopupDelete = handleCardPopupDelete;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._counter = data.likes;
    this.likes = data.likes;
   }

   _getTemplate() { 
      
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      this._likeButton = cardElement.querySelector('.element__button'); 
      this._deleteButton = cardElement.querySelector('.element__urn-button'); 
      this._imageCard = cardElement.querySelector('.element__image'); 
      this._titleCard = cardElement.querySelector('.element__title'); 
      this._likesCard = cardElement.querySelector('.element__likes');
      return cardElement; 
    } 

   generateCard() {
      this.likes.some(item => {
         return item.id === this._userId;
         }) ? this._likeButton.classList.add('element__button_active') : "";
      this._card = this._getTemplate(); 
      this._ownerId !== this._userId ? this._deleteButton.style.display = "none" : "";
      this._setEventListeners();
      this._imageCard.src = this._data.link;
      this._imageCard.alt = this._data.name;
      this._titleCard.textContent = this._data.name;
      if (this._counter) {
      this._likesCard.textContent = this._counter;
      }
      
      return this._card;
      }
   
   // _checkLike() {
   // 
   // }
   
   // _updateLikes(res) {
   // this._likesCard.textContent = res.likes.length;
   // }
   
   _toggleLike() {
   !this._likeButton.classList.contains('element__button_active') ? this.putLike(this) : this.deleteLike(this);
   }
   
   _setEventListeners() {
   this._deleteButton.addEventListener('click', () => {
   this._handleCardPopupDelete(this._cardId, this._card);
   });

   this._likeButton.addEventListener('click', () => {
   this._toggleLike(this);
   });
   this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link); 
    }); 
  } 

   handlerToggleLike(res) {
   this._likeButton.classList.toggle('element__button_active');
   this._updateLikes(res);
   }
   
   getId() {
   return this._cardId;
   }
   }
