import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form')
    this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
  }
  // Этот метод собирает массив всех полей в форме,
  //  обходит их и добавляет их значения в объект.
  //  Ключами этого объекта будут атрибуты name каждого поля:ы
// здесь лежит объект
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;


  }
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup()
    this._form.reset()
  }
}

// Создайте класс PopupWithForm

// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:

// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.

// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.

// Этот метод собирает массив всех полей в форме, обходит их и добавляет их значения в объект.

//  Ключами этого объекта будут атрибуты name каждого поля:

// Перезаписывает родительский метод setEventListeners.

// Метод setEventListeners класса PopupWithForm

// должен не только добавлять обработчик клика иконке закрытия,

//  но и добавлять обработчик сабмита формы.

// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.

// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
