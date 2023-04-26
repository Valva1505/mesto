export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputElementError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.spanElementError);
  };
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputElementError);
    errorElement.textContent = '';
    errorElement.classList.remove(this._selectors.spanElementError);
  };
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._selectors.buttonElementInactive);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._selectors.buttonElementInactive);
      this._buttonElement.removeAttribute('disabled');
    }
  };
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputElement));
    this._buttonElement = this._formElement.querySelector(this._selectors.buttonElement);
    this._formElement.addEventListener('reset', () => { setTimeout(() => { this._toggleButtonState(), 0 }) });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
  resetInputErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    })
    this._toggleButtonState();
  }

};


