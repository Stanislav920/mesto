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

let saveProfile = document.querySelector('.popup');

/* Открытие попапа. Добавление текста в форму */

profileEditButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  nameInput.value = getTitle.textContent;
  subtitleInput.value = getSubtitle.textContent;
});

/* Функция для submit */

function handleFormSubmit(evt) {
  evt.preventDefault();
  getTitle.textContent = nameInput.value;
  getSubtitle.textContent = subtitleInput.value;

  сlose();
}
formElement.addEventListener('submit', handleFormSubmit);

function сlose() {
  {
    saveProfile.classList.remove('popup_opened');
  }

  {
    popup.classList.remove('popup_opened');
  }
}

popupClose.addEventListener('click', сlose);
popupSubmit.addEventListener('click', close);
