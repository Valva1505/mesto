export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._buttonclose = this._popupSelector.querySelector('.popup__button-close');
    }
    openPopup() {
      this._popupSelector.classList.add('popup_opened');
      document.addEventListener("keydown", this._handleEscClose);
    }
    closePopup() {
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener("keydown", this._handleEscClose);
    }
    _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.closePopup();
      }
    }
    _handleOverlyClick = (event) => {
        if (event.target === this._popupSelector) {
          this.closePopup();
        }
      }
    setEventListeners() {
      this._buttonclose.addEventListener('click', () => this.closePopup());
      this._popupSelector.addEventListener('click', this._handleOverlyClick);
    }
  }