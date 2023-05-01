import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor(popup, deleteCard ) {
        super(popup);
        this._deleteCard = deleteCard;
        this._deleteButton = this._popup.querySelector('.popup__button-submit');
        this._deleteButtonText = this._deleteButton.textContent;
    }
    renderLoading(isLoading) {
      if (isLoading) {
        this._deleteButton.textContent = "Удаление...";
      } else {
          this._deleteButton.textContent = this._deleteButtonText;
      }
    }
    openPopup(cardId, card) {
        super.openPopup();
        this.cardId = cardId;
        this.card = card;
        // this._deleteButton.addEventListener("click", this._deleteCard);
      }
      
      closePopup() {
        super.closePopup();
        // this._deleteButton.removeEventListener("click", this._deleteCard);
      }

setEventListeners() {
  super.setEventListeners();
  this._deleteButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    this._deleteCard(this);
  });
}
}