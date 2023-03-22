/* Функция  для показа ошибки ввода данных input */

const showInputError = (form, input, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//>------------------------------------------------------------

/* Функция для скрытия ошибки */

const hideInputError = (form, input, inputErrorClass, errorClass) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
//>------------------------------------------------------------

/* Функция для проверки ввода данных в input */

const checkInputValidity = (form, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(form, inputElement, inputErrorClass, errorClass);
  }
};
//>------------------------------------------------------------

/* Функция для проверки валидности input */

const hasInvalidInput = inputList => {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};
//>------------------------------------------------------------

/* Функция для проверки состояния кнопки submit */

const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', 'true');
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
};
//>------------------------------------------------------------

/* Функция для выборки всех элементов формы и кнопки submit */

const setEventListeners = (
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass
) => {
  const form = document.querySelector(formSelector);
  const formList = Array.from(document.querySelectorAll(formSelector));
  const inputArray = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);
  toggleButtonState(inputArray, submitButton, inactiveButtonClass);

  inputArray.forEach(inp => {
    inp.addEventListener('input', function () {
      checkInputValidity(form, inp, inputErrorClass, errorClass);
      toggleButtonState(inputArray, submitButton, inactiveButtonClass);
    });
  });

  formList.forEach(form => {
    form.addEventListener('reset', function () {
      setTimeout(() => {
        toggleButtonState(inputArray, submitButton, inactiveButtonClass);
      }, 0);
    });
  });
};
//>------------------------------------------------------------

/* Функция включения валидности */

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
  inactiveButtonClass
}) => {
  setEventListeners(
    formSelector,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass,
    inactiveButtonClass
  );
};
//>------------------------------------------------------------

/* Элементы для попапа редактировать профиль */

enableValidation({
  formSelector: '#profile-form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
});
//>------------------------------------------------------------

/* Элементы для попапа новое место */

enableValidation({
  formSelector: '#form-cards',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
});
