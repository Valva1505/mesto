export default class Popup {
    constructor(popup) {
      this._popup = popup;
      this._buttonclose = this._popup.querySelector('.popup__button-close');
    }
    openPopup() {
      this._popup.classList.add('popup_opened');
      document.addEventListener("keydown", this._handleEscClose);
    }
    closePopup() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener("keydown", this._handleEscClose);
    }
    _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.closePopup();
      }
    }
    _handleOverlyClick = (event) => {
        if (event.target === this._popup) {
          this.closePopup();
        }
      }
    setEventListeners() {
      this._buttonclose.addEventListener('click', () => this.closePopup());
      this._popup.addEventListener('click', this._handleOverlyClick);
    }
  }