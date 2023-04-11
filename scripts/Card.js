import handleOpenPopupCard from "./index.js";

export default class Card {
    constructor(data, templateSelector, handleOpenPopup) {
      this._link = data.link;
      this._name = data.name;
      this._templateSelector = templateSelector;
      this._handleOpenPopupCard = handleOpenPopupCard;
    }
    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      this._likeButton = cardElement.querySelector('.element__button');
      this._deleteButton = cardElement.querySelector('.element__urn-button');
      this._imageCard = cardElement.querySelector('.element__image');
      this._titleCard = cardElement.querySelector('.element__title');
  
      return cardElement;
    }
    generateCard() {
      this._card = this._getTemplate();
      this._setEventListeners();
      this._imageCard.src = this._link;
      this._titleCard.textContent = this._name;
      this._imageCard.alt = this._name;
  
      return this._card;
    }
    _likeCard() {
      this._likeButton.classList.toggle('element__button_active');
    }
    _deleteCard() {
      this._card.remove();
    }

    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeCard();
      });
  
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
  
      this._imageCard.addEventListener('click', () => {
        this._handleOpenPopupCard(this._name, this._link);
      });
    }
  }