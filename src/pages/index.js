import './index.css'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWitnForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from "../components/API.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const validationOptions = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  fieldElement: '.popup__set',
  buttonElement: '.popup__button-submit',
  inputElementError: 'popup__input_error',
  spanElementError: 'popup__input-error_active',
  buttonElementInactive: 'popup__button-submit_inactive',
};

// дoбавление картинок 
const elements = document.querySelector('.elements');
const popupCard = document.querySelector('.popup_card');
// попап данных
const popupUserInfo = document.querySelector('.popup_user-information');
const openButtonInfo = document.querySelector('.profile__edit-button');
const formSubmitInfo = document.querySelector('.popup__form_user-information')
//  попап добавления карточки
const popupNewCard = document.querySelector('.popup_new-card');
const openButtonNewCard = document.querySelector('.profile__add-button');
const formSubmitNewCard = document.querySelector('.popup__form_new-card');
const popupDelete = document.querySelector('.popup_delete');
const popupAvatar = document.querySelector('.popup_avatar');
const formAvatar = document.querySelector('.popup__form_avatar');
const openButtonAvatar = document.querySelector('.profile__avatar_button');

//обмен информации пользователя
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__description', avatar: '.profile__avatar_image' });
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cards.renderItems(initialCards);
  })
  .catch(console.log);

const handleCardClick = (name, link) => {
  popupBigImage.openPopup(name, link);
}
const handleCardPopupDelete = (cardId, card) => {
  popupDeleteCard.openPopup(cardId, card);
}

// создание карточки
function createCard(res) {
  const card = new Card(userInfo.userId,
    res,
    '#card',
    handleCardClick,
    handleCardPopupDelete,
    putLike,
    deleteLike);
  const newCard = card.generateCard();
  return newCard;
}
console.log(userInfo.userId);

const putLike = (card) => {
  api.putLike(card.cardId)
    .then((res) => {
      card.handlerToggleLike(res)
    })
    .catch(console.log);

};
const deleteLike = (card) => {
  api.deleteLike(card.cardId)
    .then((res) => {
      card.handlerToggleLike(res)
    })
    .catch(console.log)
};
const cards = new Section((res) => {
  cards.addItem(createCard(res))
},
  elements);
// попап аватара
const popupNewAvatar = new PopupWitnForm(popupAvatar, ({ avatar }) => {
  popupNewAvatar.renderLoading(true);
  api.userAvatar({ avatar })
    .then(res => {
      avatarInfo.setUserInfo(res);
      popupNewAvatar.closePopup();
    })
    .finally(() => {
      popupNewAvatar.renderLoading(false)
    })
    .catch(console.log);
});
popupNewAvatar.setEventListeners();
openButtonAvatar.addEventListener('click', () => {
  popupNewAvatar.openPopup();
  formValiatorNewAvatar.resetInputErrors()
});
//попап данных
const popupInfo = new PopupWitnForm(popupUserInfo, ({ name, about }) => {
  popupInfo.renderLoading(true);
  api.userInfo({ name, about })
    .then(({ name, about }) => {
      userInfo.setUserInfo({ name, about });
      popupInfo.closePopup();
    })
    .finally(() => {
      popupInfo.renderLoading(false);

    })
    .catch(console.log);
});
openButtonInfo.addEventListener('click', () => {
  popupInfo.openPopup();
  formValiatorUserInfo.resetInputErrors();
  popupInfo.setInputValues(userInfo.getUserInfo());
});
popupInfo.setEventListeners();
// попап картинки
const popupNewImage = new PopupWitnForm(popupNewCard, (card) => {
  popupNewImage.renderLoading(true);
  api.postNewCard(card)
    .then((res) => {
      popupNewImage.closePopup();
      cards.addItem(createCard(res));
    })
    .catch(console.log)
    .finally(() => {
      popupNewImage.renderLoading(false)
    });
})
openButtonNewCard.addEventListener('click', () => {
  popupNewImage.openPopup();
  formValiatorNewCard.resetInputErrors()
});
popupNewImage.setEventListeners();
//попап развернутой картинки
const popupBigImage = new PopupWithImage(popupCard);
popupBigImage.setEventListeners();
// удаление карточки
const popupDeleteCard = new PopupWithConfirmation(popupDelete, (card) => {
  popupDeleteCard.renderLoading(true);
  api.deleteCard(card.cardId)
    .then(() => {
     popupDeleteCard.card.remove();
      popupDeleteCard.closePopup();
    })
    .finally(() => {
      popupDeleteCard.renderLoading(false)
    })
    .catch(console.log)
});
popupDeleteCard.setEventListeners();

// валидации попапов 
const formValiatorUserInfo = new FormValidator(validationOptions, formSubmitInfo);
formValiatorUserInfo.enableValidation();
const formValiatorNewCard = new FormValidator(validationOptions, formSubmitNewCard);
formValiatorNewCard.enableValidation();
const formValiatorNewAvatar = new FormValidator(validationOptions, formAvatar);
formValiatorNewAvatar.enableValidation();
