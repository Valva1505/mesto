import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageCard = this._popupSelector.querySelector('.popup__image');
        this._titleCard = this._popupSelector.querySelector('.popup__caption');
    }
    openPopup(name, link) {// name & link
        super.openPopup();
        this._imageCard.src = link;
        this._titleCard.textContent = name;
        this._imageCard.alt = name;
    }
}