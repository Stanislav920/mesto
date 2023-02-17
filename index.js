let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let popupSubmit = document.querySelector('.popup__submit');
let editForm = document.querySelector('.popup__container');
let getTitle = document.querySelector('.profile__title');
let getSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');

let nameInput = editForm.querySelector('input[name="username"]');
let subtitleInput = editForm.querySelector('input[name="subtitle"]');

const userName = 'Жак-Ив Кусто';
const aboutMe = 'Исследователь океана';

/* Открытие попапа. Добавление текста в форму */

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = userName;
  subtitleInput.value = aboutMe;
});

/* Закрытие попапа */

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

/* Закрытие попапа на кнопу сохранить */

popupSubmit.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

/* Функция для submit */

function handleFormSubmit(evt) {
  evt.preventDefault();
  getTitle.textContent = nameInput.value;
  getSubtitle.textContent = subtitleInput.value;
}
formElement.addEventListener('submit', handleFormSubmit);
