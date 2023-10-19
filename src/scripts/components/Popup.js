export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
    }


  closePopup() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
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
    this._popup.querySelector('.popup__button-close').addEventListener('click', () => {
      this.closePopup();
   })

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup(evt.target)
    }
    })
    }
  }




//  класс Popup,  отвечает за открытие и закрытие попапа.
// Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.

// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.
