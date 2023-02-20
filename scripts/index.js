let popup = document.querySelector('.popup');
let editForm = document.querySelector('.popup__container');

let profileEditButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let popupSubmit = document.querySelector('.popup__submit');

let getTitle = document.querySelector('.profile__title');
let getSubtitle = document.querySelector('.profile__subtitle');

let nameInput = editForm.querySelector('input[name = "username"]');
let subtitleInput = editForm.querySelector('input[name = "subtitle"]');

let formElement = document.querySelector('.popup__form');

let likeElements = document.querySelectorAll('.elements__like');

/* Открытие попапа. Добавление текста в форму */

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = getTitle.textContent;
  subtitleInput.value = getSubtitle.textContent;
});

/* Закрытие попапа */

popupClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

/* Функция для submit */

popupSubmit.addEventListener('click', function handleFormSubmit(evt) {
  evt.preventDefault();
  getTitle.textContent = nameInput.value;
  getSubtitle.textContent = subtitleInput.value;

  let saveProfile = document.querySelector('.popup');
  saveProfile.classList.remove('popup_opened');
});

/* Покраска сердечка при клике */

for (let likeItem of likeElements) {
  likeItem.addEventListener('click', function () {
    likeItem.classList.add('elements__like_active');
  });
}
