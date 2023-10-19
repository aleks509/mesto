// Отвечает за отрисовку элементов на странице
export default class Section {
  // Первый параметр - объект со свойствами
  //items - массив данных, которые нужно добавить на страницу при инициализации класса.
  // renderer - это функция, которая отвечает за создание и отрисовку данных на странице.
  // Второй - селектор конейнера, в который нужно добавлять созданные элементы.
  constructor({ items, renderer }, containerSelector) {
    this._dataArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };
  // принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.append(element)
  };
  // перебирает массив и применям функцию отрисовки каждого отдельного элемента
  renderItems() {
    this._dataArray.forEach(item => {
      this._renderer(item);
    })
  }
  prependItem(element) {
    this._container.prepend(element)
  }
}
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
//  Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
//  Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
//  Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.

// Содержит публичный метод, который отвечает за отрисовку всех элементов.

// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.

// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.

// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
