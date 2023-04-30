import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    constructor(popup, submit) {
        super(popup);
        this._submit = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this.deleteСard());
            super.closePopup();
        });

    }
    closePopup() {
        super.closePopup();
    }
}