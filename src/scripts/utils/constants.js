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

const configForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_type_error"
};

// П Е Р Е М Е Н Н Ы Е
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_about');
const formProfile = popupProfile.querySelector('.form');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
//  Новое место
const addButton = document.querySelector('.profile__add-button');
// Добавляем попап Новое место
const formAddCard = document.querySelector('.form-new-element');
const cardsContainer = document.querySelector('.elements');
// Изменить аватар
const avatarChangeButton = document.querySelector('.profile__avatar-edit-button');
const formNewAva = document.querySelector('.form-new-avatar')


export {
   initialCards,
   configForm,
   editButton,
   popupProfile,
   formProfile,
   nameInput,
   jobInput,
   addButton,
   formAddCard,
   cardsContainer,
   avatarChangeButton,
   formNewAva
  }
