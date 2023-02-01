const openButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__button-close");

const toggleOpenPopup = () => {
  popup.classList.toggle("popup__opened");
};

const handleOpenButtonClick = () => {
  toggleOpenPopup();
};

const handleCloseButtonClick = () => {
  toggleOpenPopup();
};

const handleOverlyClick = (event) => {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
};

openButton.addEventListener("click", handleOpenButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
popup.addEventListener("click", handleOverlyClick);


let submitButton = document.querySelector(".popup__button-submit");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector(".popup__name");
  let jobInput = document.querySelector(".popup__description");
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  toggleOpenPopup();
}
submitButton.addEventListener("click", handleFormSubmit);
