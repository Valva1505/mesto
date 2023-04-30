import './index.css'
import FormValidator from '../components/FormValidator';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWitnForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/API.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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
const formSubmitInfo = document.querySelector('.popup__form_user-information')
//  попап добавления карточки
const popupNewCard = document.querySelector('.popup_new-card');
const openButtonNewCard = document.querySelector('.profile__add-button');
const formSubmitNewCard = document.querySelector('.popup__form_new-card');
const popupDelete = document.querySelector('.popup_delete');
const formDelete = document.querySelector('.popup__button-submit_delete');
const popupAvatar = document.querySelector('.popup_avatar');
const formAvatar = document.querySelector('.popup__form_avatar');
const openButtonAvatar = document.querySelector('.profile__avatar_button');

// const openPopupDelete = document.querySelector('.element__urn-button');

Promise.all([Api.getUserInfo(), Api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cards.renderItems(initialCards);
  })
  .catch(console.log);



function handleCardClick (evt) {
  popupBigImage.openPopup(evt)
} ;
// создание карточки
const createCard = (item) => {
  const card = new Card(userInfo.userId, item, '#card', handleCardClick, (cardId, card) => popupDelete.open(cardId, card), putLike, deleteLike);
  const newCard = card.generateCard();
  return newCard;
}

const putLike = (card) => {
  Api.putLike(card.getId())
    .then((res) => {
      card.handlerToggleLike(res);
    })
    .catch(console.log);
  
};
const deleteLike = (card) => {
  Api.deleteLike(card.getId())
    .then((res) => {
      card.handlerToggleLike(res);
    })
    .catch(console.log);
};


const cards = new Section({
  items: initialCards,
  renderer: (item) => cards.addItem(createCard(item))
},
  elements);
cards.renderItems();
// попап аватара
const popupNewAvatar = new PopupWitnForm(popupAvatar, ({avatar}) => {
  popupNewAvatar.renderLoading(true);
Api.patchUserAvatar({ avatar })
  .then(res => {
    userInfo.setUserInfo(res);
    popupNewAvatar.closePopup();
  })
  .finally(() => {
    popupNewAvatar.renderLoading(false);
  })
  .catch(console.log);
});
popupNewAvatar.setEventListeners();
openButtonAvatar.addEventListener('click', () => {
  popupNewAvatar.openPopup();
  formValiatorNewAvatar.resetInputErrors()
});
//обмен информации пользователя
const userInfo = new UserInfo({ name: '.profile__name', description: '.profile__description', avatar: '.profile__avatar_image'});

//попап данных
const popupInfo = new PopupWitnForm(popupUserInfo, ({name, description}) => {
  popupInfo.renderLoading(true);
  Api.patchUserInfo(prop)
    .then(({name, description}) => {
      userInfo.setUserInfo({name, description});
      popupInfo.closePopupe();
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
const popupNewImage = new PopupWitnForm(popupNewCard, ({name, link}) => {
  popupNewImage.renderLoading(true);
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
// удаление карточки
const popupDeleteCard = new PopupWithConfirmation(popupDelete, () => {
    popupDelete.renderLoading(true);
    Api.deleteCard(popupDeleteCard.cardId)
    .then(() => {
      popupDeleteCard.card.remove();
      popupDeleteCard.closePopup();
    })
    .finally(() => {
      popupDeleteCard.renderLoading(false);
    })
    .catch(console.log);
})
// openPopupDelete.addEventListener('click', () => {
//   popupDeleteCard.openPopup();
// })
popupDeleteCard.setEventListeners();

// валидации попапов 
const formValiatorUserInfo = new FormValidator(validationOptions, formSubmitInfo);
formValiatorUserInfo.enableValidation();
const formValiatorNewCard = new FormValidator(validationOptions, formSubmitNewCard);
formValiatorNewCard.enableValidation();
const formValiatorNewAvatar = new FormValidator(validationOptions, formAvatar);
formValiatorNewAvatar.enableValidation();


