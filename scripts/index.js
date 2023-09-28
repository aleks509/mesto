import Card  from './Сard.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, configForm } from './constants.js'
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


// П Е Р Е М Е Н Н Ы Е
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_about');
const formProfile = popupProfile.querySelector('.form');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// переменые для Ф открыть/закрыть Новое место
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-element');
// Добавляем попап Новое место
const formAddCard = document.querySelector('.form-new-element');
const cardsContainer = document.querySelector('.elements');
// Создание нового Элемента
// находим элементы открытия попапа viewPhoto
const viewPopup = document.querySelector('.popup_type_view-photo');
// const viewPhotoTemplate = document.querySelector('.view-template');
const viewContainer = viewPopup.querySelector('.popup__view-container');
const viewPhoto = viewContainer.querySelector('.popup__photo');
const viewTitle = viewContainer.querySelector('.popup__photo-title');
const viewClose = viewContainer.querySelector('.popup__view-close');
// находим поля формы ввода
const nameInputPlace = formAddCard.querySelector('.form__input_type_place');
const linkInputLink = formAddCard.querySelector('.form__input_type_link');
// создаем экз класса FormValidator для каждой проверяемой формы и вызвать метод EnableValidator
const profileFormValidator = new FormValidator(configForm, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(configForm, formAddCard);
cardFormValidator.enableValidation();

// Ф У Н К Ц И И

// открытие Профиль
// function openProfilePopup() {
//   openPopup(popupProfile);
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileSubtitle.textContent;
//   profileFormValidator.resetInputErrors();
// }
// Редактирование попапа Профиль и сабмит
// function handleProfileSubmit (evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;
//   closePopup(popupProfile)
// }

// СТАТИЧЕСКИЕ ДАННЫЕ
// ВСТАВЛЯЕМ СТАТИЧЕСКИЕ ДАННЫЕ В КОНТЕЙНЕР
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.element-template', handleImageClick);
    const cardNewElement = card.createCard();
    cardList.addItem(cardNewElement)
   }
  },
  '.elements'
);
// отрисовка карточек
cardList.renderItems();
//открытиЕ попапа viewPhoto,
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
  const newPhoto = new Card(inputValuesObject, '.element-template', handleImageClick)
  const newPhotoElement = newPhoto.createCard()
  cardsContainer.prepend(newPhotoElement);
  cardFormValidator.enableValidation();
}
popupNewCard.setEventListeners();
// открытие попапа Профиль и подстановка  данных
function hadleOpenInfoProfile() {
  const profileUserInfo = profilePopup.getUserInfo();
  nameInput.value = profileUserInfo.name
  jobInput.value = profileUserInfo.about;
}
// функция сабмита Изменения Профила
function handleSubmitProfile(inputValuesObject) {
  const name = inputValuesObject.name
  const about = inputValuesObject.about
  profilePopup.setUserInfo(name, about)
}
popupUserInfo.setEventListeners();
// С Л У Ш А Т Е Л И
// Profile
editButton.addEventListener('click', () => {
  hadleOpenInfoProfile()
  popupUserInfo.openPopup();
});

// новая карточка
addButton.addEventListener('click', () => {
  popupNewCard.openPopup()
});

cardFormValidator.disableSubmitButton();
 // cardFormValidator.disableSubmitButton();



// инициализация формы
// const formRenderer = new Section({
//   data: []
// },'.elements');
// const formElement = popupNewCard.generate()
// formRenderer.addItem(formElement);
