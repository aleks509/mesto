// Ф отображения сообщения об ошибке validationMessage и добоваление соотв класса
function showError(inputElement, errorElement, config) {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}
// Ф скрытия сообщения об ошибке validationMessage и добоваление соотв класса
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}
// При наступлении события ввода в инпут проверяем его валидность и вызываем функции закрытия/отображения ошибки
function checkInputValidity(inputElement, formElement, config) {
  inputElement.setCustomValidity("");
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (isInputValid) {
    hideError(inputElement, errorElement, config)
  } else {
    showError(inputElement, errorElement, config)
  }
}

// Переключатель кнопки Сохранить и добавление соотв класса
function toggleButtonState(buttonElement, isActive, config) {
if (isActive) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
} else {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.inactiveButtonClass);
}
}
// Вешаем обработчик события submit на каждую форму в переборе
// Внутри каждой формы ищем инпуты
// Перебираем список инпутов конкретной формы и вашеам на кадый инпутт обработчик события input

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
  [...inputList].forEach(function(inputElement) {
    inputElement.addEventListener('input', function(){
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config)
    })

    })
  formElement.addEventListener('submit', function(evt){
    evt.preventDefault();
  })
}
// 1. Находим все формы и перебираем их
// параметры, сюда передаем Аргументы формы-объекта
function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  [...formList].forEach(function(formElement){
    setEventListener(formElement, config)
    })
};
// Аргументы формы объект
const configForm = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__input_type_error"
}

enableValidation(configForm);

