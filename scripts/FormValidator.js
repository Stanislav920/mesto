/* Класс FormValidator  с конструктором */

export default class FormValidator {
  constructor(config, validatedForm) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElem = validatedForm;

    this._inputList = Array.from(validatedForm.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElem.querySelector(this._submitButtonSelector);
  }
  //>------------------------------------------------------------

  /* Метод для проверки валидности input */

  _hasInvalidInput() {
    return this._inputList.some(input => {
      return !input.validity.valid;
    });
  }
  //>------------------------------------------------------------

  /* Метод для проверки состояния кнопки submit */

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'true');
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
  //>------------------------------------------------------------

  /* Метод  для показа ошибки ввода данных input */

  _showInputError(inputElement) {
    const errorElement = this._formElem.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }
  //>------------------------------------------------------------

  /* Метод для скрытия ошибки */

  _hideInputError = inputElement => {
    const errorElement = this._formElem.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  //>------------------------------------------------------------

  /* Метод для проверки ввода данных в input */

  _checkInputValidity = inputElement => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };
  //>------------------------------------------------------------

  /* Метод очистки формы */

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }
  //>------------------------------------------------------------

  /* Метод для выборки всех элементов формы и кнопки submit */

  _setListeners() {
    this._toggleButtonState();

    this._formElem.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  //>------------------------------------------------------------

  /* Метод вызова валидации формы */

  enableValidation() {
    this._setListeners();
  }
}
