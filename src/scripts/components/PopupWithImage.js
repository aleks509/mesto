import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__photo');
    this._title = this._popup.querySelector('.popup__photo-title');

  }
  openPopup(img, title) {
    this._image.src = img;
    this._image.alt = title;
    this._title.textContent = title;
    super.openPopup()
  };

  }

// В методе open класса PopupWithImage нужно вставлять в попап
//  картинку с src изображения и подписью к картинке.



