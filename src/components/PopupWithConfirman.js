import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, deleteCardApi }) {
    super(popupSelector);
    this._form = this._popupItem.querySelector(".popup__form");
    this._deleteCardApi = deleteCardApi;
  }

  setData(data, deleteCard) {
    this._data = data;
    this._deleteCard = deleteCard;
  }

  getData() {
    return {
      data: this._data,
      deleteCard: this._deleteCard,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCardApi();
    });
  }
}
