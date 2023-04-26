import './index.css'
import FormValidator from '../components/FormValidator';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWitnForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
const validationOptions = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  fieldElement: '.popup__set',
  buttonElement: '.popup__button-submit',
  inputElementError: 'popup__input_error',
  spanElementError: 'popup__input-error_active',
  buttonElementInactive: 'popup__button-submit_inactive',
};

//переменные
// дoбавление картинок 
const elements = document.querySelector('.elements');
const popupCard = document.querySelector('.popup_card');
// попап данных
const popupUserInfo = document.querySelector('.popup_user-information');
const openButtonInfo = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formSubmitInfo = document.querySelector('.popup__form_user-information')
//  попап добавления карточки
const popupNewCard = document.querySelector('.popup_new-card');
const openButtonNewCard = document.querySelector('.profile__add-button');
const formSubmitNewCard = document.querySelector('.popup__form_new-card');
const newCardTitle = document.querySelector('.popup__input_type_title');
const newCardLink = document.querySelector('.popup__input_type_link');

const handleCardClick = (name, link) => {
  popupBigImage.openPopup(name, link);
}
// создание карточки
const createCard = (item) => {
  const card = new Card(item, '#card', handleCardClick);
  const newCard = card.generateCard();
  return newCard;
}
const cards = new Section({
  items: initialCards,
  renderer: (item) => cards.addItem(createCard(item))
},
  elements);
cards.renderItems();
//обмен информации пользователя
const userInfo = new UserInfo({ name: '.profile__name', description: '.profile__description'});
//попап данных
const popupInfo = new PopupWitnForm(popupUserInfo, ({name, description}) => {
  userInfo.setUserInfo({name, description});
})
openButtonInfo.addEventListener('click', () => {
  popupInfo.openPopup();
  formValiatorUserInfo.resetInputErrors();
  popupInfo.setInputValues(userInfo.getUserInfo());
});
popupInfo.setEventListeners();

// попап картинки
const popupNewImage = new PopupWitnForm(popupNewCard, ({name, link}) => {
  cards.addItem(createCard({name, link}))
})
openButtonNewCard.addEventListener('click', () => {
  popupNewImage.openPopup();
  formValiatorNewCard.resetInputErrors()
});
popupNewImage.setEventListeners();
//попап развернутой картинки
const popupBigImage = new PopupWithImage(popupCard);
popupBigImage.setEventListeners();

// валидации попапов 
const formValiatorUserInfo = new FormValidator(validationOptions, formSubmitInfo);
formValiatorUserInfo.enableValidation();
const formValiatorNewCard = new FormValidator(validationOptions, formSubmitNewCard);
formValiatorNewCard.enableValidation();
