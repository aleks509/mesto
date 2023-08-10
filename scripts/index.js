const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_about');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const formElement = document.querySelector('.form');
const nameInput = popupProfile.querySelector('.form__input_type_name');
const jobInput = popupProfile.querySelector('.form__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// // универсальная Ф открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened')
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

formElement.addEventListener('submit', handleFormSubmit);

// переменые для Ф открыть/закрыть Новое место
const addButton = document.querySelector('.profile__add-button');
const popupNewElement = document.querySelector('.popup_type_new-element');
const closeBtnNewElement = popupNewElement.querySelector('.popup__button-close');

addButton.addEventListener('click', () => {openPopup(popupNewElement)});
closeBtnNewElement.addEventListener('click', () => {closePopup(popupNewElement)});

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
  // cardImg.alt = `${cardTitle.textContent}`;
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
  console.log(cardImg.src);
  console.log(cardTitle.textContent);
  viewTitle.textContent = title;
  openPopup(viewContainer);

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


