export default class UserInfo  {
  constructor({nameElement, aboutElement}) {
    this._name = document.querySelector(nameElement);
    this._about = document.querySelector(aboutElement);
    // this._inputName = document.querySelector('.form__input_type_name');
    // this._inputAbout = document.querySelector('.form__input_type_about');
  }
  // возвращает объект с данными пользователя.
  // Этот метод пригодится когда данные пользователя
  //  нужно будет подставить в форму при открытии.
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(name, about) {
   this._name.textContent = name
    this._about.textContent = about
  }
}

// Класс UserInfo отвечает за управление отображением информации о пользователе на странице.

//  Этот класс:
// Принимает в конструктор объект с селекторами двух элементов:
//  элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который
// возвращает объект с данными пользователя.
//
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

// Содержит публичный метод setUserInfo,
// который принимает новые данные пользователя и добавляет их на страницу.

// function handleProfileSubmit (evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;
//   closePopup(popupProfile)
// }
