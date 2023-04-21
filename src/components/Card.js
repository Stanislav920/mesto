/* Класс Card с конструктором */

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  //>------------------------------------------------------------

  /* Метод клонирования template */

  _createTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }
  //>------------------------------------------------------------

  /* Метод для изменения сердечка на черное */

  _handleCardlike() {
    this._likeButton.classList.toggle('elements__like_active');
  }
  //>------------------------------------------------------------

  /* Метод для удаления карточек */

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }
  //>------------------------------------------------------------

  /* Метод для создания карточек */

  _setData() {
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardImage = this._element.querySelector('.elements__image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }
  //>------------------------------------------------------------

  /* Навешивания клика для методов */

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardlike();
    });

    this._deleteCardButton.addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
  //>------------------------------------------------------------

  /* Метод получения кнопок для лайка и удаления карточек */

  _getElements() {
    this._likeButton = this._element.querySelector('.elements__like');
    this._deleteCardButton = this._element.querySelector('.elements__delete');
  }
  //>------------------------------------------------------------

  /* Метод генерации карточек */

  generateCard() {
    this._element = this._createTemplate();
    this._getElements();
    this._setData();
    this._setEventListeners();

    return this._element;
  }
}
