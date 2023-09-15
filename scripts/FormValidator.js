class FormValidator {
  constructor(configForm, formElement) {
      this._inputSelector = configForm.inputSelector;
      this._submitButtonSelector = configForm.submitButtonSelector;
      this._inactiveButtonClass = configForm.inactiveButtonClass;
      this._inputErrorClass = configForm.inputErrorClass;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
  };

  _showError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      errorElement.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._inputErrorClass);
  };

  _hideError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
  };

  _checkInputValidity(inputElement) {
      const isInputValid = inputElement.validity.valid;
      if (isInputValid) {
        this._hideError(inputElement)
      } else {
        this._showError(inputElement)
      };
    };

  _enableSubmitButton() {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._inactiveButtonClass);
  };

  _disableSubmitButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _toggleButtonState(isActive) {
    if (isActive) {
      this._enableSubmitButton()
    } else {
      this._disableSubmitButton()
    };
  };

  _setEventListener() {
      this._toggleButtonState(this._formElement.checkValidity())
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._formElement.checkValidity());
        this._checkInputValidity(inputElement)
      });
    });
    };

  disableButton() {
    this._toggleButtonState(this._formElement.checkValidity());
    }

  resetInputErrors() {
      this._inputList.forEach(inputElement => {
        this._checkInputValidity(inputElement)
      })
    };

  enableValidation() {
      this._setEventListener();
    };
}

export { FormValidator }




// Создайте класс FormValidator, который настраивает валидацию полей формы:
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.

// Экземпляр класса FormValidator создаётся для каждой проверяемой формы.
// Этот класс должен:
// Принимать в конструктор объект настроек с классами формы???
// Принимать в конструктор ссылку на HTML-элемент проверяемой формы;
// Содержать приватные методы для обработки формы. В методах за объектом настроек следует
// обращаться к полю класса, а не передавать его в каждый метод, как это было реализовано ранее;
// Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса.
