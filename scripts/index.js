import Card  from './Сard.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, configForm } from './constants.js'

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
const closeBtnNewElement = popupAddCard.querySelector('.popup__button-close');



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






editButton.addEventListener('click', openProfilePopup);

// Редактирование попапа Профиль
function handleProfileSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile)
}

buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile)
});
popupProfile.addEventListener('click', (evt) => {handleOverlayClick(evt)});

formProfile.addEventListener('submit', handleProfileSubmit);


addButton.addEventListener('click', () => {openPopup(popupAddCard)});
closeBtnNewElement.addEventListener('click', () => {closePopup(popupAddCard)});
// ФУНКЦИЯ ЗАКРЫТИЯ ПО ОВЕРЛЕЮ
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
}
};
// ФУНКЦИЯ ЗАКРЫТИЯ ПО Esc
function handleEscClick(evt) {
  if (evt.key === 'Escape') {
   const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
}
};
// обработчик для закрытия попапа Новое место  по overlay
popupAddCard.addEventListener('click', (evt) => {handleOverlayClick(evt, popupAddCard)});

// Добавляем попап Новое место
const formNewElement = document.querySelector('.form-new-element');
const containerElements = document.querySelector('.elements');

// Создание нового Элемента
// находим элементы открытия попапа viewPhoto
const viewPopup = document.querySelector('.popup_type_view-photo');
// const viewPhotoTemplate = document.querySelector('.view-template');
const viewContainer = viewPopup.querySelector('.popup__view-container');
const viewPhoto = viewContainer.querySelector('.popup__photo');
const viewTitle = viewContainer.querySelector('.popup__photo-title');
const viewClose = viewContainer.querySelector('.popup__view-close');

// создаем новую карточку и внутри этой Ф слушатели на корзину, лайк и просмотр фотки
const  createCard = (nameValue, linkValue)  => {
  const cardTemplate = document.querySelector('.element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImg = cardElement.querySelector('.element__image');
  cardImg.src = linkValue;
  const cardTitle =  cardElement.querySelector('.element__title');
  cardTitle.textContent = nameValue;

// // слушатель на корзину и удаление
  cardElement.querySelector('.element__trash').addEventListener('click', () => {
    cardElement.remove()
  });
// // слушатель на лайк и добавляем класс лайку active
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });
// // слушаетель на img и вызов ф открытия попапа viewPhoto с данными из массива
cardImg.addEventListener('click', () => {
  openView(linkValue, nameValue)
})

  return cardElement;
}

// функция открытия попапа viewPhoto,
function openView(img, title) {
  viewPhoto.src = img;
  viewTitle.textContent = title;
  viewPhoto.alt = title;
  openPopup(viewPopup);

}
// обработчик клика по overlay (добавляем глобально, что он не уставалвивался каждый раз при открыии фо)
viewPopup.addEventListener('click', (evt) => {handleOverlayClick(evt)});
// закрытие попапа viewPhoto
function closeView(event) {
  closePopup(viewPopup);
}

viewClose.addEventListener('click', closeView)
// ф рендеринга нового элемента
const renderCard = (nameValue, linkValue) => {
  const newCard = createCard(nameValue, linkValue);
  containerElements.prepend(newCard);
 };


// Цикл для класса Card
initialCards.forEach((item) => {
  const card = new Card (item, '.element-template', openView);
  const cardNewElement = card.createCard();
  containerElements.append(cardNewElement)
});

// находим поля формы ввода
const nameInputPlace = formNewElement.querySelector('.form__input_type_place');
const linkInputLink = formNewElement.querySelector('.form__input_type_link');

function handleAddCards (evt) {
  evt.preventDefault();
  renderCard(nameInputPlace.value, linkInputLink.value);
  closePopup(popupAddCard)
  formNewElement.reset()
  cardFormValidator.disableButton()

}
formNewElement.addEventListener('submit', handleAddCards);




// Создать экз класса FormValidator для каждой проверяемой формы и вызвать метод EnableValidator
// formProfile
// formNewElement
const profileFormValidator = new FormValidator(configForm, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(configForm, formNewElement);
cardFormValidator.enableValidation();
