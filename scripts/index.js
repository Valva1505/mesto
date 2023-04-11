import FormValidator from './FormValidator.js';
import Card from './Card.js';
//  массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// функции открытия, закрытия, overlay и закрытие через Esc
function handleOverlyClick(event) {
  const popupActive = document.querySelector('.popup_opened');
  if (event.target === popupActive) {
    closePopup(popupActive);
  }
}
function keyEscHendler(event) {
  const popupActive = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupActive);
  }
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyEscHendler);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyEscHendler);
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', handleOverlyClick);
})
//переменные
// дoбавление картинок 
const elements = document.querySelector('.elements');
const popupCaption = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');
const popupCard = document.querySelector('.popup_card');
// попап данных
const popupUserInfo = document.querySelector('.popup_user-information');
const openButtonInfo = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
// const popupUserInfoInputs = popupUserInfo.querySelectorAll('.popup__input');
const formSubmitInfo = document.querySelector('.popup__form_user-information')
//  попап добавления карточки
const popupNewCard = document.querySelector('.popup_new-card');
const openButtonNewCard = document.querySelector('.profile__add-button');
const formSubmitNewCard = document.querySelector('.popup__form_new-card');
const newCardTitle = document.querySelector('.popup__input_type_title');
const newCardLink = document.querySelector('.popup__input_type_link');
// const popupNewCardInputs = Array.from(popupNewCard.querySelectorAll('.popup__input'));
// const submitButtonNewCard = document.querySelector('.popup__button-submit_new-card')
// кнопки закрытия
const closeButtons = document.querySelectorAll('.popup__button-close');
// закрытие через любую кнопку
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// создание карточки
const createCard = (...args)  => {
  return new Card(...args).generateCard();
}

const renderCard = (element) => {
  const card = createCard(element, "#card");
  elements.prepend(card);
}

initialCards.forEach((elements) => {
  renderCard(elements);
});
// открытие попапа карточки
export default function handleOpenPopupCard(name, link) {
  openPopup(popupCard);
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
}

const validationOptions = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  fieldElement: '.popup__set',
  buttonElement: '.popup__button-submit',
  inputElementError: 'popup__input_error',
  spanElementError: 'popup__input-error_active',
  buttonElementInactive: 'popup__button-submit_inactive',
};
// открытие попапа данных
function openPopupUserInfo() {
  formValiatorUserInfo.resetInputErrors();
  // popupUserInfoInputs.forEach((input) => {
  //   hideInputError(formSubmitInfo, input, validationOptions)
  // });
  openPopup(popupUserInfo);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}
openButtonInfo.addEventListener('click', openPopupUserInfo);
// открытие попапа карточки
function openPopupNewCard() {
  formValiatorNewCard.resetInputErrors();
  formSubmitNewCard.reset();
  openPopup(popupNewCard);
}
openButtonNewCard.addEventListener('click', openPopupNewCard);
// добавление данных в попап карточки
function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardTitle.value,
    link: newCardLink.value,
  };
  renderCard(newCard);
  // const addElement = createCard(newCard);
  // elements.prepend(addElement);
  evt.target.reset();
  closePopup(popupNewCard);
  // toggleButtonState(popupNewCardInputs, submitButtonNewCard, validationOptions);
}
formSubmitNewCard.addEventListener('submit', handleFormSubmitNewCard);
// добавление данных в попап данных
function handleFormSubmitInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  evt.target.reset();
  closePopup(popupUserInfo);
}
formSubmitInfo.addEventListener('submit', handleFormSubmitInfo);

// валидации попапов 
const formValiatorUserInfo = new FormValidator(validationOptions, formSubmitInfo);
  formValiatorUserInfo.enableValidation();
const formValiatorNewCard = new FormValidator(validationOptions, formSubmitNewCard);
  formValiatorNewCard.enableValidation();