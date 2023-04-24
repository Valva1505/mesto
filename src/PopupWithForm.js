import Popup from "./Popup.js";
export default class PopupWitnForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = popupSelector.querySelector('.popup__form');
        this._inputList = popupSelector.querySelectorAll('.popup__input');
    }


    _getInputValues() {
        
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
      }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
            super.closePopup();
            this._form.reset();
        });

    }
    closePopup() {
        this._form.reset();
        super.closePopup();
    }
}

