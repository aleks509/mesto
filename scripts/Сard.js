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
_gitTemplate() {
  const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  return cardElement;
}
// публиынй метод, который подготовит карточку к публикаации
// добавляет данные из массива в разметку
createCard() {
  // запишем разметку в приватоное поле _element
  // у др элеметнов будет к ней доступ
  this._element = this._gitTemplate();
  this._setEventListeners()
  // добавляем даныне
  this._element.querySelector('.element__title').textContent = this._name;
  this._element.querySelector('.element__image').src = this._link;
  return this._element;
}
// приватные методы обработчика лайка и удаления
_handleLikeActive() {
  this._element.querySelector('.element__like').classList.toggle('.element__like_active');
}
// _handleCardRemove() {
//   this._element.remove();
// }
// метод установки слушателей
_setEventListeners() {
  this._element.querySelector('.element__like').addEventListener('click', () => {
    this._handleLikeActive();
  });
//   this._element.querySelector('.element__trash').addEventListener('click', () => {
//     this._handleCardRemove()
// });
  this._element.querySelector('.element__image').addEventListener('click', () => {
    this._openHandler(this._link, this._name)
  });
  }
}
// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
// принимает в конструктор её данные и селектор её template-элемента;
// содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
// содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
// Для каждой карточки создайте экземпляр класса Card.

// чеклис
// Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
// Принимать в конструктор ссылки на изображение и текст;
// Принимать в конструктор селектор для template -элемента с шаблоном разметки;
// Чеклист для самопроверки. 7 Спринт. 2
// Обладать приватными методами, которые установят слушателей событий, обработают клики,
// подготовят карточку к публикации;
// Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями
// событий.
