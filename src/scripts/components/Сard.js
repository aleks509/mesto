export default class Card {
  constructor ({ name, link, likes,  ownerId, cardId }, templateSelector, handleImageClick, handleOpenPopupDeleteCard, likeCard, unlikeCard, myId) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this.handleOpenPopupDeleteCard = handleOpenPopupDeleteCard;
    this._likeCard = likeCard;
    this._unlikeCard = unlikeCard
    this._myId = myId;
  }
//  заеберет разметку из HTML, клонирует
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
      this._likeMeter = this._element.querySelector('.element__likemeter');
      this._trash = this._element.querySelector('.element__trash')
      this._setEventListeners();
      this._likeMeter.textContent = this._likes.length
      this._titleElement.textContent = this._name;
      this._imageElement.src = this._link;
      this._imageElement.alt = this._name;
      this.idMatching()
        if (this._likes.some(item => item._id === this._myId)) {
          this._buttonLike.classList.toggle('element__like_active')
        }
      return this._element;
  }


  _handleLikeClick() {
      this._likeActiveChecking()
    }

  _likeActiveChecking() {
    if (this._buttonLike.classList.contains('element__like_active')) {
      this._unlikeCard(this)
    } else {
      this._likeCard(this)
      }
  }
  likeMeter(length) {
    this._buttonLike.classList.toggle('element__like_active')
    this._likeMeter.textContent = length
  }

  idMatching() {
    if (this._myId === this._ownerId) {
      this._trash.addEventListener('click', () => {
        this.handleOpenPopupDeleteCard(this)
      });
    } else {
      this._trash.remove();
    }
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._imageElement.addEventListener('click', () => {
      this._handleImageClick(this._link, this._name)
     });
  }
}
