import './index.css';

import Card  from '../scripts/components/Сard.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import {
  initialCards,
  configForm,
  editButton,
  popupProfile,
  formProfile,
  nameInput,
  jobInput,
  addButton,
  formAddCard,
  cardsContainer
} from '../scripts/utils/constants.js'
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import Popup from '../scripts/components/Popup';


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'f7b5bbba-2a09-453b-983e-947bcdc15520',
    'Content-Type': 'application/json'
}
})
// myId 09519f0944205716a8ba06bd
//me данные с сервера
// api.getUserInfo()
//   .then((newPersonalInfo) => {
//     const name = newPersonalInfo.name
//     const about = newPersonalInfo.about
//     const avatar = newPersonalInfo.avatar
//     const myId = newPersonalInfo._id
//     profilePopup.setNewUserInfo(name, about, avatar)
//     console.log(myId + ` my ID`)

//   })
//   .catch((error) => {
//     console.log(error)
//   })

//карточки с сервера
// api.getCards()
//   .then((cards) => {
//     const newCardsArray = cards

//     newCardsArray.forEach(array => {
//       const newCard = createCard(array)
//       cardList.prependItem(newCard)
//       console.log(array.owner._id + ` owner ID`)
//     })
//     })
//     .catch((err) => {
//       console.log(err)
//   })


  Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    console.log([userInfo, cards]);
    const name = userInfo.name
    const about = userInfo.about
    const avatar = userInfo.avatar
    const myId = userInfo._id
    console.log(myId + ` myID`)
    profilePopup.setNewUserInfo(name, about, avatar)
    // const newCardsArray = cards
    cards.forEach(card => {
      const ownerId = card._id
      console.log(ownerId + ` ownerID`)
      const newCard = new Card ({
        name: card.name,
        link: card.link,
        likes: card.likes,
        myId: myId,
        ownerId: ownerId
      },
      '.element-template', handleImageClick, handlePopupDeleteCard)
      // return newCard.createCard();
      cardList.prependItem(newCard.createCard())
      })
   })

// создаем экз класса FormValidator для каждой проверяемой формы и вызвать метод EnableValidator
const profileFormValidator = new FormValidator(configForm, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(configForm, formAddCard);
cardFormValidator.enableValidation();

// ф создания карточки, которую вызываем при создании экз класса
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const cardElement = new Card (item, '.element-template', handleImageClick, handlePopupDeleteCard)
  return cardElement.createCard();
}
// создаем section -  Отвечает за отрисовку элементов на странице
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardNewElement = createCard(item);
    cardList.addItem(cardNewElement)
   }
  },
  '.elements'
);
// отрисовка карточек
cardList.renderItems();



// попап deleteCard
const popupDeleteCard = new Popup('.popup_type_delete-photo')
function handlePopupDeleteCard() {
  popupDeleteCard.openPopup()
}

// попап viewPhoto,
const PopupViewPhoto = new PopupWithImage('.popup_type_view-photo');

// Ф вставки данных, которую надо передать как ссылку в класс Card
function handleImageClick(img, title) {
  PopupViewPhoto.openPopup(img, title);
}
// Новая карточка
const popupNewCard = new PopupWithForm ('.popup_type_new-element', handleFormSubmit);
// попап открытого Профиля
const popupUserInfo = new PopupWithForm ('.popup_type_about', handleSubmitProfile)
// данные для Профиля
const profilePopup = new UserInfo({
  nameElement: '.profile__title',
  aboutElement: '.profile__subtitle'
})



// функция сабмита Формы НОВАЯ КАРТОЧКА, принимает объект с данными инпутов формы
function handleFormSubmit(inputValuesObject) {
  const name = inputValuesObject.place
  const link = inputValuesObject.link
  const newPhotoElement = createCard({ name, link })
  cardList.prependItem(newPhotoElement);
  api.addNewCard(name, link)
}

// открытие попапа Профиль и подстановка  данных
function hadleOpenInfoProfile() {
  profileFormValidator.disableSubmitButton();
  const profileUserInfo = profilePopup.getUserInfo();
  // popupUserInfo.setInputValues(profileUserInfo);
  api.getUserInfo()
  .then((personalInfo) => {
    popupUserInfo.setInputValues(personalInfo);
})
}

// функция сабмита Изменения Профиля
function handleSubmitProfile(inputValuesObject) {
  const name = inputValuesObject.name
  const about = inputValuesObject.about
  profilePopup.setUserInfo(name, about)
  api.editProfile(name, about)
}



// С Л У Ш А Т Е Л И
// Profile
editButton.addEventListener('click', () => {
  hadleOpenInfoProfile()
  popupUserInfo.openPopup();
});
popupUserInfo.setEventListeners();
// новая карточка
addButton.addEventListener('click', () => {
  popupNewCard.openPopup()
  cardFormValidator.disableSubmitButton();
});

popupNewCard.setEventListeners();

PopupViewPhoto.setEventListeners();
popupDeleteCard.setEventListeners();


// инициализация формы
// const formRenderer = new Section({
//   data: []
// },'.elements');
// const formElement = popupNewCard.generate()
// formRenderer.addItem(formElement);
