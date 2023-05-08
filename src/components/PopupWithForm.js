import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._popupFormItem = this._popupItem.querySelector(".popup__form");
    this._inputList = Array.from(
      this._popupFormItem.querySelectorAll(".popup__input")
    );
    this._sendButton = this._popupItem.querySelector(".popup__submit");
    this._sendButtonText = this._sendButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((inputItem) => {
      formValues[inputItem.name] = inputItem.value;
    });

    return formValues;
  }

  setEventListeners() {
    this._popupFormItem.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setInputValues(data) {
    this._inputList.forEach((inputItem) => {
      inputItem.value = data[inputItem.name];
    });
  }

  showSaving(state) {
    if (state) {
      this._sendButton.textContent = "Сохранение...";
    } else {
      this._sendButton.textContent = this._sendButtonText;
    }
  }

  close() {
    super.close();

    this._popupFormItem.reset();
  }
}
