export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this))
    }


  closePopup() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }

  // Содержит приватный метод _handleEscClose,
  //  который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
         this.closePopup();
    }
  };
  // добавляет слушатель клика иконке закрытия попапа.
  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', this.closePopup.bind(this));
  }

}


// Создайте класс Popup, который отвечает за открытие и закрытие попапа.
// Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.

// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.




// }
// // // универсальная Ф закрытия попапов
// function closePopup(popup) {
//   popup.classList.remove('popup_opened')
//   document.removeEventListener('keydown', handleEscClick);
// }

// function handleOverlayClick(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.target)
// }
// };
// //закрытие Esc
