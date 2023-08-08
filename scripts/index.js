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

const  createCard = (nameValue, linkValue)  => {
  const cardTemplate = document.querySelector('.element-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImg = cardElement.querySelector('.element__image');
  cardImg.src = linkValue;


  // cardImg.alt = `${cardTitle.textContent}`;

  const cardTitle =  cardElement.querySelector('.element__title');
  cardTitle.textContent = nameValue;


  cardElement.querySelector('.element__trash').addEventListener('click', () => {
    cardElement.remove()
  });

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });

  // переменые для открытия картинки  viewPhoto
const viewContainer = document.querySelector('.popup_type_view-photo')
const viewPhotoTemplate = document.querySelector('.view-template').content;
const viewPopup = viewPhotoTemplate.querySelector('.popup__view-container').cloneNode(true);
const viewPhoto = viewPopup.querySelector('.popup__photo');
const viewTitle = viewPopup.querySelector('.popup__photo-title');
const viewClose = viewPopup.querySelector('.popup__view-close');

// функция открытия
function openView() {
  openPopup(viewContainer);
  viewPhoto.src = cardImg.src;
  viewTitle.textContent = cardTitle.textContent;
  console.log(viewTitle.textContent)
  viewContainer.append(viewPopup);
}
// открываем фото
cardImg.addEventListener('click', openView)

function closeView(event) {
  closePopup(viewContainer);
  const itemPhoto = viewClose.closest('.popup__view-container');
  itemPhoto.remove();

}
viewClose.addEventListener('click', closeView)

  return cardElement;
}



const renderCard = (nameValue, linkValue) => {
  const newCard = createCard(nameValue, linkValue);
  containerElements.prepend(newCard);
 };

initialCards.forEach((item) => {
 renderCard(item.name, item.link)
});


function handleAddCards (evt) {
  evt.preventDefault();

  const name = formNewElement.querySelector('.form__input_type_place');
  const link = formNewElement.querySelector('.form__input_type_link');


  renderCard(name.value, link.value);
  closePopup(popupNewElement)
  formNewElement.reset()
}


formNewElement.addEventListener('submit', handleAddCards);


