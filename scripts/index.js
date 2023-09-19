import Card  from './Сard.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, configForm } from './constants.js'
// П Е Р Е М Е Н Н Ы Е
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_about');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const formProfile = popupProfile.querySelector('.form');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// переменые для Ф открыть/закрыть Новое место
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-element');
const closeBtnAddCard = popupAddCard.querySelector('.popup__button-close');
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
// // универсальная Ф открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened')
  // закрытие попапов по Esc
  document.addEventListener('keydown', handleEscClick);
}
// // универсальная Ф закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', handleEscClick);
}
// открытие Профиль
function openProfilePopup() {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profileFormValidator.resetInputErrors();
}
// Редактирование попапа Профиль
function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile)
}
// закрытие по Overlay
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
}
};
//закрытие Esc
function handleEscClick(evt) {
  if (evt.key === 'Escape') {
   const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
}
};
//открытиЕ попапа viewPhoto,
function openView(img, title) {
  viewPhoto.src = img;
  viewTitle.textContent = title;
  viewPhoto.alt = title;
  openPopup(viewPopup);
}
// закрытие попапа viewPhoto
function closeView(event) {
  closePopup(viewPopup);
}
// функция создания экземпляра класса Card
function createCard(item) {
  const card = new Card (item, '.element-template', openView);
  const cardNewElement = card.createCard();
  return cardNewElement;
  //
}
// цикл применения функии создания экз Класса к отрисовки каждой карточки и вставляем в контейнер
initialCards.forEach((item) => {
  const newCard = createCard(item);
  cardsContainer.append(newCard);
});
// группируем данные инпутов, применяем функцию создани экз Класса и вставляем вначало контейнера
function handleAddCard() {
  const inputsObj = {
    name: nameInputPlace.value,
    link: linkInputLink.value
  }
  const newCard = createCard(inputsObj)
  cardsContainer.prepend(newCard);
}
// Добавляем новую карточку
function handleAddNewCard (evt) {
  evt.preventDefault();
  handleAddCard();
  closePopup(popupAddCard);
  formAddCard.reset();
  cardFormValidator.disableSubmitButton();
}

// С Л У Ш А Т Е Л И
editButton.addEventListener('click', openProfilePopup);
buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile)
});
popupProfile.addEventListener('click', (evt) => {handleOverlayClick(evt)});
formProfile.addEventListener('submit', handleProfileSubmit);
addButton.addEventListener('click', () => {openPopup(popupAddCard)});
closeBtnAddCard.addEventListener('click', () => {closePopup(popupAddCard)});
// обработчик для закрытия попапа Новое место  по overlay
popupAddCard.addEventListener('click', (evt) => {handleOverlayClick(evt, popupAddCard)});
// обработчик клика по overlay (добавляем глобально, что он не уставалвивался каждый раз при открыии фо)
viewPopup.addEventListener('click', (evt) => {handleOverlayClick(evt)});
viewClose.addEventListener('click', closeView)
formAddCard.addEventListener('submit', handleAddNewCard);
