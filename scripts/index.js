import Card  from './Сard.js';
import FormValidator from './FormNewValidator.js';

// массив с карточками
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

// Аргументы формы объект
const configForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_type_error"
}


const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_about');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const formProfile = popupProfile.querySelector('.form-profile');
const formErrorProfile = popupProfile.querySelectorAll('.form__error')
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');




// // универсальная Ф открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened')
  // закрытие попапов по Esc
  document.addEventListener('keydown', closeOnEsc);
}
// // универсальная Ф закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeOnEsc);
}

// edit Профиль
function addProfile() {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  // resetInputErrors(popupProfile, configForm)

}

// function resetInputErrors(formElement, config) {
//   const formInputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   formInputList.forEach(inputElement => {
//     checkInputValidity(inputElement, formElement, config)
//   })
// };




editButton.addEventListener('click', addProfile);

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
popupProfile.addEventListener('click', (evt) => {closeOnOverlay(evt, popupProfile)});

formProfile.addEventListener('submit', handleProfileSubmit);

// переменые для Ф открыть/закрыть Новое место
const addButton = document.querySelector('.profile__add-button');
const popupNewElement = document.querySelector('.popup_type_new-element');
const closeBtnNewElement = popupNewElement.querySelector('.popup__button-close');
const submitButtonNewElement = popupNewElement.querySelector('.form__button-save')
addButton.addEventListener('click', () => {openPopup(popupNewElement)});
closeBtnNewElement.addEventListener('click', () => {closePopup(popupNewElement)});
// ФУНКЦИЯ ЗАКРЫТИЯ ПО ОВЕРЛЕЮ
function closeOnOverlay(evt, openedPopup) {
  if (evt.target === evt.currentTarget) {
    closePopup(openedPopup)
}
};
// ФУНКЦИЯ ЗАКРЫТИЯ ПО Esc
function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    openedPopupClass = document.querySelector('.popup_opened');
    closePopup(openedPopupClass)
}
};
// обработчик для закрытия попапа Новое место  по overlay
popupNewElement.addEventListener('click', (evt) => {closeOnOverlay(evt, popupNewElement)});

// Добавляем попап Новое место
const formNewElement = document.querySelector('.form-new-element');
const containerElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const cardElement = cardTemplate.querySelector('.element');

const deleteBtn = cardTemplate.querySelector('.element__trash');

// Создание нового Элемента
// находим элементы открытия попапа viewPhoto
const viewContainer = document.querySelector('.popup_type_view-photo');
// const viewPhotoTemplate = document.querySelector('.view-template');
const viewPopup = viewContainer.querySelector('.popup__view-container');
const viewPhoto = viewPopup.querySelector('.popup__photo');
const viewTitle = viewPopup.querySelector('.popup__photo-title');
const viewClose = viewPopup.querySelector('.popup__view-close');

// создаем новую карточку и внутри этой Ф слушатели на корзину, лайк и просмотр фотки
// const  createCard = (nameValue, linkValue)  => {
//   const cardTemplate = document.querySelector('.element-template').content;
//   const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
//   const cardImg = cardElement.querySelector('.element__image');
//   cardImg.src = linkValue;
//   const cardTitle =  cardElement.querySelector('.element__title');
//   cardTitle.textContent = nameValue;

// // слушатель на корзину и удаление
//   cardElement.querySelector('.element__trash').addEventListener('click', () => {
//     cardElement.remove()
//   });
// // слушатель на лайк и добавляем класс лайку active
//   cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__like_active')
//   });
// // слушаетель на img и вызов ф открытия попапа viewPhoto с данными из массива
// cardImg.addEventListener('click', () => {
//   openView(linkValue, nameValue)
// })

//   return cardElement;
// }

// функция открытия попапа viewPhoto,
function openView(img, title) {
  viewPhoto.src = img;
  viewTitle.textContent = title;
  openPopup(viewContainer);

}
// обработчик клика по overlay (добавляем глобально, что он не уставалвивался каждый раз при открыии фо)
viewContainer.addEventListener('click', (evt) => {closeOnOverlay(evt, viewContainer)});
// закрытие попапа viewPhoto
function closeView(event) {
  closePopup(viewContainer);
}

viewClose.addEventListener('click', closeView)
// ф рендеринга нового элемента
const renderCard = (nameValue, linkValue) => {
  const newCard = createCard(nameValue, linkValue);
  containerElements.prepend(newCard);
 };
// // применяем метод forEach к массиву initialCards
initialCards.forEach((item) => {
 renderCard(item.name, item.link)
});

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
  closePopup(popupNewElement)
  formNewElement.reset()
  // toggleButtonState(submitButtonNewElement, popupNewElement.checkValidity, configForm);
}
formNewElement.addEventListener('submit', handleAddCards);


// Создать экз класса FormValidator для каждой проверяемой формы и вызвать метод EnableValidator
// formProfile
// formNewElement
const formProfileValidtion = new FormValidator (configForm, formProfile);
formProfileValidtion.enableValidation();

const formNewElementValidation = new FormValidator (configForm, formNewElement);
formNewElementValidation.enableValidation();
