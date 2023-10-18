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
  cardsContainer,
  avatarChangeButton,
  formNewAva
} from '../scripts/utils/constants.js'
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import Popup from '../scripts/components/Popup';
import PopupDelete from '../scripts/components/PopupDelete';


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'f7b5bbba-2a09-453b-983e-947bcdc15520',
    'Content-Type': 'application/json'
}
})
// myId 09519f0944205716a8ba06bd
  Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    console.log([userInfo, cards]);
    const name = userInfo.name
    const about = userInfo.about
    const avatar = userInfo.avatar
    const myId = userInfo._id
    // console.log(myId + ` myID`)
    profilePopup.setNewUserInfo({ name, about, avatar })
    // const newCardsArray = cards
    cards.forEach(card => {
      const ownerId = card.owner._id
       // console.log(ownerId + ` ownerID`)
      const cardId = card._id
      // console.log(cardId + ` cardID`)
      const newCard = new Card ({
        name: card.name,
        link: card.link,
        likes: card.likes,
        myId: myId,
        ownerId: ownerId,
        cardId: cardId
      },
      '.element-template', handleImageClick, handleOpenPopupDeleteCard, {
        likeCard: (id) => {
          api.likeCard(id)
            .then((response) => {
              const length = response.likes.length
              // console.log(length)
              // length + 1
              newCard.likeMeter(length)
            })
        },
        unlikeCard: (id) => {
        api.unlikeCard(id)
          .then((response) => {
            const length = response.likes.length
            // console.log(length)

              // length - 1
              newCard.likeMeter(length)
          })}
        })
      cardList.prependItem(newCard.createCard())
      })
   })
   .catch((err) => {
          console.log(err)
      })

// Ы
// создаем экз класса FormValidator для каждой проверяемой формы и вызвать метод EnableValidator
const profileFormValidator = new FormValidator(configForm, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(configForm, formAddCard);
cardFormValidator.enableValidation();

// const changeAvatarFormValidator = new FormValidator(configForm, formNewAva)
// changeAvatarFormValidator.enableValidation()

// ф создания карточки, которую вызываем при создании экз класса
function createCard({ name, link, likes, myId, ownerId, cardId }) {
  // тут создаете карточку и возвращаете ее
  const cardElement = new Card ({
    name: name,
    link: link,
    likes: likes,
    myId: myId,
    ownerId: ownerId,
    cardId: cardId,
    }, '.element-template', handleImageClick, handleOpenPopupDeleteCard, { likeCard, unlikeCard}
  )
  return cardElement.createCard();
}

// создаем section -  Отвечает за отрисовку элементов на странице
const cardList = new Section({
  items: [],
  renderer: (item) => {
    const cardNewElement = createCard(item);
    cardList.addItem(cardNewElement)
   }
  },
  '.elements'
);
// отрисовка карточек
cardList.renderItems();

// открытие попапа
function handleOpenPopupDeleteCard(cardId) {
  popupDeleteCard.openPopup()
  popupDeleteCard.setIdCard(cardId)
}

// попап deleteCard
const popupDeleteCard = new PopupDelete('.popup_type_delete-photo', handleSubmitPopupDelete)


//
function handleSubmitPopupDelete(cardId) {
  console.log(cardId)
  api.deleteCard(cardId)
    .then(() => {
      // cardNewElement.remove()
      popupDeleteCard.closePopup()
    })
    .catch((err) => {
      console.log('Ошибка при удалении фото', err)
    })
}

// function likeSong(cardId) {
//   api.likeCard(cardId)
//     .then((response) => {
//       console.log(response)
//     })
// }
// function unlikeSong(cardId) {
//   api.unlikeCard(cardId)
//   .then((response) => {
//     console.log(response)
//   })
// }

// попап viewPhoto,
const PopupViewPhoto = new PopupWithImage('.popup_type_view-photo');

// Ф вставки данных, которую надо передать как ссылку в класс Card
function handleImageClick(img, title) {
  PopupViewPhoto.openPopup(img, title);
}
// Ф О Р М Ы

// Новая карточка
const popupNewCard = new PopupWithForm ('.popup_type_new-element', handleFormSubmit);
// попап открытого Профиля
const popupUserInfo = new PopupWithForm ('.popup_type_about', handleSubmitProfile)
// данные для Профиля
const profilePopup = new UserInfo({
  nameElement: '.profile__title',
  aboutElement: '.profile__subtitle'
})

const popupChangeAvatar = new PopupWithForm('.popup_type_change-avatar', handleChangeAvatarForm)

function handleChangeAvatarForm(inputvalue) {
  popupChangeAvatar.renderLoading('Сохранение...')
  const avatar = inputvalue.avatar
  console.log(inputvalue.avatar)
  profilePopup.setNewUserInfo({ avatar })
  api.changeAvatar(avatar)
  popupChangeAvatar.closePopup();
}

// функция сабмита Формы НОВАЯ КАРТОЧКА, принимает объект с данными инпутов формы
function handleFormSubmit(inputValuesObject) {

  const name = inputValuesObject.place
  const link = inputValuesObject.link
  const newPhotoElement = createCard({ name, link })
  cardList.prependItem(newPhotoElement);
  api.addNewCard(name, link)
  popupNewCard.renderLoading('Сохранение...')
}

// открытие попапа Профиль и подстановка  данных
function hadleOpenInfoProfile() {
  profileFormValidator.disableSubmitButton();

  const profileUserInfo = profilePopup.getUserInfo();
  // popupUserInfo.setInputValues(profileUserInfo);
  api.getUserInfo()
  .then((personalInfo) => {
    popupUserInfo.setInputValues(personalInfo);
    popupUserInfo.renderLoading('Сохранение...')
})
}

// функция сабмита Изменения Профиля
function handleSubmitProfile(inputValuesObject) {
  const name = inputValuesObject.name
  const about = inputValuesObject.about
  profilePopup.setNewUserInfo({name, about})
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

avatarChangeButton.addEventListener('click', () => {
  popupChangeAvatar.openPopup();
  // changeAvatarFormValidator.disableSubmitButton();
});


popupNewCard.setEventListeners();

PopupViewPhoto.setEventListeners();
popupChangeAvatar.setEventListeners();

popupDeleteCard.setEventListeners()
// инициализация формы
// const formRenderer = new Section({
//   data: []
// },'.elements');
// const formElement = popupNewCard.generate()
// formRenderer.addItem(formElement);
