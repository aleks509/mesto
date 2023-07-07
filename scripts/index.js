const editButton = document.querySelector('.profile-info__edit-button');
const popupProfile = document.querySelector('.popup_type_about');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__container');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
const profileTitle = document.querySelector('.profile-info__title');
const profileSubtitle = document.querySelector('.profile-info__subtitle');



function addPopup() {
  popupProfile.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopup() {
  popupProfile.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup()
}

editButton.addEventListener('click', addPopup);
buttonClosePopupProfile.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
