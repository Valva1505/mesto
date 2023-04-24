 export default class Section {//добавление карточек
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;// это массив данных, которые нужно добавить на страницу при инициализации класса.
      this._renderer = renderer;//функция, которая отвечает за создание и отрисовку данных на странице.
      this._container = containerSelector;//селектор контейнера, в который нужно добавлять созданные элементы.
    }
    
    renderItems() {
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      });
    }
    addItem(element) {
        this._container.prepend(element);
      }
  }