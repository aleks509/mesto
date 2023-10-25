import Popup from './Popup.js';
// Чтобы подтвердить удаление карточки,
// добавлен ещё один вид попапа.
// Ему можно назначить обработчик сабмита,
// чтобы установить id карточки.
export default class PopupDelete extends Popup{
  constructor (popupSelector, handleSubmitPopupDelete) {
    //в конструктор передаем селектор попапа и обработчик сабмита с id карточки
    super(popupSelector)
    this._buttonConfirm = this._popup.querySelector('.popup__button-yes');
    this._handleSubmitPopupDelete = handleSubmitPopupDelete;
  }

  setEventListeners() {
      super.setEventListeners()
      this._buttonConfirm.addEventListener('click', () => {
        this._handleSubmitPopupDelete(this._item)
      })
    }

  setIdItem(item) {
    this._item = item
  }

}

