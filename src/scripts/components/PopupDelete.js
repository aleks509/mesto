import Popup from './Popup.js';
export default class PopupDelete extends Popup{
  constructor (popupSelector) {//в конструктор передаем селектор попапа
    super(popupSelector)
    this._buttonConfirm = this._popup.querySelector('.popup__button-yes');

    this.__handleCardRemove = this.__handleCardRemove.bind(this);
  }


  openPopupDelete() {
     super.openPopup()

  }

  _handleCardRemove(evt) {
    evt.preventDefault();
    const cardElement = this.buttonConfirm.closest('.element')
    // cardElement.remove();
    console.log(cardElement)
    // this._element.remove();
    // this._element = null;
}

setEventListeners() {
  super.setEventListeners()
  this._buttonConfirm.addEventListener('submit', this.__handleCardRemove)
}
}
