/* Импорты js файлов  */

import Card from './Card.js';
import FormValidator from './FormValidator.js';
//>------------------------------------------------------------

const popupProfile = document.querySelector('#profile-popup');
const popupCardButton = document.querySelector('#cards-popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupCloseProfileButton = document.querySelector('#close-profile');
const closeCardsPopupButton = document.querySelector('#close-cards');

const getProfileTitle = document.querySelector('.profile__title');
const getProfileSubtitle = document.querySelector('.profile__subtitle');

const editProfileForm = document.querySelector('.popup__container');
const nameProfileInput = editProfileForm.querySelector('input[name = "username"]');
const subtitleProfileInput = editProfileForm.querySelector('input[name = "subtitle"]');

const formProfileElement = document.querySelector('#profile-form');
const formCardElement = document.querySelector('#form-cards');

const cardsContainer = document.querySelector('.elements');
const inputTitleCard = document.querySelector('#input-title');
const inputlinkPicture = document.querySelector('#link-picture');

const popupImageButton = document.querySelector('#image-popup');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const popupCloseImageButton = document.querySelector('#close-image');
//>------------------------------------------------------------

/* Селекторы для формы */

const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error_visible'
};
//>------------------------------------------------------------

/* Константа для попапа редактировать профиль */

const profileFormValidator = new FormValidator(config, formProfileElement);
profileFormValidator.enableValidation();
//>------------------------------------------------------------

/* Константа для попапа новое место */

const cardFormValidator = new FormValidator(config, formCardElement);
cardFormValidator.enableValidation();
//>------------------------------------------------------------

/* Функция закрытия попапа по клику на темный фон */

function escClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupProfile);
    closePopup(popupCardButton);
    closePopup(popupImageButton);
  }
}

//>------------------------------------------------------------

/* Сохранение текста в попапе профиля */

function saveProfile() {
  nameProfileInput.value = getProfileTitle.textContent;
  subtitleProfileInput.value = getProfileSubtitle.textContent;
}
//>------------------------------------------------------------

/* Функция закрытия попапа на кнопку esc */

const handleEscClose = evt => {
  if (evt.key === 'Escape') {
    closePopup(popupProfile);
    closePopup(popupCardButton);
    closePopup(popupImageButton);
  }
};
//>------------------------------------------------------------

/* Функция открытие попапа */

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('mousedown', escClosePopup);
}
//>------------------------------------------------------------

/* Функция закрытия попапа */

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('mousedown', escClosePopup);
}
//>------------------------------------------------------------

profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
  saveProfile();
});
//>------------------------------------------------------------

popupCloseProfileButton.addEventListener('click', function () {
  closePopup(popupProfile);
});
//>------------------------------------------------------------

/* Функция для submit */

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  getProfileTitle.textContent = nameProfileInput.value;
  getProfileSubtitle.textContent = subtitleProfileInput.value;

  closePopup(popupProfile);
}

formProfileElement.addEventListener('submit', handleFormProfileSubmit);
//>------------------------------------------------------------

/* Открытие попапа для карточек. */

profileAddButton.addEventListener('click', function () {
  openPopup(popupCardButton);
});
//>------------------------------------------------------------

/* Функция закрытия попапа для карточек */

closeCardsPopupButton.addEventListener('click', function () {
  closePopup(popupCardButton);
});
//>------------------------------------------------------------

/* Добавление карточек при нажатие кнопки submit */

function handleFormNewItemSubmit(evt) {
  evt.preventDefault();

  addCard();

  formCardElement.reset();

  closePopup(popupCardButton);
}
formCardElement.addEventListener('submit', handleFormNewItemSubmit);
//>------------------------------------------------------------

/* Функция добавления карточки */

function addCard() {
  cardsContainer.prepend(
    createNewCard({ name: inputTitleCard.value, link: inputlinkPicture.value })
  );
}
//>------------------------------------------------------------

/* Функция для zoom карточки */

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupDescription.textContent = name;
  openPopup(popupImageButton);
}
//>------------------------------------------------------------

/* Функция для получение карточки */

function createNewCard(data) {
  const newCard = new Card(data, '#elements-template', handleCardClick);
  return newCard.generateCard();
}
//>------------------------------------------------------------

/* Функция для перебирание карточек в массиве */

initialCards.forEach(card => {
  cardsContainer.append(createNewCard({ name: card.name, link: card.link }));
});
//>------------------------------------------------------------

/* Закрытие zoom карточки */

popupCloseImageButton.addEventListener('click', function () {
  closePopup(popupImageButton);
});
