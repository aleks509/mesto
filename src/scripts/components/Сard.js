export default class Card {
  // параметры коструктора - обект и селектор разметки и ссылка на функцию открытия openView(img, title)
  constructor ({ name, link, likes, owner }, templateSelector, handleImageClick, handlePopupDeleteCard) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handlePopupDeleteCard = handlePopupDeleteCard;


  }
// приватный метод, который заеберет разметку из HTML, клонирует
//  и вернет DOM element
  trashActive() {
    classList.add('popup_opened');
  }
  _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
  }
// публиынй метод, который подготовит карточку к публикаации
// добавляет данные из массива в разметку
  createCard() {
      // запишем разметку в приватоное поле _element
      // у др элеметнов будет к ней доступ
      this._element = this._getTemplate();

      this._imageElement = this._element.querySelector('.element__image');
      this._buttonLike = this._element.querySelector('.element__like');
      this._titleElement = this._element.querySelector('.element__title');
      this._likeMeter = this._element.querySelector('.element__likemeter');

      this._setEventListeners();
      this._titleElement.textContent = this._name;
      this._imageElement.src = this._link;
      this._imageElement.alt = this._name;

      return this._element;
  }

// приватные методы обработчика лайка и удаления
  _handleLikeClick() {
    this._buttonLike.classList.toggle('element__like_active');
    this._likeMeter.textContent = this._likes.length;

  }


  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handlePopupDeleteCard()
    });
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick(this._link, this._name)
     });
  }
}
