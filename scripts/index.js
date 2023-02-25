let popup = document.querySelector('.popup');

let profileEditButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');

let getTitle = document.querySelector('.profile__title');
let getSubtitle = document.querySelector('.profile__subtitle');

let editForm = document.querySelector('.popup__container');
let nameInput = editForm.querySelector('input[name = "username"]');
let subtitleInput = editForm.querySelector('input[name = "subtitle"]');

let formElement = document.querySelector('.popup__form');

/* Открытие попапа. Добавление текста в форму */

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = getTitle.textContent;
  subtitleInput.value = getSubtitle.textContent;
});

/* Функция закрытия попапа */

function сlose() {
  popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', сlose);

/* Функция для submit */

function handleFormSubmit(evt) {
  evt.preventDefault();
  getTitle.textContent = nameInput.value;
  getSubtitle.textContent = subtitleInput.value;

  сlose();
}

formElement.addEventListener('submit', handleFormSubmit);
