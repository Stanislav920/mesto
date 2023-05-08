/* Класс Card с конструктором */

export default class Card {
  constructor(
    data,
    cardConfig,
    templateSelector,
    handleCardClick,
    handleDelete,
    getId,
    likeCardApi,
    dislikeCardApi
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._titleSelector = cardConfig.titleSelector;
    this._imgSelector = cardConfig.imgSelector;
    this._btnLikeSelector = cardConfig.btnLikeSelector;
    this._btnDeleteSelector = cardConfig.btnDeleteSelector;
    this._handleCardClick = handleCardClick;
    this._getId = getId;
    this._likeCardApi = likeCardApi;
    this._handleDelete = handleDelete;
    this._dislikeCardApi = dislikeCardApi;
    this._isLike =
      data.likes.length !== 0
        ? data.likes.find((item) => item._id == this._getId())
        : false;
  }
  //>------------------------------------------------------------

  /* Метод клонирования template */

  _createTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  /* Метод для создания карточек */

  _setData() {
    this._btnLike = this._element.querySelector(this._btnLikeSelector);
    this._cardTitle = this._element.querySelector(this._titleSelector);
    this._cardImage = this._element.querySelector(this._imgSelector);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._isLike ? this._btnLike.classList.add("elements__like_active") : null;
  }

  /* Метод для удаления карточек */

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
    this._btnLike = null;
    this._cardImage = null;
  }
  /* Навешивания клика для методов */

  _setEventListeners() {
    this._btnLike.addEventListener("click", () => {
      this._changeLikeApi(this._data);
    });

    this._deleteCardButton.addEventListener("click", () => {
      this._handleDelete(this._data, this._handleCardDelete.bind(this));
    });

    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  getLikesCount(data) {
    this._likesNumber.textContent = data.likes.length;
  }
  //>------------------------------------------------------------

  _getElements() {
    this._likesNumber = this._element.querySelector(".elements__like-counter");
    this._deleteCardButton = this._element.querySelector(
      this._btnDeleteSelector
    );
  }
  // проверяем владельца карточки и убираем кнопку Delete

  _isOwner(data) {
    if (data.owner._id !== this._getId()) {
      this._deleteCardButton.remove();
    }
  }
  // Проверка, стоит ли лайк на карточке

  changeLike(data) {
    const res = data.likes.some((user) => {
      return user._id === this._getId();
    });
    if (!res) {
      this._dislikeCard();
    } else {
      this._likeCard();
    }
  }
  _likeCard() {
    this._btnLike.classList.add("elements__like_active");
  }
  _dislikeCard() {
    this._btnLike.classList.remove("elements__like_active");
  }

  _changeLikeApi(data) {
    if (this._btnLike.classList.contains("elements__like_active")) {
      this._dislikeCardApi(data._id);
    } else {
      this._likeCardApi(data._id);
    }
  }

  /* Метод генерации карточек */

  generateCard() {
    this._element = this._createTemplate();
    this._getElements();
    this._isOwner(this._data);
    this.getLikesCount(this._data);
    this._setData();
    this._setEventListeners();

    return this._element;
  }
}
