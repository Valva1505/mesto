export default class Card {
   constructor(userId, data, templateSelector, handleCardClick, handleCardPopupDelete, handlePutLike, handleDeleteLike) {
      this._data = data;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardPopupDelete = handleCardPopupDelete;
      this._handlePutLike = handlePutLike;
      this._handleDeleteLike = handleDeleteLike;
      this._userId = userId;
      this._ownerId = data.owner._id;
      this._cardId = data._id;
      this.likes = data.likes;
      this._summaryLikes = data.likes.length;
   }

   _getTemplate() {

      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      this._likeButton = cardElement.querySelector('.element__button');
      this._deleteButton = cardElement.querySelector('.element__urn-button');
      this._imageCard = cardElement.querySelector('.element__image');
      this._titleCard = cardElement.querySelector('.element__title');
      this._counterLikes = cardElement.querySelector('.element__likes');
      return cardElement;
   }

   generateCard() {
      this._card = this._getTemplate();
      this._ownerId !== this._userId ? this._deleteButton.style.display = "none" : "";
      this._counterLikes.textContent = this._summaryLikes;
      if (this.isLiked(this.likes)) { this._likeButton.classList.add('element__button_active') };
      this._setEventListeners();
      this._imageCard.src = this._data.link;
      this._imageCard.alt = this._data.name;
      this._titleCard.textContent = this._data.name;

      return this._card;
   }
   isLiked(likes) {
      return likes.some((like) => {
         return like._id === this._userId;
      })
   }
   handlerToggleLike({ likes }) {
      this.likes = likes;
      this._likeButton.classList.toggle('element__button_active');
      this._counterLikes.textContent = likes.length;
   }
   getId() {
      return this._cardId;
   }
   toggleLike() {
      !this._likeButton.classList.contains('element__button_active') ? this._handlePutLike(this) : this._handleDeleteLike(this);
   }
   _setEventListeners() {
      this._deleteButton.addEventListener('click', () => {
         this._handleCardPopupDelete(this._cardId, this._card);
      });

      this._likeButton.addEventListener('click', () => {
         this.toggleLike(this);
      });
      this._imageCard.addEventListener('click', () => {
         this._handleCardClick(this._data.name, this._data.link);
      });
   }
}
