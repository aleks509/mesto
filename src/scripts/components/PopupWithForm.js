import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form')
    this._inputAvatar = this._popup.querySelector('.form__input')
    this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
    this._submitButton = this._popup.querySelector('.form__button-save')
  }
  // Этот метод собирает массив всех полей в форме,
  //  обходит их и добавляет их значения в объект.
  //  Ключами этого объекта будут атрибуты name каждого поля:
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }



  renderLoading(text) {
      this._submitButton.textContent = text
  }


  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
      // this.closePopup();
    });
  }
// заменили функцию(вставки инфы из профиля в поля формы) на метод класса
  setInputValues(data) {
    this._inputList.forEach((input) => {
         // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
         input.value = data[input.name];
        });
  }

  closePopup() {
    super.closePopup()
    this._form.reset()
  }
}

