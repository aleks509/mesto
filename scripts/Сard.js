export default class Card {
  // параметры коструктора - обект и селектор разметки и ссылка на функцию открытия openView(img, title)
  constructor (data, templateSelector, openHandler) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openHandler = openHandler;

  }
// приватный метод, который заеберет разметку из HTML, клонирует
//  и вернет DOM element
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
      this._setEventListeners();
      this._titleElement.textContent = this._name;
      this._imageElement.src = this._link;
      this._imageElement.alt = this._name;
      return this._element;
  }

// приватные методы обработчика лайка и удаления
  _handleLikeClick() {
    this._buttonLike.classList.toggle('element__like_active');
  }
  _handleCardRemove() {
      this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleCardRemove()
    });
    this._imageElement.addEventListener('click', () => {
      this._openHandler(this._link, this._name)
    });

  }
}
