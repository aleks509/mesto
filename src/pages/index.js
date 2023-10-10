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


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'f7b5bbba-2a09-453b-983e-947bcdc15520'
}
})
api.getUserInfo()

// создаем экз класса FormValidator для каждой проверяемой формы и вызвать метод EnableValidator
const profileFormValidator = new FormValidator(configForm, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(configForm, formAddCard);
cardFormValidator.enableValidation();

// ф создания карточки, которую вызываем при создании экз класса
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const cardElement = new Card (item, '.element-template', handleImageClick)
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
// функция сабмита формы, принимает объект с данными инпутов формы
function handleFormSubmit(inputValuesObject) {
  const name = inputValuesObject.place
  const link = inputValuesObject.link
  const newPhotoElement = createCard({ name, link })
  cardList.prependItem(newPhotoElement);
}
// открытие попапа Профиль и подстановка  данных
function hadleOpenInfoProfile() {
  profileFormValidator.disableSubmitButton();
  const profileUserInfo = profilePopup.getUserInfo();
  popupUserInfo.setInputValues(profileUserInfo);
}
// функция сабмита Изменения Профила
function handleSubmitProfile(inputValuesObject) {
  const name = inputValuesObject.name
  const about = inputValuesObject.about
  profilePopup.setUserInfo(name, about)
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



// инициализация формы
// const formRenderer = new Section({
//   data: []
// },'.elements');
// const formElement = popupNewCard.generate()
// formRenderer.addItem(formElement);
