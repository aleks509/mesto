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

let myId

// myId 09519f0944205716a8ba06bd
  Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    console.log([userInfo, cards]);
    const name = userInfo.name
    const about = userInfo.about
    const avatar = userInfo.avatar
    myId = userInfo._id
    // console.log(myId + ` myID`)
    profilePopup.setNewUserInfo({ name, about, avatar })
    // const newCardsArray = cards
    cards.forEach(card => {
      const ownerId = card.owner._id
       // console.log(ownerId + ` ownerID`)
      const cardId = card._id
      // console.log(cardId + ` cardID`)
      const newCard = createCard ({
        name: card.name,
        link: card.link,
        likes: card.likes,
        ownerId: ownerId,
        cardId: cardId
      },
      '.element-template', handleImageClick, handleOpenPopupDeleteCard, likeCard, unlikeCard, myId)
      cardList.prependItem(newCard)
      })
   })
   .catch((err) => {
          console.log(err)
      })

//
// создаем экз класса FormValidator для каждой проверяемой формы и вызвать метод EnableValidator
const profileFormValidator = new FormValidator(configForm, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(configForm, formAddCard);
cardFormValidator.enableValidation();

const changeAvatarFormValidator = new FormValidator(configForm, formNewAva)
changeAvatarFormValidator.enableValidation()


// ф создания карточки, которую вызываем при создании экз класса
function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const cardElement = new Card (item,  '.element-template', handleImageClick, handleOpenPopupDeleteCard, likeCard, unlikeCard, myId)
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
function handleOpenPopupDeleteCard(card) {

  popupDeleteCard.openPopup()
  popupDeleteCard.setIdCard(card)
}

// попап deleteCard
const popupDeleteCard = new PopupDelete('.popup_type_delete-photo', handleSubmitPopupDelete)


//
function handleSubmitPopupDelete(card) {
  api.deleteCard(card._cardId)
    .then(() => {
      card.removeCard()
      popupDeleteCard.closePopup()
    })
    .catch((err) => {
      console.log('Ошибка при удалении фото', err)
    })
}

function likeCard(card) {
  // console.log(card)
  api.likeCard(card._cardId)
  .then((response) => {
     const length = response.likes.length
        card.likeMeter(length)
      })
  .catch((err) => {
        console.log('Ошибка при попытке лайкнуть', err)
      })
}
function unlikeCard(card) {
  //
    api.unlikeCard(card._cardId)
    .then((response) => {
      // console.log(response.likes.length)
     const length = response.likes.length
    card.likeMeter(length)
      })
    .catch((err) => {
       console.log('Ошибка при попытке дизлайкнуть', err)
      })

}
// попап viewPhoto,
const popupViewPhoto = new PopupWithImage('.popup_type_view-photo');

// Ф вставки данных, которую надо передать как ссылку в класс Card
function handleImageClick(img, title) {
  popupViewPhoto.openPopup(img, title);
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
    api.changeAvatar(avatar)
    .then((resp) =>{
        profilePopup.setNewUserInfo({ avatar })
      })
    .catch((err) => {
        console.log('Ошибка при загрузке фото:', err)
      })
    .finally(() => {
        popupChangeAvatar.renderLoading('Сохранить')
      })
    popupChangeAvatar.closePopup();
}

// функция сабмита Формы НОВАЯ КАРТОЧКА, принимает объект с данными инпутов формы
function handleFormSubmit(inputValuesObject) {
  popupNewCard.renderLoading('Сохранение...')
  const name = inputValuesObject.place
  const link = inputValuesObject.link
  api.addNewCard(name, link)
    .then((item) => {
      console.log(item)
      const newPhotoElement = createCard({
        name: item.name,
        link: item.link,
        likes: item.likes,
        cardId: item._id,
        ownerId: item.owner._id
      })
      cardList.prependItem(newPhotoElement);
    })
    .catch((err) => {
      console.log('Ошибка при загрузке новой карточки:', err)
    })
    .finally(() => {
      popupChangeAvatar.renderLoading('Сохранить')
    })
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
  .catch((err) => {
  console.log('Ошибка при загрузке:', err)
})
  .finally(() => {
  popupChangeAvatar.renderLoading('Сохранить')
})
}

// функция сабмита Изменения Профиля
function handleSubmitProfile(inputValuesObject) {
  const name = inputValuesObject.name
  const about = inputValuesObject.about
  // const avatar = inputValuesObject.avatar
  api.editProfile(name, about)
    .then((profiledata) => {
      profilePopup.setNewUserInfo(profiledata)
    })
    .catch((err) => {
      console.log('Ошибка при загрузке данных:', err)
    })
      .finally(() => {
      popupChangeAvatar.renderLoading('Сохранить')
    })
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
  changeAvatarFormValidator.disableSubmitButton();
});


popupNewCard.setEventListeners();

popupViewPhoto.setEventListeners();
popupChangeAvatar.setEventListeners();

popupDeleteCard.setEventListeners()
// инициализация формы
// const formRenderer = new Section({
//   data: []
// },'.elements');
// const formElement = popupNewCard.generate()
// formRenderer.addItem(formElement);
