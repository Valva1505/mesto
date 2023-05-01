import Popup from "./Popup.js";
export default class PopupWitnForm extends Popup {
    constructor(popup, submit) {
        super(popup);
        this._submit = submit;
        this._buttonSubmit = popup.querySelector('.popup__button-submit');
        this._form = popup.querySelector('.popup__form');
        this._inputList = popup.querySelectorAll('.popup__input');
        this._buttonSubmitText = this._buttonSubmit.textContent;
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSubmit.textContent = "Сохранение...";
        } else {
            this._buttonSubmit.textContent = this._buttonSubmitText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
            super.closePopup();
        });
    }

    closePopup() {
        this._form.reset();
        super.closePopup();
    }
}

