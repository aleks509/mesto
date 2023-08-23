const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_about');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const form = document.querySelector('.form');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');




// // универсальная Ф открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened')
  // закрытие попапов по Esc
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup)
  }

  });
}
// // универсальная Ф закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

// edit Профиль
function addProfile() {
  openPopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

editButton.addEventListener('click', addProfile);

// Редактирование попапа Профиль
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile)
}
buttonClosePopupProfile.addEventListener('click', () =>
{closePopup(popupProfile)});
popupProfile.addEventListener('click', (evt) => {closeOnOverlay(evt, popupProfile)});

form.addEventListener('submit', handleFormSubmit);

// переменые для Ф открыть/закрыть Новое место
const addButton = document.querySelector('.profile__add-button');
const popupNewElement = document.querySelector('.popup_type_new-element');
const closeBtnNewElement = popupNewElement.querySelector('.popup__button-close');

addButton.addEventListener('click', () => {openPopup(popupNewElement)});
closeBtnNewElement.addEventListener('click', () => {closePopup(popupNewElement)});
// ФУНКЦИЯ ЗАКРЫТИЯ ПО ОВЕРЛЕЮ
function closeOnOverlay(evt, openedPopup) {
  if (evt.target === evt.currentTarget) {
    closePopup(openedPopup)
}
};


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
const  createCard = (nameValue, linkValue)  => {
  const cardTemplate = document.querySelector('.element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImg = cardElement.querySelector('.element__image');
  cardImg.src = linkValue;
  const cardTitle =  cardElement.querySelector('.element__title');
  cardTitle.textContent = nameValue;

// слушатель на корзину и удаление
  cardElement.querySelector('.element__trash').addEventListener('click', () => {
    cardElement.remove()
  });
// слушатель на лайк и добавляем класс лайку active
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });
// слушаетель на img и вызов ф открытия попапа viewPhoto с данными из массива
cardImg.addEventListener('click', () => {
  openView(linkValue, nameValue)
})

// функция открытия попапа viewPhoto,
function openView(img, title) {
  viewPhoto.src = img;
  viewTitle.textContent = title;
  openPopup(viewContainer);
  viewContainer.addEventListener('click', (evt) => {closeOnOverlay(evt, viewContainer)});
}

  return cardElement;
}
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
// применяем метод forEach к массиву initialCards
initialCards.forEach((item) => {
 renderCard(item.name, item.link)
});

// находим поля формы ввода
const nameInputPlace = formNewElement.querySelector('.form__input_type_place');
const linkInputLink = formNewElement.querySelector('.form__input_type_link');

function handleAddCards (evt) {
  evt.preventDefault();
  renderCard(nameInputPlace.value, linkInputLink.value);
  closePopup(popupNewElement)
  formNewElement.reset()
}
formNewElement.addEventListener('submit', handleAddCards);

// В А Л И Д А Ц И Я
// Ф отображения сообщения об ошибке validationMessage и добоваление соотв класса
function showError(inputElement, errorElement, config) {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}
// Ф скрытия сообщения об ошибке validationMessage и добоваление соотв класса
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}
// При наступлении события ввода в инпут проверяем его валидность и вызываем функции закрытия/отображения ошибки
function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (isInputValid) {
    hideError(inputElement, errorElement, config)
  } else {
    showError(inputElement, errorElement, config)
  }
}
// Переключатель кнопки Сохранить и добавление соотв класса
function toggleButtonState(buttonElement, isActive, config) {
if (isActive) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.finactiveButtonClass);
} else {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.finactiveButtonClass);
}
}
// Вешаем обработчик события submit на каждую форму в переборе
// Внутри каждой формы ищем инпуты
// Перебираем список инпутов конкретной формы и вашеам на кадый инпутт обработчик события input

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
  [...inputList].forEach(function(inputElement) {
    inputElement.addEventListener('input', function(){
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement,config)
    })

    })
  formElement.addEventListener('submit', function(evt){
    evt.preventDefault();
  })
}
// 1. Находим все формы и перебираем их
// параметры, сюда передаем Аргументы формы-объекта
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  [...formList].forEach(function(formElement){
    setEventListener(formElement, config)
    })
};
// Аргументы формы объект
const configForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  finactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_type_error"
}

enableValidation(configForm);

